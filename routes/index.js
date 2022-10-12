let express = require("express");
let router = express.Router();
const userController = require("../controllers/user_controller");
const messageController = require("../controllers/message_controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { user: req.user });
});

router.get("/signup", userController.getSignup);

router.post("/signup", userController.postSignup);

router.get("/signin", userController.getSignin);

router.post("/signin", userController.postSignin);

router.get("/signout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/member", userController.getMember);

router.post("/member", userController.postMember);

router.get("/message", messageController.getMessage);

module.exports = router;
