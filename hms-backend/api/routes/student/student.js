const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User');
const Assignment = require('../../models/Assignment');
const Video = require('../../models/Video');
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/ ')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const file_filter = (req, file, cb) => {
    if(file.mimetype.startsWith('video/')) {
        cb(null, true);
    }
    else {
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
        }
        else {
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
})

router.get('/:assignmentId', (req, res, next) => {
    const id = req.body.assignmentId;
    Assignment.findById(id)
    .exec()
    .then(result => {
        console.log(result);
        if (result){
            res.status(200).json(result);
        }
        else {
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

router.post('/Upload%20Video', upload.single('video'), (req, res) => {
    if(!req.file){
        res.status(400).json({
            message: 'No video file uploaded'
        });
    }

    try {
        const video = new Video({
            fileName: req.body.filename,
            filePath: req.body.path,
            fileSize: req.body.size,
            fileType: req.body.mimetype,
            uploadedBy: req.params.userId
        });
        video.save()
        res.status(201).json({
            message: 'Video uploaded successfully'
        });
    }
    catch(error) {
        res.status(400).json(error.message);
    }
});
module.exports = router;