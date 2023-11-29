import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../../state/index.jsx";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FlexBetween from "../FlexBetween.jsx";

const PostWidget = ({
  _id,
  firstName,
  lastName,
  caption,
  location,
  videoPath,
  picturePath,
  userPicturePath,
  likes,
}) => {
  // Base URL for your server
  const serverBaseUrl = "https://www.myculinarycompass.com/assets/";
  // "https://myculinarycompass-0c8901cce626.herokuapp.com/assets/";

  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();

  var userData = JSON.parse(localStorage.getItem("user_data"));
  var userId = userData._id;

  const patchLike = async () => {
    var bp = require("../../Path.js");
    const response = await fetch(bp.buildPath(`posts/${_id}/like`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const [newComment, setNewComment] = useState("");
  const post = useSelector((state) =>
    state.auth.posts.find((post) => post._id === _id)
  );

  const commentsLength = post?.comments?.length ?? 0;

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      var bp = require("../../Path.js");
      const response = await fetch(bp.buildPath(`posts/${_id}/addComment`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userData._id, text: newComment }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <img
              src={`${serverBaseUrl}${userPicturePath}`}
              alt={`${firstName} ${lastName}`}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                marginRight: "10px",
                width: "60px",
                height: "60px",
              }}
            />
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              {`${firstName} ${lastName}`}
            </Typography>
          </Box>
          <Typography variant="subtitle2">{""}</Typography>
        </Box>

        <Typography variant="h5" style={{ marginTop: "1rem" }}>
          {caption}
        </Typography>
        <Typography variant="body2">{location}</Typography>

        {picturePath && (
          <img
            src={`${serverBaseUrl}${picturePath}`}
            alt="Post"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "0.75rem",
              marginTop: "0.75rem",
            }}
          />
        )}

        {videoPath && (
          <video
            src={`${serverBaseUrl}${videoPath}`}
            controls
            style={{
              width: "100%",
              borderRadius: "0.75rem",
              marginTop: "0.75rem",
            }}
          />
        )}

        <Box display="flex" alignItems="center" mt={2}>
          <IconButton aria-label="like" onClick={patchLike}>
            <FavoriteBorderIcon />
            <Typography variant="body2" style={{ marginLeft: "5px" }}>
              {likes ? Object.keys(likes).length : 0}
            </Typography>
          </IconButton>

          <FlexBetween gap="0.3rem"></FlexBetween>

          <IconButton
            aria-label="comment"
            onClick={() => setIsComments(!isComments)}
          >
            <ChatBubbleOutlineIcon />
            <Typography variant="body2" style={{ marginLeft: "5px" }}>
              {commentsLength}
            </Typography>
          </IconButton>
        </Box>

        {isComments && (
          <>
            <Box mt="0.5rem">
              {Array.isArray(post?.comments) &&
                post.comments.map((comment, i) => (
                  <React.Fragment key={i}>
                    <Divider />
                    <Typography sx={{ m: "0.5rem 0", pl: "1rem" }}>
                      {comment.text}{" "}
                      {/* Access the text property of the comment object */}
                    </Typography>
                  </React.Fragment>
                ))}
            </Box>
            <form onSubmit={handleAddComment}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <button type="submit">Comment</button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PostWidget;
