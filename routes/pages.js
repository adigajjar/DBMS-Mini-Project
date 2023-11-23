const express = require('express');
const router = express.Router();

router.get('/', (req,res) =>{
    res.render('index');
})

router.get('/register', (req, res)=>{
    res.render('register');
})

router.get('/about-us', (req, res)=>{
    res.render('about-us');
})

router.get('/sign-in', (req, res)=>{
    res.render('sign-in');
})

router.get('/post-edit',(req,res)=>{
    res.render('post-edit');
})

module.exports = router;