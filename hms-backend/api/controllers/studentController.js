// Importing necessary models and utilities
import Feedback from '../models/Feedback.model.js';
import Assignment from '../models/Assignment.js';
import Submission from '../models/submission.model.js';
import { USER_ROLES } from '../models/User.js';
import mongoose from 'mongoose';//THIS NEEDS TO BE USED OR NOT USED
import fs from 'fs/promises';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// Function to check if the user role is allowed to perform an action
const isAllowedRole = (role) => role === USER_ROLES.ADMIN || role === USER_ROLES.STUDENT;

export default {
    // Method to get all feedbacks
    getFeedback: async (req, res) => {
        try {
            // Check if the user role is allowed
            if (!isAllowedRole(req.user.role)) {
                return res.status(403).json({
                    message: 'Access denied'
                });
            }
            
            // Retrieve all feedbacks
            const feedbacks = await Feedback.find();
            res.status(200).json(feedbacks);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: 'getFeedback Internal server error'
            });
        }
    },
    // Method to get all assignments
    getAllAssignments: async (req, res) => {
        try {
            // Check if the user role is allowed
            if (!isAllowedRole(req.user.role)) {
                return res.status(403).json({
                    message: 'Access denied'
                });
            }

            // Retrieve all assignments
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
                error: 'getAllAssignments Internal server error'
            });
        }
    },
    // Method to get an assignment by ID
    getAssignmentById: async (req, res) => {
        try {
            // Check if the user role is allowed
            if (!isAllowedRole(req.user.role)) {
                return res.status(403).json({
                    message: 'Access denied'
                });
            }

            // Retrieve an assignment by ID
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
                error: 'getAssignmentById Internal server error'
            });
        }
    },
    // Method to submit a selected video
    postSubmitSelectedVideo: async (req, res) => {
        if (!isAllowedRole(req.user.role)) {
            return res.status(403).json({
                message: 'Access denied'
            });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        try {
            // Compress the uploaded video
            const compressedFilePath = await compressVideo(req.file.path);
            
            // Create and save a new submission
            const submission = new Submission({
                assignment: req.body.assignmentId,
                student: req.body.userId || req.user._id,
                videoPath: compressedFilePath,
            });
            await submission.save();

            res.status(201).json({
                message: 'Selected video uploaded and compressed successfully',
                submission: submission
            });
        } catch (error) {
            console.error('Selected video submission failed:', error);
            // Delete the uploaded file if it exists
            if (req.file && req.file.path) {
                try {
                    await fs.unlink(req.file.path);
                } catch (unlinkError) {
                    console.error('Failed to delete uploaded file:', unlinkError);
                }
            }
            res.status(500).json({ error: error.message });
        }
    },
    // Method to submit a recorded video
    postSubmitRecordedVideo: async (req, res) => {
        if (!isAllowedRole(req.user.role)) {
            return res.status(403).json({
                message: 'Access denied'
            });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        try {
            // Compress the uploaded video
            const compressedFilePath = await compressVideo(req.file.path);
            
            // Create and save a new submission
            const submission = new Submission({
                assignment: req.body.assignmentId,
                student: req.body.userId || req.user._id,
                videoPath: compressedFilePath,
            });
            await submission.save();

            res.status(201).json({
                message: 'Recorded video uploaded and compressed successfully',
                submission: submission
            });
        } catch (error) {
            console.error('Recorded video submission failed:', error);
            // Delete the uploaded file if it exists
            if (req.file && req.file.path) {
                try {
                    await fs.unlink(req.file.path);
                } catch (unlinkError) {
                    console.error('Failed to delete uploaded file:', unlinkError);
                }
            }
            res.status(500).json({ error: error.message });
        }
    },
    // Method to get all submissions
    getSubmissions: async (req, res) => {
        try {
            // Check if the user role is allowed
            if (!isAllowedRole(req.user.role)) {
                return res.status(403).json({
                    message: 'Access denied'
                });
            }

            // Retrieve all submissions
            const result = await Submission.find().exec();
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
                error: 'getSubmissions Internal server error'
            });
        }
    },
    // Method to get a submission by ID
    getSubmissionById: async (req, res) => {
        try {
            // Check if the user role is allowed
            if (!isAllowedRole(req.user.role)) {
                return res.status(403).json({
                    message: 'Access denied'
                });
            }

            // Retrieve a submission by ID
            const id = req.params.submissionId;
            const result = await Submission.findById(id).exec();
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
                error: 'getSubmissionById Internal server error'
            });
        }
    }
};

// Function to compress a video file
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
            .on('end', async () => {
                console.log(`Video compressed successfully: ${outputPath}`);
                try {
                    await fs.unlink(filePath);
                    resolve(outputPath);
                } catch (error) {
                    console.error('Failed to delete original file:', error);
                    resolve(outputPath);
                }
            })
            .on('error', (err) => {
                console.error('Video compression failed:', err);
                reject(err);
            })
            .run();
    });
}