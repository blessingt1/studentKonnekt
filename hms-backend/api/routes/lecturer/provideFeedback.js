import express from 'express';
import { provideFeedback } from '../controllers/lecturer.controller.js'; // Import the relevant controller function

const router = express.Router();

// here as well we need to define the route for providing feedback
router.post('/feedback', provideFeedback);

export default router;
