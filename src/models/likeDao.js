const { dataSource } = require("./dataSource")

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

