import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
   {
      text: {
         type: String,
         required: true
      },
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
      },
      snippetId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Snippet',
         required: true
      },
   }, { timestamps: true }
);

export default mongoose.model('Comment', CommentSchema);