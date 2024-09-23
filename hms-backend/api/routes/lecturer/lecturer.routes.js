import express from 'express';
import createAssignmentRoutes from './createAssignments.js';
import viewSubmissionsRoutes from './viewSubmissions.js';
import streamVideoRoutes from './streamVideo.routes.js';
import provideFeedbackRoutes from './provideFeedback.js';

const router = express.Router();

// Combine all lecturer routes
router.use('/assignments', createAssignmentRoutes);
router.use('/assignments', viewSubmissionsRoutes);
router.use('/submissions', streamVideoRoutes);
router.use('/submissions', provideFeedbackRoutes);

export default router;
