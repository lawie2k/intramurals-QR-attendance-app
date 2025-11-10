import { Router } from 'express';
import { prisma } from '../lib/prisma';
import QRCode from 'qrcode';
import { signPayload } from '../lib/crypto';

const router = Router();

router.get('/me/qr', async (req, res) => {
  const idParam = req.query.studentId as string | undefined;
  if (!idParam) return res.status(400).json({ error: 'studentId required' });

  const studentId = Number(idParam);
  if (Number.isNaN(studentId)) return res.status(400).json({ error: 'studentId must be a number' });

  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student) return res.status(404).json({ error: 'Not found' });

  const payload = {
    u: student.id,
    t: student.qrToken,
    ts: Date.now(),
    exp: Date.now() + 1000 * 60 * 10, // 10 minutes recommended for freshness
  };

  const token = signPayload(payload, process.env.QR_HMAC_SECRET || 'dev_qr_secret');
  const dataUrl = await QRCode.toDataURL(token);
  return res.json({ qr: dataUrl, token });
});

export default router;


