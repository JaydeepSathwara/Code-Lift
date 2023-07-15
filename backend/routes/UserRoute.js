const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getUserProfile } = require('../controllers/userController.js');

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(getUserProfile);

module.exports = router;