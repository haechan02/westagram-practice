const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/:userId', postController.getAllPost);
router.get('/:userId/:postId', postController.getSpecificUserPost);
router.post('/:userId/create', postController.createUserPost);
router.post('/:userId/:postId/edit', postController.editUserPosts);
router.post('/:userId/:postId/delete', postController.deleteUserPosts);

module.exports = {
    router
}