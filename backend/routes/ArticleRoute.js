const express = require('express');
const router = express.Router();

const { createArticle, editArticle, deleteArticle, addArticleToFav } = require('../controllers/articleController.js');

router.route("/createArticle").post(createArticle);
router.route("/editArticle").post(editArticle);
router.route("/deleteArticle").post(deleteArticle);
router.route("//upload-place-link").post(createArticle);
router.route("/addArticleToFav").post(addArticleToFav);

module.exports = router;