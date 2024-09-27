import express from 'express';
import assignmentController from '../controllers/assignment.js';

const router = express.Router();

// Route to get all assignments
router.get('/', assignmentController.getAllAssignments);

// Route to get an assignment by ID
router.get('/:assignmentId', assignmentController.getAssignmentById);

// Route to create a new assignment
router.post('/', assignmentController.createAssignment);  // POST route for creating assignments

// Route to update an assignment by ID
router.put('/:assignmentId', assignmentController.updateAssignment);  // PUT route for updating assignments

// Route to delete an assignment by ID
router.delete('/:assignmentId', assignmentController.deleteAssignment);  // DELETE route for deleting assignments

export default router;
