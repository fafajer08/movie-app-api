// routes/users.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");
const { verify } = require("../auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", verify, userController.getProfile);

module.exports = router;
