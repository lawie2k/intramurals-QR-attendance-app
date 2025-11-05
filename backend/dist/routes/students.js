import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import QRCode from 'qrcode';
import { signPayload } from '../lib/crypto.js';
const router = Router();
router.get('/me/qr', async (req, res) => {
    // For demo purposes, read studentId from query; later, use JWT auth middleware
    const studentId = req.query.studentId || '';
    if (!studentId)
        return res.status(400).json({ error: 'studentId required' });
    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student)
        return res.status(404).json({ error: 'Not found' });
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
