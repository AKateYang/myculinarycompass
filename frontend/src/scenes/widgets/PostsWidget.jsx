import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index.jsx";
import PostWidget from "./PostWidget";

const PostsWidget = ({ isProfile, userId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  // Fetch posts
  useEffect(() => {
    // Define your fetch logic here based on 'isProfile' and 'userId'
    // Example: fetchPosts(isProfile ? `posts/user/${userId}` : 'posts/')
  }, [isProfile, userId, dispatch]);

  return (
    <div>
      {posts.map((post) => (
        <PostWidget key={post._id} {...post} />
      ))}
    </div>
  );
};

export default PostsWidget;
