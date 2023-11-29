import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  // Base URL for your server
  const serverBaseUrl = "http://www.myculinarycompass.com/assets/";
  // "http://myculinarycompass-0c8901cce626.herokuapp.com/assets/";

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${serverBaseUrl}${image}`}
      />
    </Box>
  );
};

export default UserImage;
