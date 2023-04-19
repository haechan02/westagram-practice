-- migrate:up
CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY (user_id, post_id),
    UNIQUE KEY (post_id, user_id)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id)
);


-- migrate:down
DROP TABLE likes;

