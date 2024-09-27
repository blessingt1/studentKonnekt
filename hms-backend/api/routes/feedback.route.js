// Main feedback route configuration

import express from "express"; // Importing Express.js for routing
import FeedbackCtrl from "../controllers/feedback.controller.js"; // Importing Feedback controller for handling feedback operations

const router = express.Router(); // Creating a new Express Router instance


// Route to get all feedback
router.route("/").get(FeedbackCtrl.apiGetFeedbacks);
router.route("/").post(FeedbackCtrl.apiPostFeedback); // This route sends a POST request to /feedback


// Route to get feedbacks for a specific assignment
router.route("/assignment/:assignmentId").get(FeedbackCtrl.apiGetFeedbackForAssignment);


// Routes for CRUD operations on a specific feedback
router.route("/:id")
    .get(FeedbackCtrl.apiGetFeedback) // Get a feedback by ID
    .put(FeedbackCtrl.apiUpdateFeedback) // Update a feedback
    .delete(FeedbackCtrl.apiDeleteFeedback); // Delete a feedback

// Route to download marks and feedback for a specific assignment
router.route("/assignment/:assignmentId/download").get(FeedbackCtrl.apiDownloadMarks);

// Route to get all feedback on all user submissions
router.route("/feedback/users/:userId").get(FeedbackCtrl.getAllFeedbackOnAllUserSubmissions); // Added route for getting all feedback for a user

export default router; // Exporting the configured router
