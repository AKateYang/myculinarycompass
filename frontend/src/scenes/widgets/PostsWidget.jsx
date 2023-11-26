import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index.jsx";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, _id, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // UPDATED getPosts
  // Loading in all posts
  const getPosts = async () => {
    var bp = require("../../components/Path.js");
    const response = await fetch(bp.buildPath("posts/"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  // UPDATED getUserPosts
  const getUserPosts = async () => {
    var bp = require("../../components/Path.js");
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
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
