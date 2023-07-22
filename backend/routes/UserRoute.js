const express = require('express');
const router = express.Router();

const multer = require('multer');
const photoUploadMiddleware = multer({ dest: 'public/uploads/' });

const { registerUser, loginUser, getUserProfile, logoutUser, editUserProfile, profileImgUpload, profileImgRemove } = require('../controllers/userController.js');


router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(getUserProfile);
router.route("/edit-profile").post(editUserProfile);
router.post("/profile-photo-uploads", photoUploadMiddleware.single('file'), profileImgUpload);
router.route("/profile-photo-remove").post(profileImgRemove);

module.exports = router;