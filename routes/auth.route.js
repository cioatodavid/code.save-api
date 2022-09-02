const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');

// register
router.post('/register', async (req, res) => {
   try {
      // generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // create new user
      const newUser = new User({
         name: req.body.name,
         email: req.body.email,
         password: hashedPassword
      });

      // save user and respond
      const user = await newUser.save();
      res.status(200).json(user);
   } catch (err) {
      res.status(500).json(err);
   }
});

// login
router.post('/login', async (req, res) => {
   try {
      // find user
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
         res.status(400).json('Wrong credentials!')
         return;
      }
      // validate password
      const validPassword = await bcrypt.compare(
         req.body.password,
         user.password
      );
      // respond
      if (!validPassword) {
         res.status(400).json('Wrong credentials!')
         return;
      }
      const { password, ...others } = user._doc;
      res.status(200).json(others);
   } catch (err) {
      res.status(500).json(err);
   }
});

module.exports = router;