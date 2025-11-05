import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = Router();
router.post('/signup', async (req, res) => {
    try {
        const { email, studentId, password } = req.body;
        if (!email || !studentId || !password)
            return res.status(400).json({ error: 'Missing fields' });
        const passwordHash = await bcrypt.hash(password, 10);
        const student = await prisma.student.create({
            data: {
                email,
                studentId,
                passwordHash,
            },
        });
        return res.status(201).json({ id: student.id, email: student.email, studentId: student.studentId });
    }
    catch (e) {
        return res.status(400).json({ error: e.message });
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'Missing fields' });
    const student = await prisma.student.findUnique({ where: { email } });
    if (!student)
        return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, student.passwordHash);
    if (!ok)
        return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ sub: student.id }, process.env.JWT_SECRET || 'dev_jwt', { expiresIn: '1d' });
    return res.json({ token });
});
export default router;
