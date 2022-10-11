let express = require("express");
let router = express.Router();
const userController = require("../controllers/user_controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/signup", userController.getSignup);

router.post("/signup", userController.postSignup);

module.exports = router;
