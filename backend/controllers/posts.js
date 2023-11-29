import Post from "../data-models/Post.js";
import User from "../data-models/User.js";

// WORKING
// create a post
export const createPost = async (req, res) => {
  try {
    // incoming: caption, video, imagesArray, userId
    // outgoing: error

    const { userId, picturePath, videoPath, caption } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userId: userId,
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
// WORKING
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
// WORKING
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId: userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// WORKING
// search for a specific post but unique Id
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params; // Extract the post ID from the URL parameters
    const post = await Post.findById(postId); // Pass postId directly

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};

// WORKING
// deletes a post
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

// WORKING
// Updates post caption, picture, and or video
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
    const { _id } = req.params; // Changed from id to _id to match MongoDB's identifier
    const { userId } = req.body;
    const post = await Post.findById(_id); // Use _id to find the document
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      _id, // Use _id to update the document
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ message: "Server error", error: err.toString() });
  }
};

export const addComment = async (req, res) => {
  try {
    const { _id } = req.params;
    const { userId, text } = req.body;

    if (!text.trim())
      return res.status(400).json({ message: "Comment text is required" });

    const post = await Post.findById(_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = { userId, text, createdAt: new Date() };
    post.comments.push(newComment);

    await post.save();

    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getlikePosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find();

    const isLiked = posts.likes.get(userId);

    if (isLiked) {
      var post = {};
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      _id, // Use _id to update the document
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ message: "Server error", error: err.toString() });
  }
};

export const getLazyLoadingPosts = async (req, res) => {
  try {
    const { pageNumber } = req.body;
    const skip = (pageNumber - 1) * 5;
    // Assuming Post is a Mongoose model, find the last 5 documents in the posts collection.
    const posts = await Post.find().sort({ _id: -1 }).skip(skip).limit(5);
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: "Error: " + err.message });
  }
};

export const saveAndUnsavePosts = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    // Find the user and recipe using findById
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    // Check if the recipe is already saved by the user
    const isSaved = user.saveRecipesId.includes(post.recipeId);

    // Update user's saved recipes
    if (isSaved) {
      user.saveRecipesId = user.saveRecipesId.filter(
        (id) => id !== post.recipeId
      );
    } else {
      user.saveRecipesId.push(post.recipeId);
    }

    // Save the updated user
    await user.save();

    // Send the updated recipe as a response
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};

// export const addComment = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const { comment } = req.body;

//     const post = await Post.findById(postId);

//     post.comments.push(comment);

//     await post.save();

//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json({ error: "Error: " + err.message });
//   }
// };

export const getRecipeId = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    const recipeId = post.recipeId.toString();
    console.log(recipeId);
    res.status(200).json(recipeId);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};

export const getPostUser = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    const recipeId = post.userId.toString();
    res.status(200).json(recipeId);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};

// export const getlikePosts = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const posts = await Post.find();

//     const isLiked = posts.likes.get(userId);

//     if (isLiked) {
//       var post = {};
//     } else {
//       post.likes.set(userId, true);
//     }

//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       { likes: post.likes },
//       { new: true }
//     );

//     res.status(200).json(updatedPost);
//   } catch (err) {}
// };

// export const getLazyLoadingPosts = async (req, res) => {
//   try {
//     const { pageNumber } = req.body;
//     const skip = (pageNumber - 1) * 5;
//     // Assuming Post is a Mongoose model, find the last 5 documents in the posts collection.
//     const posts = await Post.find().sort({ _id: -1 }).skip(skip).limit(5);
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(400).json({ error: "Error: " + err.message });
//   }
// };

// export const saveAndUnsavePosts = async (req, res) => {
//   try {
//     const { userId, postId } = req.params;

//     // Find the user and recipe using findById
//     const user = await User.findById(userId);
//     const post = await Post.findById(postId);

//     // Check if the recipe is already saved by the user
//     const isSaved = user.saveRecipesId.includes(post.recipeId);

//     // Update user's saved recipes
//     if (isSaved) {
//       user.saveRecipesId = user.saveRecipesId.filter(
//         (id) => id !== post.recipeId
//       );
//     } else {
//       user.saveRecipesId.push(post.recipeId);
//     }

//     // Save the updated user
//     await user.save();

//     // Send the updated recipe as a response
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json({ error: "Error: " + err.message });
//   }
// };

// export const getComments = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const post = await Post.findById(postId);

//     res.status(200).json(post.comments);
//   } catch (err) {
//     res.status(500).json({ error: "Error: " + err.message });
//   }
// };

// export const addComment = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const { comment } = req.body;

//     const post = await Post.findById(postId);

//     post.comments.push(comment);

//     await post.save();

//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json({ error: "Error: " + err.message });
//   }
// };

// export const getRecipeId = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const post = await Post.findById(postId);
//     const recipeId = post.recipeId.toString();
//     console.log(recipeId);
//     res.status(200).json(recipeId);
//   } catch (err) {
//     res.status(500).json({ error: "Error: " + err.message });
//   }
// };

// export const getPostUser = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const post = await Post.findById(postId);
//     const recipeId = post.userId.toString();
//     res.status(200).json(recipeId);
//   } catch (err) {
//     res.status(500).json({ error: "Error: " + err.message });
//   }
// };
