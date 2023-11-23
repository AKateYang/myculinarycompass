import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../homePage/index.jsx";
import UserWidget from "../widgets/UserWidget.jsx";
import MyPostWidget from "../widgets/MyPostWidget.jsx";
import PostsWidget from "../widgets/PostsWidget.jsx";
import AdvertWidget from "../widgets/AdvertWidget.jsx";
import FriendListWidget from "../widgets/FriendListWidget.jsx";
import LoggedInName from "../../components/LoggedInName";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  var _ud = localStorage.getItem("user_data");
  var ud = JSON.parse(_ud);
  var userId = ud.id;
  var firstName = ud.firstName;
  var lastName = ud.lastName;
  const { picturePath } = useSelector((state) => state.user);

  return (
    <div>
      <LoggedInName />

      <Box>
        {/* <Navbar /> */}
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
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget userId={userId} />
          </Box>
          {isNonMobileScreens && (
            <Box flexBasis="26%">
              <AdvertWidget />
              <Box m="2rem 0" />
              <FriendListWidget userId={userId} />
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
