import jwt from 'jsonwebtoken';
import {createError} from './createError.js';


export const verifyToken = (req, res, next) => {
   const authHeader = req.cookies.jwt;
   if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
         if (err) {
            return next(createError(403, 'Invalid token'));
         }
         req.user = user;
         next();
      });
   } else {
      return next(createError(401, 'You are not authenticated'));
   }
}