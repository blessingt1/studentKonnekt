import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import multer from 'multer';
import Submission from '../../models/Submission.js';
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
    if (file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Not a video file.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 100
    }
});

// View Assignments
router.get('/assignments', checkAuth, studentCtrl.getAllAssignments);
// View Assignment by id
router.get('/assignments/:assignmentId', checkAuth, studentCtrl.getAssignmentById);

// Submit video
router.post('/submit', checkAuth, upload.single('videoUrl'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: 'No video file uploaded'
        });
    }

    try {
        const video = new Submission({
            _id: new mongoose.Types.ObjectId(),
            assignmentId: req.body.assignmentId,
            userId: req.user._id,
            videoUrl: req.file.path
        });
        await video.save();
        res.status(201).json({
            message: 'Video uploaded successfully',
            video: video
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Browse own submissions
router.get('/submissions', checkAuth, async (req, res) => {
    try {
        const result = await Submission.find({ userId: req.user._id }).exec();
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'No submissions found'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// Get submission by ID
router.get('/submissions/:submissionId', checkAuth, async (req, res) => {
    try {
        const id = req.params.submissionId;
        const result = await Submission.findOne({ _id: id, userId: req.user._id }).exec();
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'No submission found with the provided ID'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// View feedback
router.get('/feedback', checkAuth, studentCtrl.getFeedback);

export default router;