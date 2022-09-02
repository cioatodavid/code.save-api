import { createError } from "../utils/createError.js";
import User from "../models/User.model.js";

//get user by id
export const getUserById = async (req, res, next) => {
   try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
   } catch (err) {
      next(err);
   }
};

//update user
export const updateUser = async (req, res, next) => {
   if (req.user.userId === req.params.id) {
      try {
         await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
         });
         res.status(200).json("Account has been updated");
      } catch (err) {
         next(err);
      }
   } else {
      next(createError(403, "You can update only your account"));
   }
};

//delete user
export const deleteUser = async (req, res, next) => {
   if (req.user.id === req.params.id) {
      try {
         await User.findByIdAndDelete(req.params.id);
         res.status(200).json("Account has been deleted");
      } catch (err) {
         next(err);
      }
   } else {
      next(createError(403, "You can delete only your account!"));
   }
};

//follow a user
export const followUser = async (req, res, next) => {
   if (req.user.id !== req.params.id) {
      try {
         const user = await User.findById(req.params.id);
         const currentUser = await User.findById(req.user.id);
         if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.user.id } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json({
               message: "User has been followed",
            });
         } else {
            next(createError(403, "You already follow this user"));
         }
      } catch (err) {
         next(err);
      }
   } else {
      next(createError(403, "You can't follow yourself"));
   }
}

//unfollow a user
export const unfollowUser = async (req, res, next) => {
   if (req.user.id !== req.params.id) {
      try {
         const user = await User.findById(req.params.id);
         const currentUser = await User.findById(req.user.id);
         if (user.followers.includes(req.user.id)) {
            await user.updateOne({ $pull: { followers: req.user.id } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json({
               message: "User has been unfollowed",
            });
         } else {
            next(createError(403, "You don't follow this user"));
         }
      } catch (err) {
         next(err);
      }
   } else {
      next(createError(403, "You can't unfollow yourself"));
   }
}

//get timeline snippets
export const getTimelineSnippets = async (req, res, next) => {
   try {
      const currentUser = await User.findById(req.user.id);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
         currentUser.followings.map((friendId) => {
            return Post.find({ userId: friendId });
         })
      );
      res.status(200).json(userPosts.concat(...friendPosts));
   } catch (err) {
      next(err);
   }
};

//get all snippets of a user
export const getUserSnippets = async (req, res, next) => {
   try {
      const user = await User.findById(req.params.id);
      const snippets = await Post.find({ userId: user._id });
      res.status(200).json(snippets);
   } catch (err) {
      next(err);
   }
};




