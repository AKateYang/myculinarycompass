import Post from "../data-models/Post.js";
import User from "../data-models/User.js";

export const createPost = async (req, res) => {
  try {
    // incoming: caption, video, imagesArray, userId
    // outgoing: error

    const { userId, picturePath, videoPath, caption } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      caption: caption,
      videoPath: videoPath,
      picturePath: picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// This gets all posts regardless of user
export const getAllPosts = async (req, res) => {
  try {
    // Assuming Post is a Mongoose model you would find all documents in the posts collection.
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (err) {
    res.status(404).json({ error: "Error: " + err.message });
  }
};

// Gets posts specific to a user
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPost = async (req, res) => {
  const { postId } = req.params; // Extract the post ID from the URL parameters

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params; // Assuming the postId is passed as a URL parameter
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params; // Assuming the postId is passed as a URL parameter
    const { newCaption, newPicPath, newVidPath } = req.body; // All updated fields are expected in the request body
    const updates = {
      caption: newCaption,
      picturePath: newPicPath,
      videoPath: newVidPath,
    };

    // The { new: true } option ensures that the returned document is the modified one.
    const updatedPost = await Post.findByIdAndUpdate(postId, updates, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};

// Updates the likes of a post
export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(postId);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {}
};
