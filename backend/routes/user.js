const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); //pour proteger nos routes

const userCtrl = require("../controllers/user");

//on a utilisé des route POST car le frontend va egalement envoyer des informations
router.post("/signup", userCtrl.signup);
router.delete("/user", auth, userCtrl.deleteUser);

router.post("/login", userCtrl.login);

module.exports = router;
