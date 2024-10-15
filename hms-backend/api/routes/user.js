import express from 'express';
import auth from '../controllers/userAuthController.js';
import checkAuth from '../middleware/check-auth.js';
const router = express.Router();

// register (no authentication required)
router.post('/register', auth.postUser);

// login (no authentication required)
router.post('/login', auth.postLogin);

// Get all users (authentication required)
router.get('/', checkAuth, auth.getAllUsers);

// Get a specific user by ID (authentication required)
router.get('/:id', checkAuth, auth.getUserById);

// Create a new user (authentication required)
router.post('/', checkAuth, auth.createUser);

// Update a user by ID (authentication required)
router.put('/:id', checkAuth, auth.updateUser);

// Delete a user by ID (authentication required)
router.delete('/:id', checkAuth, auth.deleteUser);

export default router;
