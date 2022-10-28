import jwt from 'jsonwebtoken';
import { createError } from './createError.js';


export const verifyToken = (req, res, next) => {
   const token = req.cookies.access_token;
   if (!token) return next(createError(401, "You are not authenticated!"));
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (err) {
      next(createError(401, "You are not authenticated!"));
   }
};

