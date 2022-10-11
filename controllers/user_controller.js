const user = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getSignup = (req, res, next) => {
  res.render("signup");
};

exports.postSignup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    } else {
      //determines whether or not admin checkbox is checked
      let adminBool = false;
      if (req.body.admin) {
        adminBool = true;
      }
      const newUser = new user({
        username: req.body.username,
        password: hashedPassword,
        member: false,
        admin: adminBool,
      });
      newUser.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    }
  });
};
