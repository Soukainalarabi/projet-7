const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); //pour proteger nos routes

const userCtrl = require("../controllers/user");
router.post("/signup", userCtrl.signup);
router.delete("/user", auth, userCtrl.deleteUser);

router.post("/login", userCtrl.login);

module.exports = router;
