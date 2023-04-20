const postDao = require('../models/postDao')

const getAllPosts = async (req, res) => {
    try {
        const posts = await postDao.getAllPosts();
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error in getting all posts" });
    }
};

const getSpecificUserPost = async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await postDao.getUserPosts(userId);
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error in getting user posts" });
    }
};

const createPosts = async (userId, title, content, imageUrl, res) => {
    const postCreate = await postDao.createPosts(
        userId,
        title,
        content,
        imageUrl
    );

    return postCreate;
};

const editUserPosts = async (userId, postId, title, content, imageUrl, res) => {
    const editPosts = await postDao.editUserPosts(
        title,
        content,
        image_url,
        userId,
        postId
    );

    return editPosts;
}

const deleteUserPosts = async (postId, userId) => {
    try {
        await postDao.deleteUserPosts(postId, userId);
    } catch (error) {
        console.log(error);
        throw new Error("Error occurred in deleting user posts");
    }
};


module.exports = {
    getAllPosts, getSpecificUserPost, createPosts, editUserPosts, deleteUserPosts
}