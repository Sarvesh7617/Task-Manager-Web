// controllers/user.controller.js
import { User } from '../model/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, 'name email');

  if (!users || users.length === 0) {
    throw new ApiError(404, 'No users found');
  }

  res.json({ success: true, users });
});