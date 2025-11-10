import { Router } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, studentId, password } = req.body as { firstName: string; lastName: string; email: string; studentId: string; password: string };
    if (!firstName || !lastName || !email || !studentId || !password) return res.status(400).json({ error: 'Missing fields' });

    const passwordHash = await bcrypt.hash(password, 10);
    const student = await prisma.student.create({
      data: {
        firstName,
        lastName,
        email,
        studentId,
        passwordHash,
      },
    });
    return res.status(201).json({ id: student.id, firstName: student.firstName, lastName: student.lastName, email: student.email, studentId: student.studentId });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  const student = await prisma.student.findUnique({ where: { email } });

  if (!student) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, student.passwordHash);

  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ sub: student.id }, process.env.JWT_SECRET || 'dev_jwt', { expiresIn: '1d' });
  return res.json({ token, id: student.id, studentId: student.studentId, firstName: student.firstName, lastName: student.lastName, email: student.email });
});

export default router;


