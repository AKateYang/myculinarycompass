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
  useTheme,
} from "@mui/material";
import UserImage from "../UserImage.jsx";
import WidgetWrapper from "../WidgetWrapper.jsx";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
  const userId = userData._id;
  const { palette } = useTheme();

  // Assuming recipeId, picturePath, and videoPath are provided or managed elsewhere
  const postPicturePath = "post1.jpeg"; // replace with actual picture path logic
  const postVideoPath = ""; // replace with actual video path logic

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
            backgroundColor: palette.neutral.light,
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
          backgroundColor: "#23e858",
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
