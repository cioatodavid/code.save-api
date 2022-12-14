import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true
      },
      code: {
         type: String,
         required: true
      },
      trigger: {
         type: String,
         required: false
      },
      language: {
         type: String,
         required: true
      },
      tags: {
         type: [String],
         required: false
      },
      description: {
         type: String,
         required: false
      },
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
      },
      collectionId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Collection',
         required: true
      },
   }, { timestamps: true }
);

export default mongoose.model('Snippet', SnippetSchema);