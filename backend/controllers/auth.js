import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../data-models/User.js";

///////////////////////////////////////////////////
// REGISTER USER
export const register = async (req, res) => {
  let data = new User(req.body);
  let existingUser = await User.findOne({ email: data.email });

  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  // The outer if loop checks to see if there is an existing user with same email
  if (existingUser == null) {
    // This if statement checks the confirm password. This is to make sure the user is correctly typing the password
    // that they actually want.
    try {
      const { firstName, lastName, email, password, picturePath, friends } =
        req.body;

      // genSalt() is used to generate a random salt that is then used for hashing pw
      // salt is a random string to make the hash unpredictable
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const number = crypto.randomBytes(16).toString("hex");
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        token: number,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      });
      const savedUser = await newUser.save();
      const info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: "Verification Email", // Subject line
        text: "Welcome to your Culinary Compass!",
        html: `<div>Here is your verification token:\n ${number}\n 
        You will use this when you log in for the first time!</div>`,
      });

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
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const isVerified = user.verified;
    if (!isVerified) return false;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "login error: " + err.message });
  }
};

export const verification = async (req, res) => {
  try {
    const { verification_token, email } = req.body;

    // Use await to get the user object from the query
    const user = await User.findOne({ email: email });

    if (user && verification_token === user.token) {
      // Use await to make sure the update operation is completed before responding
      await User.updateOne({ email: email }, { $set: { verified: true } });
      res.status(200).json({ msg: "Email verified successfully." });
    } else {
      res
        .status(400)
        .json({ msg: "Verification token is wrong or user not found." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
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
