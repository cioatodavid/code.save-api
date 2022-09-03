import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true
      },
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',  
         required: true
      },
      color: {
         type: String,
         required: false,
         default: "#ffffff"
      },
      snippets: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Snippet',
         }
      ]
   }, { timestamps: true }
);

export default mongoose.model('Collection', CollectionSchema);