import express from "express";
import {
  updateProfile,
  updateUser,
  // addFriend,
  blockUser,
  addRemoveUserFollowings,
  searchUsers,
  getFollowing,
  getNumFollowers,
  getNumFollowing,
  getFollowers,
  deleteUser,
  removeFriend,
  getUser,
  addRemoveUserFollowers,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);

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

// Route to add / remove a friend
router.patch("/:id/:friendId", addRemoveUserFollowings);

// Route to add / remove a friend
router.patch("/follower/:id/:friendId", addRemoveUserFollowers);

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
