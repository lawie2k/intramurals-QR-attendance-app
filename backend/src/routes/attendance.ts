import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { verifySignedPayload } from '../lib/crypto';
import { extractFaceEmbedding, findBestMatch } from '../lib/faceRecognition';

const router = Router();

/**
 * POST /api/attendance/scan
 * Scan QR code and optionally verify face
 * Body: { token: string, eventId: number, faceImage?: string (base64) }
 */
router.post('/scan', async (req, res) => {
  try {
    const { token, eventId, faceImage } = req.body as {
      token: string;
      eventId: number | string;
      faceImage?: string;
    };

    if (!token || eventId === undefined || eventId === null) {
      return res.status(400).json({ error: 'Missing token or eventId' });
    }

  const eventIdNum = typeof eventId === 'number' ? eventId : Number(eventId);
    if (Number.isNaN(eventIdNum)) {
      return res.status(400).json({ error: 'eventId must be a number' });
    }

  const payload = verifySignedPayload(token, process.env.QR_HMAC_SECRET || 'dev_qr_secret') as any;
  if (!payload) return res.status(400).json({ error: 'Invalid token' });
  if (Date.now() > payload.exp) return res.status(400).json({ error: 'Token expired' });

  const studentId = typeof payload.u === 'number' ? payload.u : Number(payload.u);
    if (Number.isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid token payload' });
    }

  const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student || student.qrToken !== payload.t) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Face verification (optional)
    let faceVerified = false;
    let faceScore: number | null = null;
    let verifyMethod: string | null = null;

    if (faceImage) {
      try {
        // Get student's face templates
        const templates = await prisma.faceTemplate.findMany({
          where: { studentId: student.id },
          select: { id: true, embedding: true },
        });

        if (templates.length > 0) {
          // Extract face embedding from provided image
          const imageBuffer = Buffer.from(faceImage, 'base64');
          const embedding = await extractFaceEmbedding(imageBuffer);

          if (embedding) {
            // Compare with stored templates
            const templatesWithEmbeddings = templates.map((t) => ({
              embedding: t.embedding as number[],
            }));

            const match = findBestMatch(embedding, templatesWithEmbeddings, 0.6);

            if (match) {
              faceVerified = true;
              faceScore = match.score;
              verifyMethod = 'face-api.js';
            }
          }
        }
      } catch (faceError: any) {
        console.error('Face verification error:', faceError);
        // Continue without face verification if it fails
      }
    }

  const attendance = await prisma.attendance.create({
    data: {
      studentId: student.id,
      eventId: eventIdNum,
      qrToken: student.qrToken,
        faceVerified,
        faceScore,
        verifyMethod,
    },
  });

    return res.json({
      ok: true,
      attendanceId: attendance.id,
      faceVerified,
      faceScore,
    });
  } catch (error: any) {
    console.error('Error in attendance scan:', error);
    return res.status(500).json({ error: error.message || 'Failed to process attendance' });
  }
});

export default router;


