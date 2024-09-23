import express from 'express';
import auth from '../controllers/userAuthController.js';
const router = express.Router();

// register
router.post('/register', auth.postUser);
// login
router.post('/login', auth.postLogin);
// delete user
router.delete('/:userId', auth.deleteUser);

export default router;
