// Our main feedback controller

// Importing required modules
import mongoose from 'mongoose'; // Add this to use ObjectId
import { Parser } from 'json2csv';
const json2csv = new Parser(); // Instantiate the Parser
import Feedback from "../models/Feedback.model.js"; // Import Feedback model
import User from "../models/User.js"; // Import User model
import Submission from "../models/submission.model.js"; // Import User model


// Feedback controller class to export for API functions
export default class FeedbackController {
    // Create feedback
    static async apiPostFeedback(req, res, next) {
        try {
            const { submissionId, userId, feedbackText, mark } = req.body; // Updated to use userId

            // Check if the user is a lecturer
            const user = await User.findById(userId);
            if (!user || user.role !== 1) { // Added user existence check
                return res.status(403).json({ error: 'Access denied. Only a lecturer can provide feedback.' });
            }

            // Check if the submission exists
            const submission = await Submission.findById(submissionId);
            if (!submission) { // Added user existence check
                return res.status(403).json({ error: 'No valid submission.' });
            }

            // Create a new feedback instance
            const newFeedback = new Feedback({
                submissionId,
                userId,
                feedbackText, // Updated to use userId
                mark
            });

            // Save the feedback directly using the model
            await newFeedback.save(); 
            res.json({ status: "success", data: newFeedback }); // Return success with feedback data
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Get feedback by ID
    static async apiGetFeedback(req, res, next) {
        try {
            const id = req.params.id;
            // Use Feedback model to find feedback by ID
            const feedback = await Feedback.findById(id); 
            if (!feedback) {
                return res.status(404).json({ error: "Feedback not found" });
            }
            res.json(feedback);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }


    // Get feedback by assignment ID
    static async apiGetFeedbackForAssignment(req, res, next) {
        try {
            const assignmentId = req.params.id; // Get assignment ID from request parameters
            // Use Feedback model to find feedbacks for the assignment
            // This line of code uses the Feedback model to find all feedback documents in the database where the 'submissionId' field matches the 'assignmentId' provided in the request parameters. The result is stored in the 'feedbacks' variable.
            const feedbacks = await Feedback.find({ submissionId: assignmentId });
            if (feedbacks.length === 0) {
                return res.status(404).json({ error: "No feedback found for this assignment." });
            }
            res.json(feedbacks);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }       




    // Update feedback
    static async apiUpdateFeedback(req, res, next) {
        try {
            const feedbackId = req.params.id;
            const { feedbackText, mark } = req.body; // Updated to use userId

            // Return the updated document
            const feedbackResponse = await Feedback.findByIdAndUpdate(feedbackId, {
                feedbackText,
                mark
            }, { new: true }); 

            if (!feedbackResponse) {
                return res.status(404).json({ error: "Unable to update feedback. Feedback not found." });
            }

            res.json({ status: "success", data: feedbackResponse });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Delete feedback
    static async apiDeleteFeedback(req, res, next) {
        try {
            const feedbackId = req.params.id;
            // Use Feedback model to delete feedback
            const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId); 
            if (!deletedFeedback) {
                return res.status(404).json({ error: "Feedback not found" });
            }
            res.json({ status: "success", data: deletedFeedback });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Get feedback list by assignment ID
    static async apiGetFeedbacks(req, res, next) {
        try {
            const id = req.params.id;
            // Use Feedback model to find feedbacks by videoId
            const feedbacks = await Feedback.find({ videoId: id }); 
            if (feedbacks.length === 0) {
                return res.status(404).json({ error: "No feedback found for this assignment." });
            }
            res.json(feedbacks);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Download marks and feedback for a specific assignment
    static async apiDownloadMarks(req, res, next) {
        try {
            const assignmentId = req.params.id;
            // Find feedbacks for the specified assignment
            const feedbacks = await Feedback.find({ videoId: assignmentId });

            if (!feedbacks || feedbacks.length === 0) {
                return res.status(404).json({ error: "No feedback found for this assignment." });
            }

            // Convert feedbacks to CSV format
            const csv = json2csv.parse(feedbacks); // Use json2csv parser

            // Set headers for file download
            res.setHeader('Content-disposition', 'attachment; filename=marks_feedback.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);

            // Log success message
            console.log(`Marks file downloaded for assignment ID: ${assignmentId}`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to download marks and feedback." });
        }
    }

    // Get all feedback on all user submissions
    static async getAllFeedbackOnAllUserSubmissions(req, res, next) {
        try {
            const userId = req.params.userId; // Get user ID from request parameters
            // Use Feedback model to find all feedbacks for the user's submissions
            const feedbacks = await Feedback.find({ userId }); 
            if (feedbacks.length === 0) {
                return res.status(404).json({ error: "No feedback found for this user's submissions." });
            }
            res.json(feedbacks);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
