import express from "express";
import {
  updateProfile,
  updateUser,
  addFriend,
  blockUser,
  searchUsers,
  getFollowing,
  getNumFollowers,
  getNumFollowing,
  getFollowers,
  deleteUser,
  removeFriend,
} from "../controllers/users.js";

const router = express.Router();

// Route to block a user
router.post("/blockUser", blockUser);

// Route to search for users
router.get("/searchUsers", searchUsers);

// Route to update user profile
router.put("/updateProfile", updateProfile);

// Route to update user information
router.put("/updateUser", updateUser);

// Route to delete a user
router.delete("deleteUser/:userId", deleteUser);

// Route to add a friend
router.post("/addFriend/:friendId/:userId", addFriend);

// Route to delete a friend
router.delete("/removeFriend/:friendId", removeFriend);

// Route to get the list of users someone is following
router.get("/getFollowing", getFollowing);

// Route to get the list of followers for a user
router.get("/getFollowers", getFollowers);

// Route to get the number of followers for a user
router.get("/getNumFollowers", getNumFollowers);

// Route to get the number of followers for a user
router.get("/getNumFollowing", getNumFollowing);

export default router;
