import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";
import User from "../models/User.model.js";

export const register = async (req, res, next) => {
   const { name, email, password } = req.body;
   try {
      const user = await User.findOne({ email });
      if (user) {
         return next(createError(400, "User already exists"));
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
         name,
         email,
         password: hashedPassword,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign(
         { userId: savedUser._id },
         process.env.JWT_SECRET
      );
      res.cookie("jwt", token, { httpOnly: true, secure: true});
      res.status(201).json({ message: "User created successfully" });
   } catch (err) {
      next(err);
   }
};

export const login = async (req, res, next) => {
   try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
         return next(createError(404, 'User not found'));
      }
      const validPassword = await bcrypt.compare(
         req.body.password,
         user.password
      );
      if (!validPassword) {
         return next(createError(400, 'Wrong email or password'));
      }
      const token = jwt.sign(
         { userId: user._id },
         process.env.JWT_SECRET
      );
      res.cookie('jwt', token, {
         httpOnly: true,
         secure: true
      });
      res.status(200).json({
         message: 'Login successful',
         user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
         }
      });
   } catch (err) {
      next(err);
   }
};

export const logout = (req, res) => {
   res.cookie("jwt", "", { maxAge: 1 });
   res.status(200).json({ message: "User logged out successfully" });
};

