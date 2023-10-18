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
  const emptyFriends = [];
  const emptyRecipes = [];

  const newUser = {
    Login: login,
    Password: password,
    FirstName: firstname,
    LastName: lastname,
    Email: email,
    PhoneNumber: phone,
    NumberOfFriends: 0,
    Friends: emptyFriends,
    Recipes: emptyRecipes,
  };
  var error = "";

  try {
    const db = client.db("COP4331Cards");
    const result = db.collection("Users").insertOne(newUser);
  } catch (e) {
    error = e.toString();
  }

  // client.close();
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

  client.close();

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

  const result = await db
    .collection("Users")
    .updateOne({ _id: user }, { $push: { Friends: friend } });

  if (result.matchedCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  const results = await db
    .collection("Users")
    .updateOne({ _id: user }, { $inc: { NumberOfFriends: 1 } });

  client.close();

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

  const result = await db
    .collection("Users")
    .updateOne({ _id: user }, { $pull: { Friends: friend } });

  if (result.matchedCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  const results = await db
    .collection("Users")
    .updateOne({ _id: user }, { $inc: { NumberOfFriends: -1 } });

  client.close();

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

  client.close();
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

  client.close();
  var ret = { id: id, firstName: fn, lastName: ln, error: "" };
  res.status(200).json(ret);
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
// For MongoDB Auth
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
client.connect();

///////////////////////////////////////////////////
// For PORT specification
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
