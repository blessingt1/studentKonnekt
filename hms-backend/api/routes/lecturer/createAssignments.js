import express from 'express';
import { createAssignment } from '../controllers/lecturer.controller.js'; // Import the relevant controller function

const router = express.Router();

// we still need to define the route for creating assignments
router.post('/', createAssignment);

export default router;
