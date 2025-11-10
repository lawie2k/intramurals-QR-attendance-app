import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { verifySignedPayload } from '../lib/crypto';

const router = Router();

router.post('/scan', async (req, res) => {
  const { token, eventId } = req.body as { token: string; eventId: number | string };
  if (!token || eventId === undefined || eventId === null) return res.status(400).json({ error: 'Missing token or eventId' });

  const eventIdNum = typeof eventId === 'number' ? eventId : Number(eventId);
  if (Number.isNaN(eventIdNum)) return res.status(400).json({ error: 'eventId must be a number' });
  const payload = verifySignedPayload(token, process.env.QR_HMAC_SECRET || 'dev_qr_secret') as any;
  if (!payload) return res.status(400).json({ error: 'Invalid token' });
  if (Date.now() > payload.exp) return res.status(400).json({ error: 'Token expired' });

  const studentId = typeof payload.u === 'number' ? payload.u : Number(payload.u);
  if (Number.isNaN(studentId)) return res.status(400).json({ error: 'Invalid token payload' });

  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student || student.qrToken !== payload.t) return res.status(404).json({ error: 'Student not found' });

  const attendance = await prisma.attendance.create({
    data: {
      studentId: student.id,
      eventId: eventIdNum,
      qrToken: student.qrToken,
      faceVerified: false,
    },
  });
  return res.json({ ok: true, attendanceId: attendance.id });
});

export default router;


