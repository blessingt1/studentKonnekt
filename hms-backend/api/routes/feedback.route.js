// Main feedback route configuration

import express from "express"; // Importing Express.js for routing
import FeedbackCtrl from "../controllers/feedback.controller.js"; // Importing Feedback controller for handling feedback operations

const router = express.Router(); // Creating a new Express Router instance

// Route to get feedbacks for a specific assignment
router.route("/assignment/:id").get(FeedbackCtrl.apiGetFeedbacks);

// Route to post a new feedback
router.route("/new").post(FeedbackCtrl.apiPostFeedback); // This route sends a POST request to /api/v1/feedback/new

// Routes for CRUD operations on a specific feedback
router.route("/:id")
    .get(FeedbackCtrl.apiGetFeedback) // Get a feedback by ID
    .put(FeedbackCtrl.apiUpdateFeedback) // Update a feedback
    .delete(FeedbackCtrl.apiDeleteFeedback); // Delete a feedback

// Route to download marks and feedback for a specific assignment
router.route("/assignment/:id/download").get(FeedbackCtrl.apiDownloadMarks);

export default router; // Exporting the configured router
