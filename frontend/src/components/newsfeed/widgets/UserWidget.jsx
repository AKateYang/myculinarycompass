import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../UserImage.jsx";
import FlexBetween from "../FlexBetween.jsx";
import WidgetWrapper from "../WidgetWrapper.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // UPDATED getUser
  const getUser = async () => {
    var user = require("../../Path.js");
    const response = await fetch(user.buildPath(`users/${userId}`), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    following,
    followers,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        // onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            {/* <Typography color={medium}>{following.length} following</Typography> */}
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined
        // onClick={() => navigate(`/profile/${userId}`)}
        />
      </FlexBetween>

      {/* <Divider />

      { SECOND ROW }
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box> */}

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Following</Typography>
          <Typography color={main} fontWeight="500">
            {following.length}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Followers</Typography>
          <Typography color={main} fontWeight="500">
            {followers.length}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />
    </WidgetWrapper>
  );
};

export default UserWidget;
