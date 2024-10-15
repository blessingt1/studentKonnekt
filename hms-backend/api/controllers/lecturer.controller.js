//import Assignment from '../models/assignment.model.js';
import mongoose from 'mongoose';
import Submission from '../models/submission.model.js'; 
import User from '../models/User.js';
import path from 'path';


// View submissions for an assignment
export const viewSubmissions = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        // Retrieve submissions for the assignment
        const submissions = await Submission.find({ assignment: assignmentId }).populate('student'); // Populate with student info if needed
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Stream a video submission...
export const streamVideo = async (req, res) => {
    try {
        const { submissionId } = req.params;

        // Retrieve the submission
        const submission = await Submission.findById(submissionId);
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found.' });
        }

        // Assuming the video is stored as a file path in the submission document
        const videoPath = submission.videoPath;

        // Ensure videoPath is absolute
        const absoluteVideoPath = path.resolve(videoPath);

        // Stream the video
        res.sendFile(absoluteVideoPath, (err) => {
            if (err) {
                res.status(err.status || 500).json({ error: err.message });
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Provide feedback on a submission
export const provideFeedback = async (req, res) => {
    try {
        const { submissionId, feedback, marks, lecturerId } = req.body;

        // Ensure the lecturer exists and has the right role
        const user = await User.findById(lecturerId);
        if (!user || user.role !== 1) {
            return res.status(403).json({ error: 'Access denied. Only lecturers can provide feedback.' });
        }

        // Find the submission
        const submission = await Submission.findById(submissionId);
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found.' });
        }

        // Add feedback and marks to the submission
        submission.feedback = feedback;
        submission.marks = marks;
        submission.feedbackBy = lecturerId;
        await submission.save();

        res.status(200).json(submission);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
