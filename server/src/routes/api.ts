import { Router } from 'express';
import { signup, login, getMe } from '../controllers/authController';
import { 
  getCategories, 
  getCategoryBySlug, 
  getEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from '../controllers/eventController';
import { 
  registerForEvent, 
  handleRazorpayWebhook, 
  getUserRegistrations, 
  clearHistory,
  verifyPayment
} from '../controllers/registrationController';
import { authenticateToken, authorizeRole } from '../middlewares/auth';

const router = Router();

// --- Auth Routes ---
router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.get('/auth/me', authenticateToken, getMe);

// --- Category Routes ---
router.get('/categories', getCategories);
router.get('/category/:slug', getCategoryBySlug);

// --- Event Routes ---
router.get('/events', getEvents);
router.get('/event/:id', getEventById);
router.post('/events', authenticateToken, authorizeRole(['organizer', 'admin']), createEvent);
router.put('/event/:id', authenticateToken, authorizeRole(['organizer', 'admin']), updateEvent);
router.delete('/event/:id', authenticateToken, authorizeRole(['organizer', 'admin']), deleteEvent);

// --- Registration Routes ---
router.post('/registrations', authenticateToken, registerForEvent);
router.get('/registrations', authenticateToken, getUserRegistrations);
router.post('/registrations/clear', authenticateToken, clearHistory);

// --- Payment Webhooks & Verification ---
router.post('/payments/webhook', handleRazorpayWebhook);
router.post('/payments/verify', authenticateToken, verifyPayment);

export default router;
