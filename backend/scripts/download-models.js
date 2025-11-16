/**
 * Script to download face-api.js models
 * Run: node scripts/download-models.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const MODEL_BASE_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
const MODEL_DIR = path.join(__dirname, '../models');

// Models needed for face recognition
const MODELS = [
  'ssd_mobilenetv1_model-weights_manifest.json',
  'ssd_mobilenetv1_model-shard1',
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_recognition_model-weights_manifest.json',
  'face_recognition_model-shard1',
  'face_recognition_model-shard2',
];

// Create models directory if it doesn't exist
if (!fs.existsSync(MODEL_DIR)) {
  fs.mkdirSync(MODEL_DIR, { recursive: true });
  console.log(`Created models directory: ${MODEL_DIR}`);
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        file.close();
        fs.unlinkSync(dest);
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      } else {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) {
        fs.unlinkSync(dest);
      }
      reject(err);
    });
  });
}

async function downloadModels() {
  console.log('Downloading face-api.js models...');
  console.log('This may take a few minutes...\n');

  for (let i = 0; i < MODELS.length; i++) {
    const model = MODELS[i];
    const url = `${MODEL_BASE_URL}/${model}`;
    const dest = path.join(MODEL_DIR, model);

    // Skip if already downloaded
    if (fs.existsSync(dest)) {
      console.log(`[${i + 1}/${MODELS.length}] Skipping ${model} (already exists)`);
      continue;
    }

    try {
      console.log(`[${i + 1}/${MODELS.length}] Downloading ${model}...`);
      await downloadFile(url, dest);
      console.log(`[${i + 1}/${MODELS.length}] ✓ Downloaded ${model}`);
    } catch (error) {
      console.error(`[${i + 1}/${MODELS.length}] ✗ Failed to download ${model}:`, error.message);
      throw error;
    }
  }

  console.log('\n✓ All models downloaded successfully!');
  console.log(`Models location: ${MODEL_DIR}`);
}

downloadModels().catch((error) => {
  console.error('\n✗ Error downloading models:', error);
  process.exit(1);
});




