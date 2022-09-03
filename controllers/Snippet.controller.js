import { createError } from "../utils/createError.js";
import Snippet from "../models/Snippet.model.js";
import User from "../models/User.model.js";
import Collection from "../models/Collection.model.js";

export const createSnippet = async (req, res, next) => {
   try {
      const snippet = new Snippet({...req.body, userId: req.user.id});
      await snippet.save();
      res.status(200).json(snippet);
   } catch (err) {
      next(err);
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

//get all snippets of a user
export const getUserSnippets = async (req, res, next) => {
   try {
      const user = await User.findById(req.params.id);
      const snippets = await Snippet.find({ userId: user._id });
      res.status(200).json(snippets);
   } catch (err) {
      next(err);
   }
};

//add a snippet to a collection
export const addSnippetToCollection = async (req, res, next) => {
   try {
      const snippet = await Snippet.findById(req.params.id);
      if (snippet.userId === req.user.id) {
         const collection = await Collection.findById(req.body.collectionId);
         if (collection.userId === req.user.id) {
            await collection.updateOne({ $push: { snippets: snippet } });
            res.status(200).json({
               message: "The snippet has been added to the collection",
            });
         } else {
            next(createError(403, "You can add only your snippet to your collection"));
         }
      } else {
         next(createError(403, "You can add only your snippet to a collection"));
      }
   } catch (err) {
      next(createError(500, err.message));
   }
};

