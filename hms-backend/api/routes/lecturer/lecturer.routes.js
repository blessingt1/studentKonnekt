import express from 'express';
import createAssignmentRoutes from './createAssignment.routes.js';
import viewSubmissionsRoutes from './viewSubmissions.routes.js';
import streamVideoRoutes from './streamVideo.routes.js';
import provideFeedbackRoutes from './provideFeedback.routes.js';

const router = express.Router();

// Combine all lecturer routes
router.use('/assignments', createAssignmentRoutes);
router.use('/assignments', viewSubmissionsRoutes);
router.use('/submissions', streamVideoRoutes);
router.use('/submissions', provideFeedbackRoutes);

export default router;
