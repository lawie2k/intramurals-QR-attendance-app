import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './server/app';
import { loadFaceModels } from './lib/faceRecognition';

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const server = http.createServer(app);

// Load face recognition models on startup
loadFaceModels()
  .then(() => {
server.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    console.error('Please ensure face recognition models are downloaded.');
    process.exit(1);
});


