const userService = require('../services/userService');

const signUp = async (req, res) => {
    try {
        const { name, email, password, profileImage} = req.body;

        if (!name || !email || !password || !profileImage) {
            return res.status(400).json({ message: 'KEY_ERROR'});
        }

        await userService.signUp( name, email, password, profileImage );
        return res.status(201).json({
            message: 'SIGNUP_SUCCESS',
        });
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.message
        });
    }
};

// Likes API
const likePosts = async (user_id, postId, res) => {
    try {
      const likePosts = await dataSource.query(
        `INSERT INTO likes(
            user_id,
            post_id
            ) VALUES (
              ?,
              ?
            )
        `,
        [user_id, postId]
      );
  
    res.status(200).json({ message: "Post LIKED ❤️ successfully." });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error has occur in LIKE USER POSTS" });
    }
};


module.exports = {
    signUp
}
