const { dataSource } = require("./dataSource")


const getAllPosts = async (res) => {
    try {
        const rows = await dataSource.query(
            `SELECT 
                posts.id,
                users.name AS Author,
                posts.title,
                posts.content,
                posts.image_url,
                posts.created_at
                FROM posts 
                INNER JOIN users ON users.id = posts.user_id
                `
        );
        res.status(200).json(rows);
    } catch (err){
        console.log(err);
        res.status(500).json({ message: "Error occurred in getting posts", error: err.message });
    }
};

const getSpecificUserPost = async (userId) => {
  try {
    const gettingUserPosts = await dataSource.query(
      `SELECT 
        users.id,
        users.name AS Author,
        posts.title,
        posts.content,
        posts.image_url,
        posts.created_at
        FROM posts 
        INNER JOIN users ON users.id = posts.user_id
        WHERE users.id = ?
        `,
      [userId]
    );

    return gettingUserPosts;
  } catch (error) {
    console.log(error);
    throw new Error("Error has occurred in getting users posts");
  }
};

const createPosts = async (userId, title, content, imageUrl) => {
  try {
    const [user] = await dataSource.query(
      `SELECT id FROM users WHERE id = ?`,
      [userId]
    );

    if (user) {
      const user_id = user.id;

      await dataSource.query(
        `INSERT INTO posts(
          user_id,
          title,
          content,
          image_url
        ) VALUES (
          ?,
          ?,
          ?,
          ?
        )`,
        [user_id, title, content, imageUrl]
      );

      return { message: "🎉 post has been created successfully 🎉 " };
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error occurred in CREATING POSTS: " + err.message);
  }
};


const editUserPosts = async (userId, postId, title, content, imageUrl) => {
    try {
      const updatePosts = await dataSource.query(
        `UPDATE posts
          INNER JOIN users ON posts.user_id = users.id
          SET
          posts.title = ?,
          posts.content = ?,
          posts.image_url = ?
          WHERE users.id = ? AND posts.id = ?
          `,
        [title, content, imageUrl, userId, postId]
      );
  
      res.status(200).json({ message: "Post updated successfully." });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error has occur in USER EDITING API" });
    }
};

const deleteUserPosts = async (userId, postId) => {
  try {
    const deletePosts = await dataSource.query(
      `DELETE FROM posts
       WHERE posts.id = ? 
      `,
      [userId, postId]
    );

    res.status(200).json({ message: "Post DELETED successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error has occurred in DELETING USER POSTS" });
  }
};


module.exports = {
  getAllPosts, getSpecificUserPost, createPosts, editUserPosts, deleteUserPosts
}