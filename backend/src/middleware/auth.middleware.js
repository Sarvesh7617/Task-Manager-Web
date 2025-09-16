import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../model/user.model.js'; 



export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header('Authorization')?.replace('Bearer ', '');

  if (!token) throw new ApiError(401, 'Unauthorized request');

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded?.id).select('-password');

  if (!user) throw new ApiError(401, 'Invalid access token');

  req.user = user;
  next();
});
