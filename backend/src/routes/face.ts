import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

// Placeholder routes. Wire to Rekognition or InsightFace later.
router.post('/enroll', async (_req, res) => {
  return res.status(501).json({ error: 'Not implemented' });
});

router.post('/verify', async (_req, res) => {
  return res.status(501).json({ error: 'Not implemented' });
});

export default router;


