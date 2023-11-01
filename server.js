const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(cors());
app.use(bodyParser.json());

// Allows the use of .env
require("dotenv").config();
///////////////////////////////////////////////////
// For MongoDB Auth
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
client.connect();

///////////////////////////////////////////////////
// For Api endpoints
app.post("/api/addcard", async (req, res, next) => {
  // incoming: userId, color
  // outgoing: error

  const { userId, card } = req.body;

  const newCard = { Card: card, UserId: userId };
  var error = "";

  try {
    const db = client.db("COP4331Cards");
    const result = db.collection("Cards").insertOne(newCard);
  } catch (e) {
    error = e.toString();
  }

  cardList.push(card);

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post("/api/signup", async (req, res, next) => {
  // incoming: userId, color
  // outgoing: error

  const { login, password, firstname, lastname, email, phone } = req.body;
  const emptyFollowing = [];
  const emptyFollowers = [];
  const emptyRecipes = [];
  const emptyBlock = [];

  const newUser = {
    Login: login,
    Password: password,
    FirstName: firstname,
    LastName: lastname,
    Email: email,
    PhoneNumber: phone,
    NumberOfFollowers: 0,
    Followers: emptyFollowers,
    Following: emptyFollowing,
    Recipes: emptyRecipes,
    Blocked: emptyBlock,
  };
  var error = "";

  const db = client.db("COP4331Cards");
  const result = db.collection("Users").insertOne(newUser);

  const user = result._id;

  saveCookie(firstname, lastname, user);

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post("/api/createPost", async (req, res, next) => {
  // incoming: caption, video, imagesArray, userId
  // outgoing: error

  const { caption, video, imagesArray, creatorId } = req.body;
  const postComments = [];
  const dateCreated = new Date().toISOString();

  const newPost = {
    creatorId: creatorId,
    caption: caption,
    NumberOfLikes: 0,
    NumberOfComments: 0,
    NumberOfShares: 0,
    PostComments: postComments,
    Video: video,
    Images: imagesArray,
    DateCreated: dateCreated,
  };
  var error = "";

  try {
    const db = client.db("COP4331Cards");
    const result = db.collection("Posts").insertOne(newPost);
  } catch (e) {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post("/api/updateProfile", async (req, res, next) => {
  // incoming: userId, color
  // outgoing: error

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

  var ret = { error: error };
  res.status(200).json(ret);
});

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

app.post("/api/addRecipe", async (req, res, next) => {
  // incoming: userId, color
  // outgoing: error

  const { recipeId, userId } = req.body;

  const user = new ObjectId(userId);
  const recipe = new ObjectId(recipeId);

  var error = "";

  const db = client.db("COP4331Cards");

  const result = await db
    .collection("Users")
    .updateOne({ _id: user }, { $push: { Recipes: recipe } });

  if (result.matchedCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

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

app.post("/api/login", async (req, res, next) => {
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  var error = "";

  const { login, password } = req.body;

  const db = client.db("COP4331Cards");
  const results = await db
    .collection("Users")
    .find({ Login: login, Password: password })
    .toArray();

  var id = -1;
  var fn = "";
  var ln = "";

  if (results.length > 0) {
    id = results[0].UserId;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }

  var ret = { id: id, firstName: fn, lastName: ln, error: "" };
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

app.post("/api/searchcards", async (req, res, next) => {
  // incoming: userId, search
  // outgoing: results[], error

  var error = "";

  const { userId, search } = req.body;

  var _search = search.trim();

  const db = client.db("COP4331Cards");
  const results = await db
    .collection("Cards")
    .find({ Card: { $regex: _search + ".*", $options: "i" } })
    .toArray();

  var _ret = [];
  for (var i = 0; i < results.length; i++) {
    _ret.push(results[i].Card);
  }

  var ret = { results: _ret, error: error };
  res.status(200).json(ret);
});

///////////////////////////////////////////////////
// For Heroku deployment
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

///////////////////////////////////////////////////
// For PORT specification
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

function saveCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie =
    "FirstName=" +
    firstname +
    ",LastName=" +
    lastname +
    ",_id=" +
    _id +
    ";expires=" +
    date.toGMTString();

  console.log("Hello world");
}

function readCookie() {
  userId = -1;
  let data = document.cookie;
  let splits = data.split(",");
  for (var i = 0; i < splits.length; i++) {
    let thisOne = splits[i].trim();
    let tokens = thisOne.split("=");
    if (tokens[0] == "FirstName") {
      firstName = tokens[1];
    } else if (tokens[0] == "LastName") {
      lastName = tokens[1];
    } else if (tokens[0] == "UserId") {
      userId = parseInt(tokens[1].trim());
      return userId;
    }
  }

  if (userId < 0) {
    window.location.href = "index.html";
  } else {
    document.getElementById("userName").innerHTML =
      "Logged in as " + firstName + " " + lastName;
  }
}
