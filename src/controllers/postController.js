const postService = require('../services/postService');

const getAllPost = async (req, res) => {
  try {
    if (!req) {
      return res.status(400).json({ message: 'POSTS_NOT_FOUND'});
    }
  
    await postService.getAllPosts(req, res);
  
    return res.status(200).json({
      message: 'SUCCESSFULLY GETTING POSTS'
    });
  } catch(err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
          message: err.message
    });
  }
};

const getSpecificUserPost = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: 'USER_POSTS_NOT_FOUND'});
    }

    await postService.getSpecificUserPost(userId);

    return res.status(200).json({
      message: 'SUCCESSFULLY GETTING USERS POSTS'
    });
  }catch(err){
    console.log(err);
    return res.status(err.statusCode || 500).json({
      message : err.message
    });
  }
};


const createUserPost = async (req, res) => {
  try {
    const userId = req.params.userId;
    const {title, content, imageUrl } = req.body;

    if(!userId || !title || !content ){
      return res.status(400).json({ message: 'USER_POSTS_CANT_CREATED'});
    }

    await postService.createPosts(userId, title, content, imageUrl, res);

    return res.status(202).json({
      message: 'SUCCESSFULLY CREATED USER POST'
    });
  } catch(err){
    console.log(err);
    return res.status(err.statusCode || 500).json({
      message : err.message
    });
  }
};

const editUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;
    const { title, content } = req.body;

    if (!userId || !postId || !title || !content) {
      return res.status(422).json({ message: 'USER_POSTS_CANT_UPDATED'});
    }

    const post = await postService.getPostById(postId);
    if (!post || post.user_id !== userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await postService.editUserPosts(userId, postId, title, content, imageUrl, res);

    return res.status(202).json({
      message: 'SUCCESSFULLY UPDATED USER POST'
    });
  } catch(err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({
      message : err.message
    });
  }
};


const deleteUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;

    if (!postId) {
      return res.status(422).json({ message: 'Invalid request' });
    }

    const post = await postService.getPostById(postId);
    if (!post || post.user_id !== userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await postService.deleteUserPosts(postId);

    return res.status(202).json({
      message: 'SUCCESSFULLY DELETED USER POST'
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({
      message: err.message
    });
  }
};


module.exports = {
  getAllPost, getSpecificUserPost, createUserPost, editUserPosts, deleteUserPosts
}