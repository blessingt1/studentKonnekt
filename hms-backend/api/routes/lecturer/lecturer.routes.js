import express from 'express';
import { viewSubmissions, streamVideo, provideFeedback } from '../../controllers/lecturer.controller.js'; // Import the relevant controller functions
import createAssignment from '../../controllers/assignment.js';
const router = express.Router();

// Define the route for creating assignments
//router.post('/', createAssignment);

// Define the route for viewing submissions
router.get('/assignments/:id/submissions', viewSubmissions);

// Define the route for streaming video submissions
router.get('/submissions/:submissionId/stream', streamVideo);

// Define the route for providing feedback on a submission
router.post('/submissions/feedback', provideFeedback);

export default router;
