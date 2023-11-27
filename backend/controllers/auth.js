import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../data-models/User.js";

///////////////////////////////////////////////////
// REGISTER USER
export const register = async (req, res) => {
  let data = new User(req.body);
  let existingUser = await User.findOne({ email: data.email });

  // The outer if loop checks to see if there is an existing user with same email
  if (existingUser == null) {
    // This if statement checks the confirm password. This is to make sure the user is correctly typing the password
    // that they actually want.
    try {
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        picturePath,
        friends,
      } = req.body;

      // genSalt() is used to generate a random salt that is then used for hashing pw
      // salt is a random string to make the hash unpredictable
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: passwordHash,
        picturePath: picturePath,
        friends,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.statusCode = 400;
    res.json({ status: false, msg: "User already registered" });
  }
};

///////////////////////////////////////////////////
// LOGGING IN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const username = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "login error: " + err.message });
  }
};

export const dashboard = async (req, res) => {
  try {
    res.json({
      msg: "profile accessed",
      email: authData.oldUser.email,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
    } else {
      res.json({
        status: true,
        msg: "profile accessed",
        email: authData.oldUser.email,
      });
    }
  });
};
