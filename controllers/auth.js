const mysql = require('mysql2');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const express = require('express');
const app = express();



dotenv.config({ path: './.env' });

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.SQL_PASS,
  database: process.env.DATABASE
});

// exports.register = (req, res) => {
//   //CHECK EXISTING USER
//   const q = "SELECT * FROM users WHERE email = ? OR username = ?";

//   db.query(q, [req.body.email, req.body.username], (err, data) => {
//     if (err) return res.status(500).json(err);
//     if (data.length) return res.status(409).json("User already exists!");

//     //Hash the password and create a user
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password_, salt);

//     const q = "INSERT INTO users(`username`,`email`,`password_`) VALUES (?)";
//     const values = [req.body.username, req.body.email, hash];

//     db.query(q, [values], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.status(200).json("User has been created.");
//     });
//   });
// };

exports.register = (req, res) => {
  console.log(req.body);
  const { name, email, password, passwordConfirm } = req.body;

  db.query('SELECT user_email FROM user_table WHERE user_email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
    }
    if (results.length > 0) {
      return res.render('register', {
        message: 'That email is already in use'
      })
    } else if (password !== passwordConfirm) {
      return res.render('register', {
        message: 'Passwords do not match'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    db.query("INSERT INTO user_table SET ?", { user_name: name, user_email: email, user_password: hashedPassword }, (error, results) => {
      if (error) {
        console.log(error);
      }
      else {
        console.log(results);
        return res.render('register', {
          message: 'User Registered'
        })
      }
    })

  });
}
// exports.login = (req, res) => {
//   //CHECK USER

//   const q = "SELECT * FROM user_table WHERE user_name = ?";

//   db.query(q, [req.body.name], (err, data) => {
//     if (err) return res.status(500).json(err);
//     if (data.length === 0) return res.status(404).json("User not found!");
//     console.log('Request Body Name:', req.body.name);
//     console.log('Data Password:', data[0].user_password);

//     //Check password
//     const isPasswordCorrect = bcrypt.compareSync(
//       req.body.password,
//       data[0].user_password
//     );

//     if (!isPasswordCorrect)
//       return res.status(400).json("Wrong username or password!");

//     const token = jwt.sign({ id: data[0].id }, "jwtkey");
//     const { password, ...other } = data[0];

//     res
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .json(other);
//   });
// };

exports.login = (req, res) => {
  console.log(req.body);
  const { name, password } = req.body;

  db.query('SELECT * FROM user_table WHERE user_name = ?', [name], async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length === 0 || !(await bcrypt.compare(password, results[0].user_password))) {
      return res.render('sign-in', {
        message: 'Email or password is incorrect',
      });
    } else {
      res.render('single-page');

    }
  });
};
// app.get('/single-page', (req, res) => {
//   // Check if the user is authenticated
//   if (req.session.user) {
//     res.render('single-page', { user: req.session.user });
//   } else {
//     // If not authenticated, redirect to the login page
//     res.redirect('/login');
//   }
// });

exports.update = async (req, res) => {
  console.log(req.body);
  const { oldUsername, newUsername} = req.body;

    db.query('SELECT * FROM user_table WHERE user_name = ?', [oldUsername], async (error, results) => {
      if (error) {
        console.error('Error executing select query:', error);
        return res.status(500).send('Internal Server Error');
      }

      console.log('Results from select query:', results);

      if (results.length === 0) {
        console.error('User not found. Update failed.');
        return res.render('update', {
          message: 'Invalid old username or password. Update failed.'
        });
      }

      db.query('UPDATE user_table SET user_name = ? WHERE user_name = ?', [newUsername, oldUsername], (error, updateResults) => {
        if (error) {
          console.error('Error updating username:', error);
          return res.render('update', {
            message: 'Failed to update username.'
          });
        }
        console.log('Username update results:', updateResults);

        return res.render('update', {
          message: 'Username updated successfully!'
        });
      });
    });
}





// exports.logout = (req, res) => {
//   res.clearCookie("access_token", {
//     sameSite: "none",
//     secure: true
//   }).status(200).json("User has been logged out.")
// };
//