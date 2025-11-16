import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { extractFaceEmbedding, findBestMatch } from '../lib/faceRecognition';

const router = Router();


router.post('/enroll', async (req, res) => {
  try {
    const { studentId, image } = req.body as { studentId: number; image: string };

    if (!studentId || !image) {
      return res.status(400).json({ error: 'Missing studentId or image' });
    }

    // Verify student exists
    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(image, 'base64');

    // Extract face embedding
    const embedding = await extractFaceEmbedding(imageBuffer);
    if (!embedding) {
      return res.status(400).json({ error: 'No face detected in image' });
    }

    // Store face template in database
    const faceTemplate = await prisma.faceTemplate.create({
      data: {
        studentId: student.id,
        embedding: embedding as any, // Prisma JSON type
        imageUrl: `data:image/jpeg;base64,${image}`, // Store as data URL
        model: 'face-api.js-ssdMobilenetv1',
        embeddingDim: embedding.length,
      },
    });

    return res.json({
      ok: true,
      templateId: faceTemplate.id,
      message: 'Face enrolled successfully',
    });
  } catch (error: any) {
    console.error('Error enrolling face:', error);
    return res.status(500).json({ error: error.message || 'Failed to enroll face' });
  }
});


router.post('/verify', async (req, res) => {
  try {
    const { studentId, image, threshold = 0.6 } = req.body as {
      studentId: number;
      image: string;
      threshold?: number;
    };

    if (!studentId || !image) {
      return res.status(400).json({ error: 'Missing studentId or image' });
    }

    // Get student's face templates
    const templates = await prisma.faceTemplate.findMany({
      where: { studentId },
      select: { id: true, embedding: true },
    });

    if (templates.length === 0) {
      return res.status(404).json({ error: 'No face templates found for this student' });
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(image, 'base64');

    // Extract face embedding from provided image
    const embedding = await extractFaceEmbedding(imageBuffer);
    if (!embedding) {
      return res.status(400).json({ error: 'No face detected in image' });
    }

    // Compare with stored templates
    const templatesWithEmbeddings = templates.map((t) => ({
      embedding: t.embedding as number[],
    }));

    const match = findBestMatch(embedding, templatesWithEmbeddings, threshold);

    if (!match) {
      return res.json({
        verified: false,
        score: 0,
        message: 'Face does not match enrolled templates',
      });
    }

    return res.json({
      verified: true,
      score: match.score,
      templateId: templates[match.index].id,
      message: 'Face verified successfully',
    });
  } catch (error: any) {
    console.error('Error verifying face:', error);
    return res.status(500).json({ error: error.message || 'Failed to verify face' });
  }
});


router.post('/detect', async (req, res) => {
  try {
    const { image } = req.body as { image: string };

    if (!image) {
      return res.json({ detected: false, message: 'Missing image' });
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(image, 'base64');

    // Extract face embedding (just to check if face exists)
    // This is the bottleneck - using pure JS TensorFlow is slow
    const embedding = await extractFaceEmbedding(imageBuffer);
    
    if (!embedding) {
      return res.json({ detected: false, message: 'No face detected' });
    }

    return res.json({ detected: true, message: 'Face detected' });
  } catch (error: any) {
    // Don't log errors for detection failures (too noisy)
    return res.json({ detected: false, message: 'Detection failed' });
  }
});

export default router;


