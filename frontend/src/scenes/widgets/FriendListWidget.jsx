import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend.jsx";
import WidgetWrapper from "../../components/WidgetWrapper.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state/index.jsx";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  // const token = useSelector((state) => state.token);
  const following = useSelector((state) => state.user?.following);

  // UPDATED getFriends path
  const getFriends = async () => {
    var bp = require("../../components/Path.js");
    const response = await fetch(
      bp.buildPath(`/users/getFollowing/${userId}`),
      {
        method: "GET",
        headers: { "Content-Type": "application:json" },
      }
    );
    const data = await response.json();

    if (data && Array.isArray(data)) {
      dispatch(setFriends({ following: data }));
    }
  };

  useEffect(() => {
    if (userId) {
      // Ensure that userId is not null or undefined
      getFriends();
    }
  }, [userId]);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {following &&
          following.map((following) => (
            <Friend
              key={following._id}
              friendId={following._id}
              name={`${following.firstName} ${following.lastName}`}
              subtitle={following.occupation}
              userPicturePath={following.picturePath}
            />
          ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
