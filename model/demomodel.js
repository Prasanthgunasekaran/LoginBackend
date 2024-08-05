const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const demoSchema = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      required: true,
      default: () => new mongoose.Types.ObjectId(),
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } 
);

const User = mongoose.model("UserDemo", demoSchema); 
module.exports = User;
