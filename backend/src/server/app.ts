import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import authRouter from '../routes/auth.js';
import studentsRouter from '../routes/students.js';
import attendanceRouter from '../routes/attendance.js';
import faceRouter from '../routes/face.js';
import eventsRouter from '../routes/events.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: '*'}));
app.use(express.json({ limit: '5mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRouter);
app.use('/api/students', studentsRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/face', faceRouter);
app.use('/api/events', eventsRouter);

export default app;


