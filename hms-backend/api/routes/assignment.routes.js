import express from 'express';
import assignmentController from '../controllers/assignment.js';

const router = express.Router();

// Route to get all assignments
router.get('/', assignmentController.getAllAssignments);

// Route to get an assignment by ID
router.get('/:assignmentId', assignmentController.getAssignmentById);

// Route to create a new assignment
router.post('/', assignmentController.createAssignment);  // POST route for creating assignments

export default router;
