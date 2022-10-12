const message = require("../models/message");
const { body, validationResult } = require("express-validator");

exports.getHome = (req, res, next) => {
  message
    .find()
    .populate("user")
    .sort({ date: 1 })
    .exec((err, messages) => {
      if (err) {
        return next(err);
      }
      res.render("index", { user: req.user, messages: messages });
    });
};

exports.getMessage = (req, res, next) => {
  res.render("message", { user: req.user });
};

exports.postMessage = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("title cannot exceed 100 chars"),
  body("message")
    .trim()
    .isLength({ min: 1 })
    .withMessage("message cannot be empty")
    .isLength({ max: 2000 })
    .withMessage("message cannot exceed 2000 chars"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("message", { errors: errors.array() });
      return;
    }
    const newMessage = new message({
      user: req.user._id,
      title: req.body.title,
      message: req.body.message,
      date: Date(),
    });
    newMessage.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
];
