import Feedback from '../models/Feedback.js';
import Assignment from '../models/Assignment.js';
import Submission from '../models/Submission.js';
import { USER_ROLES } from '../models/User.js';
import mongoose from 'mongoose';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs/promises';
import path from 'path';

export default {
    getFeedback: async (req, res) => {
        try {
            if (!req.user || req.user.role !== USER_ROLES.STUDENT) {
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
    },
    getAllAssignments: async (req, res) => {
        try {
            const result = await Assignment.find().exec();
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: 'No assignments found'
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    },
    getAssignmentById: async (req, res) => {
        try {
            const id = req.params.assignmentId;
            const result = await Assignment.findById(id).exec();
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: 'No valid entry found for the provided ID'
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    },
    postSubmission: async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        try {
            const compressedFilePath = await compressVideo(req.file.path);
            
            const submission = new Submission({
                assignmentId: req.body.assignmentId,
                userId: req.user._id,
                videoUrl: compressedFilePath
            });
            await submission.save();

            res.status(201).json({
                message: 'Video uploaded and compressed successfully',
                submission: submission
            });
        } catch (error) {
            console.error('Submission failed:', error);
            res.status(500).json({ error: error.message });
        }
    },
    getSubmissions: async (req, res) => {
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
    },
    getSubmissionById: async (req, res) => {
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
    }
};

async function compressVideo(filePath) {
    const outputPath = path.join(path.dirname(filePath), `compressed_${path.basename(filePath)}`);

    return new Promise((resolve, reject) => {
        ffmpeg(filePath)
            .outputOptions([
                '-c:v libx264',
                '-crf 23',
                '-preset medium',
                '-c:a aac',
                '-b:a 128k'
            ])
            .output(outputPath)
            .on('end', () => {
                console.log(`Video compressed successfully: ${outputPath}`);
                fs.unlink(filePath)
                    .then(() => resolve(outputPath))
                    .catch(reject);
            })
            .on('error', (err) => {
                console.error('Video compression failed:', err);
                reject(err);
            })
            .run();
    });
}