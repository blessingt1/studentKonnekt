import express from 'express';
import multer from 'multer';
import path from 'path';
import checkAuth from '../../middleware/check-auth.js';
import studentCtrl from '../../controllers/studentController.js';
import fs from 'fs';
const router = express.Router();

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only MP4, MOV, and AVI are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 200 * 1024 * 1024
    }
});

// Apply checkAuth middleware to all routes
router.use(checkAuth);

// View Assignments
router.get('/assignments', studentCtrl.getAllAssignments);

// View Assignment by id
router.get('/assignments/:assignmentId', studentCtrl.getAssignmentById);

// Submit selected video
router.post('/selected', upload.single('video'), studentCtrl.postSubmitSelectedVideo);

// Submit recorded video
router.post('/recorded', upload.single('video'), studentCtrl.postSubmitRecordedVideo);

// Browse submissions
router.get('/browse-submissions', studentCtrl.getSubmissions);

// Get submission by ID
router.get('/submissions/:submissionId', studentCtrl.getSubmissionById);

// View feedback
router.get('/feedback', studentCtrl.getFeedback);

export default router;