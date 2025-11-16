import * as faceapi from 'face-api.js';
import { Canvas, Image, ImageData } from 'canvas';
import * as tf from '@tensorflow/tfjs';
import * as path from 'path';
import * as fs from 'fs';

// Configure face-api.js to use node canvas
// Type assertions needed because canvas types don't exactly match DOM types
faceapi.env.monkeyPatch({ 
  Canvas: Canvas as any, 
  Image: Image as any, 
  ImageData: ImageData as any 
});

let modelsLoaded = false;
const MODEL_PATH = path.join(__dirname, '../../models');

/**
 * Load face-api.js models. Call this once at server startup.
 * Falls back to loading from CDN if local models are not available.
 */
export async function loadFaceModels(): Promise<void> {
  if (modelsLoaded) return;

  try {
    // Initialize TensorFlow.js backend
    await tf.ready();
    console.log('TensorFlow.js backend initialized');

    // Check if models directory exists and has files
    const hasLocalModels = fs.existsSync(MODEL_PATH) && 
      fs.readdirSync(MODEL_PATH).length > 0;

    if (hasLocalModels) {
      // Load from local disk
      console.log('Loading face recognition models from local disk...');
      await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
      await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);
      await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);
      console.log('✓ Face recognition models loaded from local disk');
    } else {
      // Load from CDN (slower but works without setup)
      console.warn('Local models not found. Loading from CDN (this may take a minute)...');
      console.warn('For better performance, run: npm run download-models');
      
      const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      console.log('✓ Face recognition models loaded from CDN');
    }

    modelsLoaded = true;
  } catch (error) {
    console.error('Error loading face models:', error);
    throw new Error('Failed to load face recognition models. Please ensure models are downloaded or check your internet connection.');
  }
}

/**
 * Extract face embedding from an image buffer
 * @param imageBuffer - Image buffer (JPEG/PNG)
 * @returns Face embedding as array of numbers, or null if no face detected
 */
export async function extractFaceEmbedding(imageBuffer: Buffer): Promise<number[] | null> {
  if (!modelsLoaded) {
    throw new Error('Face models not loaded. Call loadFaceModels() first.');
  }

  try {
    // Convert buffer to image - canvas Image needs to load asynchronously
    const img = new Image();
    
    // Load image from buffer asynchronously
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (err) => reject(new Error('Failed to load image from buffer'));
      img.src = imageBuffer;
    });

    // Use faster detection mode for quick checks (no landmarks needed for detection-only)
    // Type assertion needed because canvas Image doesn't exactly match HTMLImageElement
    const detection = await faceapi
      .detectSingleFace(img as any)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      return null; // No face detected
    }

    // Convert Float32Array to regular array
    return Array.from(detection.descriptor);
  } catch (error) {
    console.error('Error extracting face embedding:', error);
    throw new Error('Failed to extract face embedding');
  }
}

/**
 * Compare two face embeddings and return similarity score (0-1)
 * @param embedding1 - First face embedding
 * @param embedding2 - Second face embedding
 * @returns Similarity score (higher = more similar, typically > 0.6 is a match)
 */
export function compareFaceEmbeddings(
  embedding1: number[],
  embedding2: number[]
): number {
  if (embedding1.length !== embedding2.length) {
    throw new Error('Embeddings must have the same dimension');
  }

  // Calculate cosine similarity
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (let i = 0; i < embedding1.length; i++) {
    dotProduct += embedding1[i] * embedding2[i];
    norm1 += embedding1[i] * embedding1[i];
    norm2 += embedding2[i] * embedding2[i];
  }

  const similarity = dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  

  return (similarity + 1) / 2;
}


/**
 * Find the best matching face template for a given embedding
 * @param embedding - Face embedding to match
 * @param templates - Array of face templates with embeddings
 * @param threshold - Minimum similarity score to consider a match (default: 0.6)
 * @returns Best match with score, or null if no match above threshold
 */
export function findBestMatch(
  embedding: number[],
  templates: Array<{ embedding: number[] }>,
  threshold: number = 0.6
): { score: number; index: number } | null {
  if (templates.length === 0) return null;

  let bestScore = 0;
  let bestIndex = -1;

  for (let i = 0; i < templates.length; i++) {
    const score = compareFaceEmbeddings(embedding, templates[i].embedding);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = i;
    }
  }

  if (bestScore >= threshold) {
    return { score: bestScore, index: bestIndex };
  }

  return null;
}

