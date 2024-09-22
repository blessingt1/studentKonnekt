import express from 'express';
import multer from 'multer';
import path from 'path';
import checkAuth from '../../middleware/check-auth.js';
import studentCtrl from '../../controllers/studentController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
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

// View Assignments
router.get('/assignments', checkAuth, studentCtrl.getAllAssignments);

// View Assignment by id
router.get('/assignments/:assignmentId', checkAuth, studentCtrl.getAssignmentById);

// Submit selected video
router.post('/submit-selected', checkAuth, upload.single('video'), studentCtrl.postSubmitSelectedVideo);

// Submit recorded video
router.post('/submit-recorded', checkAuth, upload.single('video'), studentCtrl.postSubmitRecordedVideo);

// Browse own submissions
router.get('/submissions', checkAuth, studentCtrl.getSubmissions);

// Get submission by ID
router.get('/submissions/:submissionId', checkAuth, studentCtrl.getSubmissionById);

// View feedback
router.get('/feedback', checkAuth, studentCtrl.getFeedback);

export default router;