const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

router.post('', likeController.createLike);

module.exports = {
  router
};
