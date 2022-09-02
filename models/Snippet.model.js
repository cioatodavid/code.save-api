const mongoose = require('mongoose');

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
      likes: {
         type: [mongoose.Schema.Types.ObjectId],
         ref: 'User',
         required: false
      },
      comments: {
         type: [mongoose.Schema.Types.ObjectId],
         ref: 'Comment',
         required: false
      },
   }, { timestamps: true }
);

module.exports = mongoose.model('Snippet', SnippetSchema);