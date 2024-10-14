import express from 'express';
import { viewAllSubmissions, viewSubmissions, streamVideo, provideFeedback } from '../../controllers/lecturer.controller.js'; // Import the relevant controller functions
const router = express.Router();

// Route for viewing all submissions
router.get('/assignments/submissions', viewAllSubmissions);
// Define the route for viewing submissions
router.get('/assignments/:assignmentId/submissions', viewSubmissions);

// Define the route for streaming video submissions
router.get('/submissions/:submissionId/stream', streamVideo);

// Define the route for providing feedback on a submission
router.post('/submissions/feedback', provideFeedback);

export default router;
