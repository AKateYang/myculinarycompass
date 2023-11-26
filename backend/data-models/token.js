import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model("token", tokenSchema);
export default Token;
