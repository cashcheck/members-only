const user = require("../models/user");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { body, validationResult } = require("express-validator");

passport.use(
  new LocalStrategy((username, password, done) => {
    user.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  user.findById(id, function (err, user) {
    done(err, user);
  });
});

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

exports.getSignin = (req, res, next) => {
  res.render("signin");
};

exports.postSignin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/signin",
});

exports.getMember = (req, res, next) => {
  res.render("member");
};

exports.postMember = [
  body("passcode")
    .trim()
    .isAlphanumeric()
    .withMessage("the passcode should only contain alphanumeric characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("member", { errors: errors.array() });
    } else {
      if (req.body.passcode.toLowerCase() === "mellon") {
        user
          .findOneAndUpdate({ _id: req.user._id }, { member: true })
          .exec((err) => {
            if (err) {
              return next(err);
            }
            res.redirect("/");
          });
      } else {
        res.render("member", {
          errors: ["incorrect passcode, speak friend and enter"],
        });
      }
    }
  },
];
