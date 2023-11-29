import User from "../data-models/User.js";

// Helper function to convert string ID to MongoDB ObjectId
// const toObjectId = (_id) => mongoose.Types.ObjectId(_id);

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserName = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user.firstName);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const isVerified = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user.verified);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  const { userId, firstname, lastname } = req.body;
  const userObjectId = toObjectId(userId);

  try {
    // Use the User model to update the user's first and last names
    await User.updateOne(
      { _id: userObjectId },
      { $set: { FirstName: firstname, LastName: lastname } }
    );
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User update handler
export const updateUser = async (req, res) => {
  const { userId, newlogin, newpassword, newemail, newphone } = req.body;
  const userObjectId = toObjectId(userId);

  try {
    // Update all the fields in a single query to avoid multiple operations
    await User.updateOne(
      { _id: userObjectId },
      {
        $set: {
          Login: newlogin,
          Password: newpassword,
          Email: newemail,
          PhoneNumber: newphone,
        },
      }
    );
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(({ _id }) => {
      return { _id };
    });
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// adding & removing who the current user wants to follow and updates/keeps track of the total followers of the
// account that the current user wants to follow.
export const addRemoveUserFollowings = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const follower = await User.findById(friendId);

    // (id != friendId) was added so that we can get the total followers/follow of current user by passing in the id for
    // both id and friend with out affecting follower table.
    if (user.following.includes(friendId) && id != friendId) {
      // user starts following the friend
      user.following = user.following.filter((id) => id !== friendId);
      // the friend gets a new follower
      follower.followers = follower.followers.filter((id) => id !== id);
    } else if (id != friendId) {
      // This else is used for toggling. The user unfollows a friend
      user.following.push(friendId);
      // The friend loses a follower
      follower.followers.push(id);
    }
    await user.save();
    await follower.save();

    // Keeps track of total follower/following for both friend and current user
    const currentUserFollowing = user.following.length;
    const currentUserFollowers = user.followers.length;

    // const otherUserFollowing = follower.following.length;
    // const otherUserFollowers = follower.followers.length;

    const following = await Promise.all(
      user.following.map((id) => User.findById(id))
    );
    const formattedFollowing = following.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json({
      nowFollowing: formattedFollowing,
      currentUserFollowing: currentUserFollowing,
      currentUserFollowers: currentUserFollowers,
      // otherUserFollowing: otherUserFollowing,
      // otherUserFollowers: otherUserFollowers,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// adding & removing when someone follows / unfollows current user
export const addRemoveUserFollowers = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(friendId);
    // const friend = await User.findById(friendId);

    if (user.followers.includes(id)) {
      user.followers = user.followers.filter((friendId) => friendId !== id);
      // friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.followers.push(id);
      // friend.friends.push(id);
    }
    await user.save();
    // await friend.save();

    const followers = await Promise.all(
      user.followers.map((friendId) => User.findById(friendId))
    );
    const formattedFollowers = followers.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFollowers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Block user handler
export const blockUser = async (req, res) => {
  const { blockId, userId } = req.body;
  const userObjectId = toObjectId(userId);
  const blockObjectId = toObjectId(blockId);

  try {
    const result = await User.updateOne(
      { _id: userObjectId },
      { $push: { Blocked: blockObjectId } }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User blocked successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeFriend = async (req, res) => {
  const { friendId, userId } = req.body;
  const userObjectId = toObjectId(userId);
  const friendObjectId = toObjectId(friendId);

  try {
    await User.updateOne(
      { _id: userObjectId },
      { $pull: { Following: friendObjectId } }
    );
    await User.updateOne(
      { _id: friendObjectId },
      { $inc: { NumberOfFollowers: -1 }, $pull: { Followers: userObjectId } }
    );
    res.status(200).json({ message: "Friend removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// WORKING
export const searchUsers = async (req, res) => {
  const search = req.params.username.trim();

  try {
    const results = await User.find({
      username: { $regex: new RegExp(search, "i") },
    });

    const formattedResults = results.map((user) => ({
      username: user.username,
      id: user._id,
    }));

    res.status(200).json({ results: formattedResults });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFollowing = async (req, res) => {
  // const userObjectId = toObjectId(userId);

  try {
    const { _id } = req.params;
    console.log("ID received:", _id);
    const user = await User.findById({ _id });
    res.status(200).json({ following: user.following });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNumFollowers = async (req, res) => {
  const { userId } = req.body;
  const userObjectId = toObjectId(userId);

  try {
    const user = await User.findById(userObjectId);
    res.status(200).json({ numberOfFollowers: user.NumberOfFollowers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNumFollowing = async (req, res) => {
  const { userId } = req.body;
  const userObjectId = toObjectId(userId);

  try {
    const user = await User.findById(userObjectId);
    res.status(200).json({ numberOfFollowers: user.NumberOfFollowers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFollowers = async (req, res) => {
  const { userId } = req.body;
  const userObjectId = toObjectId(userId);

  try {
    const user = await User.findById(userObjectId);
    res.status(200).json({ followers: user.Followers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteFriend = async (req, res) => {
  const { friendId } = req.params;

  try {
    await Friend.findByIdAndDelete(friendId);
    res.status(200).json({ message: "Friend successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
