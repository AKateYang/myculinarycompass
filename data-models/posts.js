import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            require: true,
            min: 2,
            max: 50,
        },
        description: {
            type: String,
            require: true,
            min: 2,
        },
        userPicturePath: {
            type: String,
            default: []
        },
        picturePath: {
            type: String,
            default: []
        },
        likes: {
            type: String,
            default: []
        },
        picturePath: {
            type: String,
            default: []
        },
        location: String,
        userID: Number,  
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema)
export default Post;