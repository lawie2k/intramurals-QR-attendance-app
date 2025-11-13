# Face Verification Setup Guide

This project uses **face-api.js** for face recognition, which is a free, open-source solution that runs entirely on your server. This avoids expensive cloud services like AWS Rekognition.

## Cost Comparison

- **AWS Rekognition**: ~$1.00 per 1,000 face verifications
  - For 20,000 students with daily attendance: ~$20,000/month (if each student verifies once daily)
- **face-api.js**: $0 (free, runs on your server)
  - Only cost is server hosting (which you need anyway)

## Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install face-api.js canvas @tensorflow/tfjs-node
npm install --save-dev @types/node
```

### 2. Download Face Recognition Models

The face recognition models need to be downloaded once. Run:

```bash
npm run download-models
```

This will download the required models to `backend/models/` directory (~10-15 MB total).

**Alternative Manual Download:**

If the script doesn't work, you can manually download models from:
- https://github.com/justadudewhohacks/face-api.js/tree/master/weights

Place them in `backend/models/` directory.

Required models:
- `ssd_mobilenetv1_model-weights_manifest.json`
- `ssd_mobilenetv1_model-shard1`
- `face_landmark_68_model-weights_manifest.json`
- `face_landmark_68_model-shard1`
- `face_recognition_model-weights_manifest.json`
- `face_recognition_model-shard1`
- `face_recognition_model-shard2`

### 3. Start the Server

```bash
npm run dev
```

The server will automatically load the face recognition models on startup.

## API Endpoints

### Enroll Face

**POST** `/api/face/enroll`

Enroll a student's face for recognition.

**Request Body:**
```json
{
  "studentId": 1,
  "image": "base64_encoded_image_string"
}
```

**Response:**
```json
{
  "ok": true,
  "templateId": 1,
  "message": "Face enrolled successfully"
}
```

### Verify Face

**POST** `/api/face/verify`

Verify a face against a student's enrolled templates.

**Request Body:**
```json
{
  "studentId": 1,
  "image": "base64_encoded_image_string",
  "threshold": 0.6  
}
```

**Response:**
```json
{
  "verified": true,
  "score": 0.85,
  "templateId": 1,
  "message": "Face verified successfully"
}
```

### Scan Attendance (with optional face verification)

**POST** `/api/attendance/scan`

Scan QR code and optionally verify face.

**Request Body:**
```json
{
  "token": "qr_token_string",
  "eventId": 1,
  "faceImage": "base64_encoded_image_string" 
}
```

**Response:**
```json
{
  "ok": true,
  "attendanceId": 1,
  "faceVerified": true,
  "faceScore": 0.85
}
```

## How It Works

1. **Enrollment**: When a student enrolls their face, the system:
   - Detects the face in the image
   - Extracts a 128-dimensional face embedding (vector)
   - Stores the embedding in the database

2. **Verification**: When verifying a face:
   - Extracts face embedding from the new image
   - Compares it with stored embeddings using cosine similarity
   - Returns a match if similarity score is above threshold (default: 0.6)

3. **Storage**: Face embeddings are stored as JSON in the `FaceTemplate` table. The actual images can be stored as base64 data URLs or in cloud storage (S3, etc.).

## Performance Considerations

- **Model Loading**: Models are loaded once at server startup (~2-3 seconds)
- **Face Detection**: ~100-300ms per image (depends on server CPU)
- **Database**: Embeddings are stored as JSON, queries are fast with proper indexing
- **Scalability**: Can handle thousands of verifications per hour on a single server

## Security Notes

- Face embeddings are mathematical representations, not actual images
- Even if someone gains access to embeddings, they cannot reconstruct the original face
- Consider encrypting sensitive data at rest
- Use HTTPS for all API calls

## Troubleshooting

**Error: "Face models not loaded"**
- Ensure models are downloaded in `backend/models/` directory
- Check that the server started successfully

**Error: "No face detected"**
- Ensure the image contains a clear, front-facing face
- Good lighting and image quality improve detection
- Image should be at least 224x224 pixels

**Low verification scores**
- Try enrolling multiple face templates per student (different angles/lighting)
- Adjust threshold (lower = more lenient, higher = stricter)
- Ensure good image quality during enrollment and verification

## Alternative Solutions

If face-api.js doesn't meet your needs, consider:
- **InsightFace** (Python microservice) - More accurate, requires Python
- **face_recognition** (Python) - Simple, good accuracy
- **OpenCV with DNN** - More control, requires more setup

