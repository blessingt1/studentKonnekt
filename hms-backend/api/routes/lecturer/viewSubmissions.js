import express from 'express';
import { viewSubmissions } from '../controllers/lecturer.controller.js'; // Import the relevant controller function

const router = express.Router();

// Define the route for viewing submissions
router.get('/:assignmentId/submissions', viewSubmissions);

export default router;
