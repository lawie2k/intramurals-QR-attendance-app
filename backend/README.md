Backend (Node.js + Express + Prisma)

Setup

1) Create .env in this folder with:

DATABASE_URL="mysql://root:password@localhost:3306/qr_attendance"
PORT=4000
JWT_SECRET="replace_me"
QR_HMAC_SECRET="replace_me_qr"

2) Install deps, migrate, run

npm install
npx prisma migrate dev --name init
npm run dev

Endpoints (initial)

- GET  /api/health
- POST /api/auth/signup {email, studentId, password}
- POST /api/auth/login  {email, password}
- GET  /api/students/me/qr?studentId=<id>
- POST /api/attendance/scan {token, eventId}
- GET  /api/events
- POST /api/events {name}

Notes

- Wire face enroll/verify in routes/face.ts later (Rekognition or InsightFace).
- Replace the studentId query param with JWT auth once login is integrated on clients.


