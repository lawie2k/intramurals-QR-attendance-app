import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

router.get('/', async (_req, res) => {
  const events = await prisma.event.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(events);
});

router.post('/', async (req, res) => {
  const { name } = req.body as { name: string };
  if (!name) return res.status(400).json({ error: 'name required' });
  const evt = await prisma.event.create({ data: { name } });
  res.status(201).json(evt);
});

export default router;


