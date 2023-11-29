import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../state/index.jsx";
import PostWidget from "./PostWidget";

const PostsWidget = ({ isProfile, userId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const _uid = JSON.parse(localStorage.getItem("user_data"))._id;
  var userId = _uid._id;

  const serverBaseUrl = "https://www.myculinarycompass.com/";

  // Fetch posts
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch((serverBaseUrl+"posts/"), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
      console.log({ posts: data });
    };
  
    // UPDATED getUserPosts
    const getUserPosts = async () => {
      const response = await fetch((serverBaseUrl+ `posts/getPost/${userId}`), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    };
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
