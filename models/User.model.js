import mongoose from 'mongoose';

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
   isAdmin: {
      type: Boolean,
      default: false
   },
   collections: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Collection',
      }
   ], bio: {
      type: String,
      required: false,
   },
   location: {
      type: String,
      required: false,
   },
   website: {
      type: String,
      required: false,
   },
   profilePicture: {
      type: String,
      required: false,
   },
   coverPicture: {
      type: String,
      required: false,
   },
   followers: {
      type: Array,
      default: [],
   },
   following: {
      type: Array,
      default: [],
   },
}, { timestamps: true });


export default mongoose.model('User', UserSchema);
