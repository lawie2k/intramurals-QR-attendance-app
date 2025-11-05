import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './server/app.js';
const port = process.env.PORT ? Number(process.env.PORT) : 4000;
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
});
