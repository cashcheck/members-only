const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, maxLength: 50 },
  password: { type: String, required: true },
  member: { type: Boolean, required: true, default: false },
  admin: { type: Boolean, required: true },
});

userSchema.virtual("url").get(function () {
  return `/user/${this.username}`;
});

module.exports = mongoose.model("user", userSchema);
