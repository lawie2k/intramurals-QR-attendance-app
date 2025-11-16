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

/**
 * GET /api/students/me/attendance
 * Get attendance history for a student
 * Query: studentId (number)
 */
router.get('/me/attendance', async (req, res) => {
  try {
    const idParam = req.query.studentId as string | undefined;
    if (!idParam) return res.status(400).json({ error: 'studentId required' });

    const studentId = Number(idParam);
    if (Number.isNaN(studentId)) return res.status(400).json({ error: 'studentId must be a number' });

    const attendances = await prisma.attendance.findMany({
      where: { studentId },
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true,
            studentId: true,
          },
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    // Get all unique event IDs
    const eventIds = [...new Set(attendances.map((a) => a.eventId))];
    
    // Fetch all events in one query
    const events = await prisma.event.findMany({
      where: { id: { in: eventIds } },
      select: { id: true, name: true },
    });

    // Create a map for quick lookup
    const eventMap = new Map(events.map((e) => [e.id, e.name]));

    // Map attendances with event names
    const attendancesWithEvents = attendances.map((attendance) => ({
      id: attendance.id,
      eventName: eventMap.get(attendance.eventId) || 'Unknown Event',
      timestamp: attendance.timestamp.toISOString(),
      faceVerified: attendance.faceVerified,
      faceScore: attendance.faceScore,
      verifyMethod: attendance.verifyMethod,
    }));

    return res.json({ attendances: attendancesWithEvents });
  } catch (error: any) {
    console.error('Error fetching attendance history:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch attendance history' });
  }
});

export default router;


