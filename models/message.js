const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  title: { type: String, required: true, maxLength: 100 },
  message: { type: String, required: true, maxLength: 2000 },
  date: { type: Date },
});

// returns formatted date
messageSchema.virtual("dateF", function () {
  return this.date.toLocaleString();
});

module.exports = mongoose.model("message", messageSchema);
