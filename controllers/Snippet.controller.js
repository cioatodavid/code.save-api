import { createError } from "../utils/createError.js";
import Snippet from "../models/Snippet.model.js";
import Comment from "../models/Comment.model.js";

export const createSnippet = async (req, res, next) => {
   const newSnippet = new Snippet(req.body);
   try {
      const savedSnippet = await newSnippet.save();
      res.status(200).json(savedSnippet);
   } catch (err) {
      next(createError(500, err.message));
   }
};

export const updateSnippet = async (req, res, next) => {
   try {
      const snippet = await Snippet.findById(req.params.id);
      if (snippet.userId === req.user.id) {
         await snippet.updateOne({ $set: req.body });
         res.status(200).json({
            message: "The snippet has been updated",
         });
      } else {
         next(createError(403, "You can update only your snippet"));
      }
   } catch (err) {
      next(createError(500, err.message));
   }
};

export const deleteSnippet = async (req, res, next) => {
   try {
      const snippet = await Snippet.findById(req.params.id);
      if (snippet.userId === req.user.id) {
         await snippet.deleteOne();
         res.status(200).json({
            message: "The snippet has been deleted",
         });
      } else {
         next(createError(403, "You can delete only your snippet"));
      }
   } catch (err) {
      next(createError(500, err.message));
   }
};

export const getSnippet = async (req, res, next) => {
   try {
      const snippet = await Snippet.findById(req.params.id);
      res.status(200).json(snippet);
   } catch (err) {
      next(createError(500, err.message));
   }
};

export const likeSnippet = async (req, res, next) => {
   try {
      const snippet = await Snippet.findById(req.params.id);
      if (!snippet.likes.includes(req.user.id)) {
         await snippet.updateOne({ $push: { likes: req.user.id } });
         res.status(200).json({
            message: "The snippet has been liked",
         });
      } else {
         next(createError(403, "You already liked this snippet"));
      }
   } catch (err) {
      next(createError(500, err.message));
   }
};

export const unlikeSnippet = async (req, res, next) => {
   try {
      const snippet = await Snippet.findById(req.params.id);
      if (snippet.likes.includes(req.user.id)) {
         await snippet.updateOne({ $pull: { likes: req.user.id } });
         res.status(200).json({
            message: "The snippet has been unliked",
         });
      } else {
         next(createError(403, "You can't unlike this snippet"));
      }
   } catch (err) {
      next(createError(500, err.message));
   }
};

export const postComment = async (req, res, next) => {
   try {
      const snippet = await Snippet.findById(req.params.id);
      const newComment = new Comment(req.body);
      const savedComment = await newComment.save();
      await snippet.updateOne({ $push: { comments: savedComment } });
      res.status(200).json(savedComment);
   } catch (err) {
      next(createError(500, err.message));
   }
};

export const deleteComment = async (req, res, next) => {
   try {
      const snippet = await Snippet.findById(req.params.id);
      if (snippet.comments.includes(req.params.commentId)) {
         await Comment.findByIdAndDelete(req.params.commentId);
         await snippet.updateOne({ $pull: { comments: req.params.commentId } });
         res.status(200).json({
            message: "The comment has been deleted",
         });
      } else {
         next(createError(403, "You can delete only your comment"));
      }
   } catch (err) {
      next(createError(500, err.message));
   }
};
