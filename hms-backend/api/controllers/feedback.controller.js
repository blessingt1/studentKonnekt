// Our main feedback controller

// Importing required modules
import mongoose from 'mongoose'; // Add this to use ObjectId
import { Parser } from 'json2csv';
const json2csv = new Parser(); // Instantiate the Parser
import Feedback from "../../models/Feedback.model.js"; // Import Feedback model

// Feedback controller class to export for API functions
export default class FeedbackController {
    // Create feedback
    static async apiPostFeedback(req, res, next) {
        try {
            const { assignmentId, feedback, lecturer, mark } = req.body; // Destructure for clarity

            const newFeedback = new Feedback({
                _id: new mongoose.Types.ObjectId(), // Create a new ObjectId
                videoId: assignmentId, // Assuming assignmentId is the videoId
                userId: lecturer, // Assuming lecturer is the userId
                feedbackText: feedback,
                mark: mark
            });

            await newFeedback.save(); // Save feedback directly using the model
            res.json({ status: "success", data: newFeedback }); // Return success with feedback data
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Get feedback by ID
    static async apiGetFeedback(req, res, next) {
        try {
            const id = req.params.id;
            const feedback = await Feedback.findById(id); // Use Feedback model to find by ID
            if (!feedback) {
                return res.status(404).json({ error: "Feedback not found" });
            }
            res.json(feedback);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Update feedback
    static async apiUpdateFeedback(req, res, next) {
        try {
            const feedbackId = req.params.id;
            const { feedback, lecturer, mark } = req.body; // Destructure for clarity

            const feedbackResponse = await Feedback.findByIdAndUpdate(feedbackId, {
                lecturer,
                feedbackText: feedback,
                mark
            }, { new: true }); // Return the updated document

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
            const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId); // Use Feedback model to delete
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
            const feedbacks = await Feedback.find({ videoId: id }); // Use Feedback model to find by videoId
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
}
