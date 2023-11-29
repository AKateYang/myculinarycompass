import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../state/index.jsx";
import PostWidget from "./PostWidget";

const PostsWidget = ({ isProfile, _id, userId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.auth.posts);

  // UPDATED getPosts
  // Loading in all posts
  const getPosts = async () => {
    var bp = require("../../Path.js");
    const response = await fetch(bp.buildPath("posts/"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  // UPDATED getUserPosts
  const getUserPosts = async () => {
    var bp = require("../../Path.js");
    const response = await fetch(bp.buildPath(`posts/getPost/${_id}`), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {Array.isArray(posts) &&
        posts.map((post) => <PostWidget key={post._id} {...post} />)}
    </div>
  );
};

export default PostsWidget;
