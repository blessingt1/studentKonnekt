import express from 'express';
import auth from '../controllers/userAuthController.js';
import checkAuth from '../middleware/check-auth.js';
const router = express.Router();

// register (no authentication required)
router.post('/register', auth.postUser);

// login (no authentication required)
router.post('/login', auth.postLogin);

// delete user (authentication required)
router.delete('/:userId', checkAuth, auth.deleteUser);

export default router;