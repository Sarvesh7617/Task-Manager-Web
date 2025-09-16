import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../controllers/task.controllers.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyJWT, createTask);
router.get('/', verifyJWT, getTasks);
router.put('/:id', verifyJWT, updateTask);
router.delete('/:id', verifyJWT, deleteTask);

export default router;