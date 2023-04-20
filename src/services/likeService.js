const likeDao = require('../models/likeDao')

const likePosts = async (userId, postId) => {
    const postLike = await likeDao.likePosts(
        userId,
        postId
    );

    return postLike;
};

module.exports = {
    likePosts
}