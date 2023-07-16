const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getUserProfile, logoutUser } = require('../controllers/userController.js');

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(getUserProfile);

module.exports = router;