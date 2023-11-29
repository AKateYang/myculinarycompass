import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "../components/newsfeed/widgets/UserWidget.jsx";
import MyPostWidget from "../components/newsfeed/widgets/MyPostWidget.jsx";
import PostsWidget from "../components/newsfeed/widgets/PostsWidget.jsx";
import AdvertWidget from "../components/newsfeed/widgets/AdvertWidget.jsx";
// import FriendListWidget from "../widgets/FriendListWidget.jsx";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/css/navbar.css";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  var _id = localStorage.getItem("user_data");
  var _id = JSON.parse(_id);
  var userId = _id._id;
  var picturePath = _id.picturePath;
  const navigate = useNavigate();

  const doLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("user_data");
    navigate("/");
  };

  // Navigate to NewsFeed function
  const GoToRecipes = (event) => {
    event.preventDefault();
    navigate("/savedRecipes");
  };

  return (
    <div>
      <Box>
        <div className="overlap">
          <div className="text-wrapper-3">
            <button className="newsfeed-button" onClick={GoToRecipes}>
              User Recipes
            </button>
          </div>
          <div className="overlap-group">
            <button className="logout-button" onClick={doLogout}>
              Log Out
            </button>
          </div>
        </div>
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={userId} picturePath={picturePath} />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "60%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget _id={userId} />
          </Box>
          {isNonMobileScreens && (
            <Box flexBasis="10%">
              {/* <AdvertWidget /> */}
              <Box m="2rem 0" />
              {/* <FriendListWidget userId={userId} /> */}
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
