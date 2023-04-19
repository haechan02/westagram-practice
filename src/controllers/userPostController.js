// // Getting Users Posts (ALL)
// const getUserPosts = async (res) => {
//     try {
//         const rows = await dataSource.query(
//             `SELECT 
//                 posts.id,
//                 users.name AS Author,
//                 posts.title,
//                 posts.content,
//                 posts.image_url,
//                 posts.created_at
//                 FROM posts 
//                 INNER JOIN users ON users.id = posts.user_id
//                 `
//         );
//         res.status(200).json(rows);
//     } catch (err){
//         console.log(err);
//         res.status(500).json({ message: "Error occurred in getting posts", error: err.message });
//     }
// };

// Getting Specified User's Posts
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
    throw new Error("Some error");
  }
};

module.exports = {
  getSpecificUserPost
}