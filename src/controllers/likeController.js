const { post } = require('../routes');
const likeService = require('../services/likeService');

const createLike = async (req, res) => {
    try{
        const { userId, postId} = req.body;

        if (!userId || !postId) {
            return res.status(400).json({ message: "Cannot Bring the Pages"});
        }

        await likeService.likePosts(userId, postId);

        return res. status(201).json({
            message: 'LIKE_SUCCEED',
        });

    } catch(err) {
        console.logo(err);
        return res.status(err.statusCode || 500).json({
            message: err.message
        })
    }
};

module.exports = {
    createLike
}