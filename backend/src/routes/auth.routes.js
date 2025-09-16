import express from 'express';
import { registerUser, loginUser, protectedRoute } from '../controllers/auth.controllers.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/protected', verifyJWT, protectedRoute);

export default router;