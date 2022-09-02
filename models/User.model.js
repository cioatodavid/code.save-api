const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   profilePicture: {
      type: String,
      default: ''
   },
   coverPicture: {
      type: String,
      default: ''
   },
   followers: {
      type: Array,
      default: []
   },
   followings: {
      type: Array,
      default: []
   },
   isAdmin: {
      type: Boolean,
      default: false
   },
},
   { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);