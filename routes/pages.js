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
router.get('/single-page',(req,res)=>{
    res.render('single-page');
})
router.get('/search',(req,res)=>{
    res.render('search');
})

router.get('/update',(req,res)=>{
    res.render('update');
})
module.exports = router;