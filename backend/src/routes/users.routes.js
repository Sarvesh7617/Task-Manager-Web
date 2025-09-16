// routes/user.routes.js
import express from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { getAllUsers } from '../controllers/user.controllers.js';

const router = express.Router();

// Get all users
router.get('/', verifyJWT, getAllUsers);

export default router;