const express = require('express');
const userPostController = require('../controllers/userPostController');

const router = express.Router();

router.post('/users/;postId', userPostController.getSpecificUserPost);

module.exports = {
    router
}