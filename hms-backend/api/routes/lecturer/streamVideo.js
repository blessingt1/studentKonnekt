import express from 'express';
import { streamVideo } from '../controllers/lecturer.controller.js'; // Import the relevant controller function

const router = express.Router();

// we still need to define the route for streaming video submissions
router.get('/:submissionId/stream', streamVideo);

export default router;
