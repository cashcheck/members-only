const message = require("../models/message");
const { body, validationResult } = require("express-validator");

exports.getMessage = (req, res, next) => {
  res.render("message", { user: req.user });
};

exports.postMessage = [body.('title'), (req, res, next) => {}]
