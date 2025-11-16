import { Router } from 'express';

const router = Router();

// TODO: Replace this stub with real DB query once departments are stored in admin database.
const SAMPLE_DEPARTMENTS = [
  "DASE",
  "DCJE",
  "DBA",
  "DTE",
  "DHT",
  "Nursing",
  "Criminology",
];

router.get('/', async (_req, res) => {
  try {
    res.json({ departments: SAMPLE_DEPARTMENTS });
  } catch (e: any) {
    res.status(500).json({ error: e?.message ?? 'Failed to load departments' });
  }
});

export default router;




