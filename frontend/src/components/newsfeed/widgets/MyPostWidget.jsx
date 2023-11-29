import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPosts } from "../../../state/index.jsx";
import FlexBetween from "../FlexBetween.jsx";

import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Divider,
  InputBase,
  Button,
} from "@mui/material";
import UserImage from "../UserImage.jsx";
import WidgetWrapper from "../WidgetWrapper.jsx";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
  const userId = userData._id;

  // Assuming recipeId, picturePath, and videoPath are provided or managed elsewhere
  const postPicturePath = "your-picture-path"; // replace with actual picture path logic
  const postVideoPath = "your-video-path"; // replace with actual video path logic

  const serverBaseUrl = "https://www.myculinarycompass.com/";

  const handlePost = async () => {
    const postContent = {
      userId: userId,
      caption: caption,
      picturePath: postPicturePath,
      videoPath: postVideoPath,
    };

    const response = await fetch(`${serverBaseUrl}posts/createPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postContent),
    });
    console.log("handlePost called");
    const newPost = await response.json();

    if (response.ok) {
      dispatch(setPosts({ posts: newPost }));
      setCaption("");
    } else {
      // Handle errors
      console.error("Failed to create post:" + newPost);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
          sx={{
            width: "100%",
            backgroundColor: "background.paper",
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      <Button
        disabled={!caption}
        onClick={handlePost}
        sx={{
          color: "background.alt",
          backgroundColor: "primary.main",
          borderRadius: "3rem",
          marginTop: "1rem",
        }}
      >
        POST
      </Button>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
