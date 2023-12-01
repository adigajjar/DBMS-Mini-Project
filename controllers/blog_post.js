const mysql = require('mysql2');
const dotenv = require('dotenv');
const sanitizeHtml = require('sanitize-html');

dotenv.config({ path: './.env' });

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.SQL_PASS,
    database: process.env.DATABASE,
});


exports.submit = (req, res) => {
    const { postTitle, category, content } = req.body;

    const insertQuery = 'INSERT INTO blog_post (title, category, content) VALUES (?, ?, ?)';

    const sanitizedContent = sanitizeHtml(content, {
        allowedTags: [],  // Allow no tags (remove all HTML tags)
        allowedAttributes: {},  // Allow no attributes
    });
    const values = [postTitle, category, sanitizedContent];

    db.query(insertQuery, values, (error, result) => {
        if (error) {
            console.error('Error inserting data into MySQL:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        console.log('Data inserted into MySQL:', result);
        res.status(200).json({ message: 'Data inserted successfully' });
    });
};

// exports.addComment = (req, res) => {
//     const { post_id, author_id, content } = req.body;

//     if (!post_id || !author_id || !content) {
//         return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const comment = {
//         post_id,
//         author_id,
//         content,
//     };

//     // Insert the comment into the database
//     const insertQuery = 'INSERT INTO Comments SET ?';

//     db.query(insertQuery, comment, (err, result) => {
//         if (err) {
//             console.error('Error inserting comment into database: ' + err.message);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         // Return the newly created comment
//         const newCommentId = result.insertId;
//         return res.status(201).json({ comment_id: newCommentId });
//     });
// };

exports.addComment = (req, res) => {
    const { content } = req.body;
    const id = 1;
    const user_id = 7;
    console.log(req.user);

    const getPostIdQuery = 'SELECT id FROM blog_post WHERE id = ?';
    const getAuthorIdQuery = 'SELECT user_id FROM user_table WHERE user_id = ?';

    db.query(getPostIdQuery, [id], (errorPostId, resultPostId) => {
        if (errorPostId) {
            console.error('Error fetching post_id:', errorPostId);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const post_id = resultPostId[0].id;
        console.log(post_id);

        db.query(getAuthorIdQuery, [user_id], (errorAuthorId, resultAuthorId) => {
            if (errorAuthorId) {
                console.error('Error fetching author_id:', errorAuthorId);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            const author_id = resultAuthorId[0].user_id;
            console.log(author_id); // Assuming you get a single author_id

            if (!post_id || !author_id || !content) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const comment = {
                post_id,
                author_id,
                content,
            };


            const insertQuery = 'INSERT INTO Comments SET ?';

            db.query(insertQuery, comment, (err, result) => {
                if (err) {
                    console.error('Error inserting comment into database: ' + err.message);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                const newCommentId = result.insertId;
                res.redirect(`/single-page`);
            });
        });
    });
};

exports.addFavorite = (req, res) => {
    const post_id = 1;
    const user_id = 7;
    console.log(req.user); // Assuming you have user information available
  
    if (!post_id || !user_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const favorite = {
      post_id,
      user_id,
    };
  
    const insertQuery = 'INSERT INTO favorites SET ?';
  
    db.query(insertQuery, favorite, (error, result) => {
      if (error) {
        console.error('Error inserting favorite:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (result.affectedRows > 0) {
        res.json({ success: true, message: 'Post added to favorites' });
      } else {
        res.status(500).json({ error: 'Failed to add post to favorites' });
      }
    });
  };