import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import multer from 'multer';

import User from '../../models/User.js';
import Assignment from '../../models/Assignment.js';
import Video from '../../models/Video.js';
import Feedback from '../../models/Feedback.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/ ');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const file_filter = (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Not a video file.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: file_filter,
    limits: {
        fileSize: 1024 * 1024 * 100
    }
});

router.get('/View%20Assignments', (req, res, next) => {
    Assignment.find()
    .exec()
    .then(result => {
        console.log(result);
        if (result.length >= 0) {
            res.status(200).json(result);
        } else {
            res.status(500).json({
                message: 'No assignment found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:assignmentId', (req, res, next) => {
    const id = req.params.assignmentId;
    Assignment.findById(id)
    .exec()
    .then(result => {
        console.log(result);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'No valid entry found for the provided ID'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', upload.single('videoUrl'), (req, res) => {
    if (!req.file) {
        res.status(400).json({
            message: 'No video file uploaded'
        });
    }

    try {
        const video = new Video({
            _id: new mongoose.Types.ObjectId,
            assignmentId : req.body.assignmentId,
            userId: req.body.userId,
            videoUrl: req.file.path
        });
        video.save();
        res.status(201).json({
            message: 'Video uploaded successfully',
            video: video
        });
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// browse own submissions
router.get('/', (req, res, next) => {
    Video.find()
    .exec()
    .then(result => {
        console.log(result);
        if (result.length >= 0) {
            res.status(200).json(result);
        } else {
            res.status(500).json({
                message: 'No video(s) found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:videoId', (req, res, next) => {
    const id = req.params.videoId;
    Video.findById(id)
    .exec()
    .then(result => {
        if(result) {
            res.status(200).json(result);
        }
        else {
            res.status(500).json({
                message: 'No video with the provided video ID exists'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

// View feedback
router.get('/', async (req, res) => {
    try {
        if (!req.user || req.user.role !== 2) {
            return res.status(403).json({
                message: 'Authentication failed due to role access control'
            });
        }
        
        const feedbacks = await Feedback.find({ userId: req.user._id });
        res.status(200).json(feedbacks);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
export default router;
