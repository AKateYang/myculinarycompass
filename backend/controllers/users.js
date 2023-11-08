import User from "../data-models/User.js";

export const updateProfile = async (req, res) => {
  // incoming: userId, color
  // outgoing: error

  try {
    const { userId, firstname, lastname } = req.body;
    const user = new ObjectId(userId);

    var error = "";

    const db = client.db("COP4331Cards");

    await db
      .collection("Users")
      .updateOne({ _id: user }, { $set: { FirstName: firstname } });

    await db
      .collection("Users")
      .updateOne({ _id: user }, { $set: { LastName: lastname } });

    res.status(200).json(ret);
  } catch (err) {
    // var ret = { error: error };
    res.status(404).json({ message: err.message });
  }
};

app.post("/api/updateUser", async (req, res, next) => {
  // incoming: userId, color
  // outgoing: error

  const { userId, newlogin, newpassword, newemail, newphone } = req.body;

  const user = new ObjectId(userId);

  var error = "";

  const db = client.db("COP4331Cards");

  await db
    .collection("Users")
    .updateOne({ _id: user }, { $set: { Login: newlogin } });

  await db
    .collection("Users")
    .updateOne({ _id: user }, { $set: { Password: newpassword } });

  await db
    .collection("Users")
    .updateOne({ _id: user }, { $set: { Email: newemail } });

  await db
    .collection("Users")
    .updateOne({ _id: user }, { $set: { PhoneNumber: newphone } });

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post("/api/addFriend", async (req, res, next) => {
  // incoming: userId, color
  // outgoing: error

  const { friendId, userId } = req.body;

  const user = new ObjectId(userId);
  const friend = new ObjectId(friendId);

  var error = "";

  const db = client.db("COP4331Cards");

  await db
    .collection("Users")
    .updateOne({ _id: user }, { $push: { Following: friend } });

  await db
    .collection("Users")
    .updateOne({ _id: friend }, { $inc: { NumberOfFollowers: 1 } });

  await db
    .collection("Users")
    .updateOne({ _id: friend }, { $push: { Followers: user } });

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post("/api/blockUser", async (req, res, next) => {
  // incoming: userId, color
  // outgoing: error

  const { blockId, userId } = req.body;

  const user = new ObjectId(userId);
  const block = new ObjectId(blockId);

  var error = "";

  const db = client.db("COP4331Cards");

  const result = await db
    .collection("Users")
    .updateOne({ _id: user }, { $push: { Blocked: block } });

  if (result.matchedCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post("/api/removeFriend", async (req, res, next) => {
  // incoming: userId, color
  // outgoing: error

  const { friendId, userId } = req.body;

  const user = new ObjectId(userId);
  const friend = new ObjectId(friendId);

  var error = "";

  const db = client.db("COP4331Cards");

  await db
    .collection("Users")
    .updateOne({ _id: user }, { $pull: { Following: friend } });

  await db
    .collection("Users")
    .updateOne({ _id: friend }, { $inc: { NumberOfFollowers: -1 } });

  await db
    .collection("Users")
    .updateOne({ _id: friend }, { $pull: { Followers: user } });

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post("/api/searchUsers", async (req, res, next) => {
  // incoming: userId, search
  // outgoing: results[], error

  var error = "";

  const { username } = req.body;

  var _search = username.trim();

  const db = client.db("COP4331Cards");
  const results = await db
    .collection("Users")
    .find({ Login: { $regex: _search + ".*", $options: "i" } })
    .toArray();

  var _ret = [];
  for (var i = 0; i < results.length; i++) {
    _ret.push(results[i].Login + " " + results[i]._id);
  }

  var ret = { results: _ret, error: error };
  res.status(200).json(ret);
});

app.post("/api/getFollowing", async (req, res, next) => {
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  var error = "";

  const { userId } = req.body;

  const user = new ObjectId(userId);

  const db = client.db("COP4331Cards");
  const results = await db.collection("Users").find({ _id: user });

  res.status(200);

  return results.Following;
});

app.post("/api/getNumFollowers", async (req, res, next) => {
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  var error = "";

  const { userId } = req.body;

  const user = new ObjectId(userId);

  const db = client.db("COP4331Cards");
  const results = await db.collection("Users").find({ _id: user });

  res.status(200);

  return results.NumberOfFollowers;
});

app.post("/api/getFollowers", async (req, res, next) => {
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  var error = "";

  const { userId } = req.body;

  const user = new ObjectId(userId);

  const db = client.db("COP4331Cards");
  const results = await db.collection("Users").find({ _id: user });

  res.status(200);

  return results.Followers;
});
