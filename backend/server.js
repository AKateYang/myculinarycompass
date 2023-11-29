import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

///////////////////////////////////////////////////
// One time upload of dummy data. Uncomment when needed, and comment out when not needed
// import User from "./data-models/User.js";
// import Post from "./data-models/Post.js";

///////////////////////////////////////////////////
// MONGOOSE SETUP
dotenv.config();
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

///////////////////////////////////////////////////
// For Heroku deployment (DO NOT REMOVE)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' https://www.myculinarycompass.com"
  );
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
  app.use(express.static("../frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
