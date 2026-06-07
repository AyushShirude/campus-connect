import { Request, Response } from 'express';
import { prisma } from '../services/db';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const getCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const category = await prisma.category.findUnique({
      where: { slug },
      include: { events: true },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { category, status } = req.query;

    const filters: any = {};
    if (category) {
      filters.category = { slug: String(category) };
    }
    if (status) {
      filters.status = String(status);
    }

    const events = await prisma.event.findMany({
      where: filters,
      include: { category: true },
      orderBy: { date: 'asc' },
    });

    res.status(200).json(events);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: { category: true },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, categoryId, description, date, time, location, fee, imageUrl, status, highlights } = req.body;

    if (!name || !description || !date || !time || !location) {
      return res.status(400).json({ error: 'Name, description, date, time, and location are required' });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const event = await prisma.event.create({
      data: {
        name,
        categoryId: categoryId ? Number(categoryId) : null,
        description,
        date: parsedDate,
        time,
        location,
        fee: fee ? Number(fee) : 0.00,
        imageUrl,
        status: status || 'upcoming',
        highlights: highlights || [],
      },
    });

    res.status(201).json(event);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.date) {
      data.date = new Date(data.date);
    }
    if (data.categoryId) {
      data.categoryId = Number(data.categoryId);
    }
    if (data.fee !== undefined) {
      data.fee = Number(data.fee);
    }

    const updatedEvent = await prisma.event.update({
      where: { id: Number(id) },
      data,
    });

    res.status(200).json(updatedEvent);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
