const { DataSource } = require("typeorm");

const dataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});


dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.log("DataSource Not Initialize :", err);
        myDataSource.destroy();
    });

// Creating Users Posts
const createPosts = async (userEmail, title, content, imageUrl, res) => {
    try {
        const [user] = await dataSource.query(
            `
              SELECT id FROM users WHERE email = ?
              `,
            [userEmail]
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
                    )
                `,
                [user_id, title, content, imageUrl]
            );

            res.status(201).json({ message: "🎉 post has been created successfully 🎉 " });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error occurred in CREATING POSTS", error: err.message });
    }
};

// Editing User's Posts API
const editUserPosts = async (userId, postId, title, content, imageUrl, res) => {
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

// Deleting User's Posts API
const deletingUserPosts = async (postsId, res) => {
    try {
      const deletePosts = await dataSource.query(
        `DELETE FROM posts
          WHERE posts.id = ${postsId}
          `
      );
  
      res.status(200).json({ message: "Post DELETED successfully." });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error has occur in DELETING USER POSTS" });
    }
};




module.exports = {
    createPosts, editUserPosts, deletingUserPosts
}