import { Response } from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { Resend } from 'resend';
import { prisma } from '../services/db';
import { AuthRequest } from '../middlewares/auth';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

// Initialize clients conditionally
let razorpay: Razorpay | null = null;
if (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export const registerForEvent = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = req.user.id;
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: 'Event ID is required' });
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: Number(eventId) },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if already registered
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        unique_user_event: {
          userId,
          eventId: event.id,
        },
      },
    });

    if (existingRegistration) {
      return res.status(400).json({ error: 'Already registered for this event' });
    }

    const eventFee = Number(event.fee);

    // Case 1: Free Event
    if (eventFee === 0) {
      const registration = await prisma.registration.create({
        data: {
          userId,
          eventId: event.id,
          paymentStatus: 'paid',
        },
      });

      // Send confirmation email
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user && resend) {
        try {
          await resend.emails.send({
            from: 'events@pcuevents.edu.in',
            to: user.email,
            subject: `Registration Confirmed: ${event.name}`,
            html: `<p>Hi ${user.firstName}, your pass for <strong>${event.name}</strong> is officially active! See you at ${event.location} on ${event.date.toDateString()}.</p>`,
          });
        } catch (mailErr) {
          console.error('Mail trigger failed:', mailErr);
        }
      }

      return res.status(201).json({
        message: 'Successfully registered for free event',
        registration,
        requiresPayment: false,
      });
    }

    // Case 2: Paid Event
    if (!razorpay) {
      // Mock payment bypass if credentials are not configured on local env
      console.warn('Razorpay keys not configured. Simulating instant confirmation.');
      const registration = await prisma.registration.create({
        data: {
          userId,
          eventId: event.id,
          paymentStatus: 'paid',
          paymentId: `MOCK_TXN_${Date.now()}`,
        },
      });

      return res.status(201).json({
        message: 'Successfully registered (Mock Payment Activated)',
        registration,
        requiresPayment: false,
      });
    }

    // Create Razorpay Order
    const orderOptions = {
      amount: eventFee * 100, // Razorpay amount is in paise (₹50 = 5000 paise)
      currency: 'INR',
      receipt: `receipt_user_${userId}_event_${event.id}`,
    };

    const order = await razorpay.orders.create(orderOptions);

    // Save pending registration
    const registration = await prisma.registration.create({
      data: {
        userId,
        eventId: event.id,
        paymentId: order.id,
        paymentStatus: 'pending',
      },
    });

    res.status(201).json({
      message: 'Checkout order created successfully',
      registration,
      requiresPayment: true,
      razorpayOrder: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key: RAZORPAY_KEY_ID,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const handleRazorpayWebhook = async (req: any, res: Response) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (webhookSecret) {
      const signature = req.headers['x-razorpay-signature'];
      const shasum = crypto.createHmac('sha256', webhookSecret);
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest('hex');

      if (digest !== signature) {
        return res.status(400).json({ error: 'Signature verification failed' });
      }
    }

    const { event, payload } = req.body;

    if (event === 'payment.captured') {
      const paymentEntity = payload.payment.entity;
      const orderId = paymentEntity.order_id;

      // Find registration by orderId/paymentId
      const registration = await prisma.registration.findFirst({
        where: { paymentId: orderId },
        include: { user: true, event: true },
      });

      if (registration) {
        await prisma.registration.update({
          where: { id: registration.id },
          data: { paymentStatus: 'paid' },
        });

        // Trigger transactional email
        if (resend) {
          try {
            await resend.emails.send({
              from: 'events@pcuevents.edu.in',
              to: registration.user.email,
              subject: `Registration Confirmed: ${registration.event.name}`,
              html: `
                <h2>Hi ${registration.user.firstName}!</h2>
                <p>Your payment of ₹${registration.event.fee} was confirmed successfully.</p>
                <p>Your pass for <strong>${registration.event.name}</strong> is now active!</p>
                <p><strong>Venue:</strong> ${registration.event.location}<br/>
                   <strong>Date:</strong> ${registration.event.date.toDateString()}<br/>
                   <strong>Time:</strong> ${registration.event.time}</p>
              `,
            });
          } catch (mailErr) {
            console.error('Resend transaction trigger failure:', mailErr);
          }
        }
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const getUserRegistrations = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const registrations = await prisma.registration.findMany({
      where: {
        userId: req.user.id,
        paymentStatus: 'paid', // Show only paid/confirmed registrations
      },
      include: {
        event: {
          include: { category: true },
        },
      },
      orderBy: { registeredAt: 'desc' },
    });

    res.status(200).json(registrations);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const verifyPayment = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment details' });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment signature mismatch' });
    }

    // Find registration and update status
    const registration = await prisma.registration.findFirst({
      where: { paymentId: razorpay_order_id },
      include: { event: true },
    });

    if (!registration) {
      return res.status(404).json({ error: 'Registration record not found' });
    }

    const updated = await prisma.registration.update({
      where: { id: registration.id },
      data: {
        paymentStatus: 'paid',
        paymentId: razorpay_payment_id,
      },
    });

    // Send confirmation email
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (user && resend) {
      try {
        await resend.emails.send({
          from: 'events@pcuevents.edu.in',
          to: user.email,
          subject: `Registration Confirmed: ${registration.event.name}`,
          html: `<p>Hi ${user.firstName}, your pass for <strong>${registration.event.name}</strong> is active! See you at ${registration.event.location} on ${registration.event.date.toDateString()}.</p>`,
        });
      } catch (mailErr) {
        console.error('Mail trigger failed:', mailErr);
      }
    }

    res.status(200).json({
      message: 'Payment verified and registration confirmed',
      registration: updated,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const clearHistory = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await prisma.registration.deleteMany({
      where: { userId: req.user.id },
    });

    res.status(200).json({ message: 'Registration history cleared successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
