import { Router } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

type SignupBody = {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  department: string;
  password: string;
};

type LoginBody = {
  email: string;
  password: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function createJwt(subject: number) {
  return jwt.sign(
    { sub: subject },
    process.env.JWT_SECRET || 'dev_jwt',
    { expiresIn: '1d' }
  );
}

function getUserIdFromAuth(req: import('express').Request): number | null {
  try {
    const header = req.header('Authorization') || '';
    const [, token] = header.split(' ');
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_jwt') as { sub?: number };
    if (!decoded?.sub && decoded?.sub !== 0) return null;
    return Number(decoded.sub);
  } catch {
    return null;
  }
}

router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, studentId, department, password } = req.body as SignupBody;
    if (!firstName || !lastName || !email || !studentId || !department || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const student = await prisma.student.create({
      data: {
        firstName,
        lastName,
        email: normalizeEmail(email),
        studentId,
        department,
        passwordHash,
      },
    });
    return res.status(201).json({
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      studentId: student.studentId,
      department: student.department,
    });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body as LoginBody;
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const student = await prisma.student.findUnique({
      where: { email: normalizeEmail(email) },
    });

    if (!student) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, student.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = createJwt(student.id);
    return res.json({
      token,
      id: student.id,
      studentId: student.studentId,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      department: student.department || null,
    });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const userId = getUserIdFromAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { oldPassword, newPassword } = req.body as { oldPassword: string; newPassword: string };
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Missing fields' });
    }
   
    const strong = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!strong.test(newPassword)) {
      return res.status(400).json({ error: 'New password too weak' });
    }
    const student = await prisma.student.findUnique({ where: { id: userId } });
    if (!student) {
      return res.status(404).json({ error: 'User not found' });
    }
    const ok = await bcrypt.compare(oldPassword, student.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid current password' });
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.student.update({
      where: { id: userId },
      data: { passwordHash },
    });
    return res.json({ ok: true });
  } catch (e: any) {
    return res.status(400).json({ error: e.message || 'Failed to reset password' });
  }
});

export default router;


