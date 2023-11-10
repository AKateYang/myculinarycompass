import Post from "../data-models/Post.js";

export const createPost = async (req, res) => {
  const { caption, video, imagesArray, creatorId } = req.body;
  
  const newPost = new Post({
    creatorId,
    caption,
    Video: video,
    Images: imagesArray,
  });

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    // Assuming Post is a Mongoose model you would find all documents in the posts collection.
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
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

export const updatePost = async (req, res) => {
  const { postId } = req.params; // Assuming the postId is passed as a URL parameter
  const updates = req.body; // All updated fields are expected in the request body

  try {
    // The { new: true } option ensures that the returned document is the modified one.
    const updatedPost = await Post.findByIdAndUpdate(postId, updates, { new: true });
    
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.params; // Assuming the postId is passed as a URL parameter

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};

