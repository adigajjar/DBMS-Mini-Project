// const express = require('express');
// const { register, login, logout } = require('../controllers/auth.js');

// const router = express.Router()

// router.post('/register', register);
// router.post('/login', login);
// router.post('/logout', logout);

// module.exports = router;
const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/register', authController.register);
router.post('/sign-in', authController.login);
module.exports = router;
