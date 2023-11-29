import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPost } from "../../../state/index.jsx";
import { addCommentToPost } from "../../../state/index.jsx";
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
  // userId,
  firstName,
  lastName,
  caption,
  location,
  videoPath,
  picturePath,
  userPicturePath,
  likes,
  comments,
  // ...other props if needed
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
    console.log(_id);
    const response = await fetch(bp.buildPath(`posts/${_id}/like`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const updatedPost = await response.json();
    dispatch(
      addCommentToPost({ postId: _id, comment: updatedPost.newComment })
    );
  };

  const [localComments, setLocalComments] = useState(comments || []);
  const [newComment, setNewComment] = useState(""); // This is for the input value

  const handleAddComment = async (e) => {
    e.preventDefault(); // This line should prevent the default form submission
    try {
      var bp = require("../../Path.js");
      const response = await fetch(bp.buildPath(`posts/${_id}/addComment`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userData._id, text: newComment }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost })); // If using Redux to manage state
      // Update local state for immediate feedback
      setLocalComments([...localComments, updatedPost.newComment]);
      setNewComment(""); // Clear the comment input
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      {" "}
      {/* Added gap between posts */}
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
          {/* Placeholder for created date */}
          <Typography variant="subtitle2">{"MM/DD/YYYY"}</Typography>
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
              {Object.keys(likes).length}
            </Typography>
          </IconButton>

          <FlexBetween gap="0.3rem"></FlexBetween>

          <IconButton
            aria-label="comment"
            onClick={() => setIsComments(!isComments)}
          >
            <ChatBubbleOutlineIcon />
            <Typography variant="body2" style={{ marginLeft: "5px" }}>
              {comments.length}
            </Typography>
          </IconButton>
        </Box>
        {isComments && (
          <>
            <Box mt="0.5rem">
              {comments.map((comment, i) => (
                <React.Fragment key={i}>
                  <Divider />
                  <Typography sx={{ m: "0.5rem 0", pl: "1rem" }}>
                    {comment}
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
