const router = require('express').Router();
const Snippet = require('../models/Snippet.model');

//create a snippet
router.post('/', async (req, res) => {
   const newSnippet = new Snippet(req.body);
   try {
      const savedSnippet = await newSnippet.save();
      res.status(200).json(savedSnippet);
   } catch (err) {
      res.status(500).json(err);
   }
});

//update a snippet
router.put('/:id', async (req, res) => {
   try {
      const snippet = await Snippet.findById(req.params.id);
      if (snippet.userId === req.body.userId) {
         await snippet.updateOne({ $set: req.body });
         res.status(200).json({
            message: 'The snippet has been updated'
         });
      } else {
         res.status(403).json({
            message: 'You can update only your snippet'
         });
      }
   } catch (err) {
      res.status(500).json(err);
   }
});

//delete a snippet 
router.delete('/:id', async (req, res) => {
   try {
      const snippet = await Snippet.findById(req.params.id);
      if (snippet.userId === req.body.userId) {
         await snippet.deleteOne();
         res.status(200).json({
            message: 'The snippet has been deleted'
         });
      } else {
         res.status(403).json({
            message: 'You can delete only your snippet'
         });
      }
   } catch (err) {
      res.status(500).json(err);
   }
});

//get a snippet by id
router.get('/:id', async (req, res) => {
   try {
      const snippet = await Snippet.findById(req.params.id);
      res.status(200).json(snippet);
   } catch (err) {
      res.status(500).json(err);
   }
});

//like / dislike a snippet
router.put('/:id/like', async (req, res) => {
   try {
      const snippet = await Snippet.findById(req.params.id);
      if (!snippet.likes.includes(req.body.userId)) {
         await snippet.updateOne({ $push: { likes: req.body.userId } });
         res.status(200).json({
            message: 'The snippet has been liked'
         });
      } else {
         await snippet.updateOne({ $pull: { likes: req.body.userId } });
         res.status(200).json({
            message: 'The snippet has been disliked'
         });
      }
   } catch (err) {
      res.status(500).json(err);
   }
});


//comment on a snippet
router.post('/comment/:id', async (req, res) => {
   try {
      const snippet = await Snippet.findById(req.params.id);
      const newComment = new Comment(req.body);
      const savedComment = await newComment.save();
      snippet.comments.push(savedComment);
      await snippet.save();
      res.status(200).json(savedComment);
   } catch (err) {
      res.status(500).json(err);
   }
});


module.exports = router;