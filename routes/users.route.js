const router = require('express').Router();
const Snippet = require('../models/Snippet.model');
const User = require('../models/User.model');
const Comment = require('../models/Comment.model');

//update user
router.put('/:id', async (req, res) => {
   if (req.body.userId === req.params.id) {
      if (req.body.password) {
         try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
         } catch (err) {
            return res.status(500).json(err);
         }
      }
      try {
         const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
         });
         res.status(200).json('Account has been updated');
      } catch (err) {
         return res.status(500).json(err);
      }
   } else {
      return res.status(403).json('You can update only your account!');
   }
});

//delete user
router.delete('/:id', async (req, res) => {
   if (req.body.userId === req.params.id) {
      try {
         const user = await User.findByIdAndDelete(req.params.id);
         res.status(200).json('Account has been deleted');
      } catch (err) {
         return res.status(500).json(err);
      }
   } else {
      return res.status(403).json('You can delete only your account!');
   }
});

//get a user
router.get('/:id', async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
   } catch (err) {
      res.status(500).json(err);
   }
});

//follow a user
router.put('/:id/follow', async (req, res) => {
   if (req.body.userId !== req.params.id) {
      try {
         const user = await User.findById(req.params.id);
         const currentUser = await User.findById(req.body.userId);
         if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json({
               message: 'User has been followed'
            });
         } else {
            res.status(403).json({
               message: 'You already follow this user'
            });
         }
      } catch (err) {
         res.status(500).json(err);
      }
   } else {
      res.status(403).json({
         message: 'You cannot follow yourself'
      });
   }
});

//unfollow a user
router.put('/:id/unfollow', async (req, res) => {
   if (req.body.userId !== req.params.id) {
      try {
         const user = await User.findById(req.params.id);
         const currentUser = await User.findById(req.body.userId);
         if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json({
               message: 'User has been unfollowed'
            });
         } else {
            res.status(403).json({
               message: 'You do not follow this user'
            });
         }
      } catch (err) {
         res.status(500).json(err);
      }
   } else {
      res.status(403).json({
         message: 'You cannot unfollow yourself'
      });
   }
});

//get friends
router.get('/friends/:userId', async (req, res) => {
   try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
         user.followings.map((friendId) => {
            return User.findById(friendId);
         })
      );
      let friendList = [];
      friends.map((friend) => {
         const { _id, name, profilePicture } = friend;
         friendList.push({ _id, name, profilePicture });
      });
      res.status(200).json(friendList);
   } catch (err) {
      res.status(500).json(err);
   }
});

//get user's all snippets
router.get('/snippets/:userId', async (req, res) => {
   try {
      const snippets = await Snippet.find({ userId: req.params.userId });
      res.status(200).json(snippets);
   } catch (err) {
      res.status(500).json(err);
   }
});



module.exports = router;