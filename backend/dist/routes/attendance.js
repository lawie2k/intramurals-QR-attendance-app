import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { verifySignedPayload } from '../lib/crypto.js';
const router = Router();
router.post('/scan', async (req, res) => {
    const { token, eventId } = req.body;
    if (!token || !eventId)
        return res.status(400).json({ error: 'Missing token or eventId' });
    const payload = verifySignedPayload(token, process.env.QR_HMAC_SECRET || 'dev_qr_secret');
    if (!payload)
        return res.status(400).json({ error: 'Invalid token' });
    if (Date.now() > payload.exp)
        return res.status(400).json({ error: 'Token expired' });
    const student = await prisma.student.findUnique({ where: { id: payload.u } });
    if (!student || student.qrToken !== payload.t)
        return res.status(404).json({ error: 'Student not found' });
    const attendance = await prisma.attendance.create({
        data: {
            studentId: student.id,
            eventId,
            qrToken: student.qrToken,
            faceVerified: false,
        },
    });
    return res.json({ ok: true, attendanceId: attendance.id });
});
export default router;
