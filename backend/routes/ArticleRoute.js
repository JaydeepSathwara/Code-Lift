const express = require('express');
const { getAllArticles } = require('../controllers/articleController.js');
const router = express.Router();

router.route('/articles').get(getAllArticles);
// router.route('/admin/articles/new').post(isAuthenticatedUser, authRoles("admin"), createProduct);
// router.route('/admin/articles/:id').put(isAuthenticatedUser, authRoles("admin"), updateProduct);
// router.route('/admin/articles/:id').delete(isAuthenticatedUser, authRoles("admin"), deleteProduct);
// router.route('/articles/:id').get(getProductDetails);
// router.route('/review').put(isAuthenticatedUser, createProductReview);
// router.route('/reviews').get(getReview);
// router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router;