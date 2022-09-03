import Collection from '../models/Collection.model.js';
import User from '../models/User.model.js';
import { createError } from '../utils/createError.js';

export const createCollection = async (req, res, next) => {
   try {
      const collection = new Collection({ ...req.body, userId: req.user.id });
      await collection.save();
      res.status(200).json(collection);
   } catch (err) {
      next(err);
   }
};

export const updateCollection = async (req, res, next) => {
   try {
      const collection = await Collection.findById(req.params.id);
      if (collection.userId === req.user.id) {
         await collection.updateOne({ $set: req.body });
         res.status(200).json({
            message: 'The collection has been updated',
         });
      } else {
         next(createError(403, 'You can update only your collection'));
      }
   } catch (err) {
      next(createError(500, err.message));
   }
};

export const deleteCollection = async (req, res, next) => {
   try {
      const collection = await Collection.findById(req.params.id);
      if (collection.userId === req.user.id) {
         await collection.deleteOne();
         res.status(200).json({
            message: 'The collection has been deleted',
         });
      } else {
         next(createError(403, 'You can delete only your collection'));
      }
   } catch (err) {
      next(createError(500, err.message));
   }
};

export const getCollection = async (req, res, next) => {
   try {
      const collection = await Collection.findById(req.params.id);
      res.status(200).json(collection);
   } catch (err) {
      next(createError(500, err.message));
   }
};

//get all collections of a user
export const getUserCollections = async (req, res, next) => {
   try {
      const user = await User.findById(req.params.id);
      const collections = await Collection.find({ userId: user._id });
      res.status(200).json(collections);
   } catch (err) {
      next(createError(500, err.message));
   }
};

//get all snippets of a collection
export const getCollectionSnippets = async (req, res, next) => {
   try {
      const collection = await Collection.findById(req.params.id);
      const snippets = collection.snippets;
      res.status(200).json(snippets);
   } catch (err) {
      next(createError(500, err.message));
   }
};