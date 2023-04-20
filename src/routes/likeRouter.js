const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

router.post('/users/:userId/likes', likeController.createLike);

module.exports = {
  router
};
