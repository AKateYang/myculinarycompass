import mongoose from "mongoose";

// Define the Comment schema
const commentSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assuming you have a User model
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    recipeId: String,
    caption: String,
    location: String,
    videoPath: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: [commentSchema], // Define as an array of commentSchema
      default: [], // Default to an empty array
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
