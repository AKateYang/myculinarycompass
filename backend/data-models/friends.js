import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    picturePath: {
      type: String,
      default: [],
    },
    location: String,
    occupation: String,
  },
  { timestamps: true }
);

const Friend = mongoose.model("Friend", FriendSchema);
export default Friend;
