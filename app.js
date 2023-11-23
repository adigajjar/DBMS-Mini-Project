const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.SQL_PASS,
    database: process.env.DATABASE  
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended: false}));
app.use(express.json());



db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log('Connected!')
    }
})

app.use('/',require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.listen(3000);