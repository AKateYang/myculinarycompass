import User from "../data-models/User.js";

// Helper function to convert string ID to MongoDB ObjectId
const toObjectId = (id) => mongoose.Types.ObjectId(id);

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

// Add a friend handler
export const addFriend = async (req, res) => {
  const { friendId, userId } = req.body;
  const userObjectId = toObjectId(userId);
  const friendObjectId = toObjectId(friendId);

  try {
    // Add friend reference to the user's Following array and increment friend's NumberOfFollowers
    await User.updateOne(
      { _id: userObjectId },
      { $push: { Following: friendObjectId } }
    );
    await User.updateOne(
      { _id: friendObjectId },
      { $inc: { NumberOfFollowers: 1 }, $push: { Followers: userObjectId } }
    );
    res.status(200).json({ message: "Friend added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

export const searchUsers = async (req, res) => {
  const { username } = req.body;
  const search = username.trim();

  try {
    const results = await User.find({
      Login: { $regex: new RegExp(search, "i") },
    });
    const formattedResults = results.map((user) => ({
      login: user.Login,
      id: user._id,
    }));

    res.status(200).json({ results: formattedResults });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFollowing = async (req, res) => {
  const { userId } = req.body;
  const userObjectId = toObjectId(userId);

  try {
    const user = await User.findById(userObjectId);
    res.status(200).json({ following: user.Following });
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
