import { Task } from '../model/task.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({ ...req.body, creator: req.user._id });
  req.app.get('io').emit('taskCreated', task);
  res.status(201).json({ success: true, task });
});

export const getTasks = asyncHandler(async (req, res) => {
  const { status, priority, assignee, keyword } = req.query;
  const query = {};

  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (assignee) query.assignee = assignee;
  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ];
  }

  const tasks = await Task.find(query).populate('creator assignee', 'name email');
  res.json({ success: true, tasks });
});

export const updateTask = asyncHandler(async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) throw new ApiError(404, 'Task not found');

  req.app.get('io').emit('taskUpdated', updated);
  res.json({ success: true, updated });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const deleted = await Task.findByIdAndDelete(req.params.id);
  if (!deleted) throw new ApiError(404, 'Task not found');

  req.app.get('io').emit('taskDeleted', req.params.id);
  res.json({ success: true, message: 'Task deleted successfully' });
});