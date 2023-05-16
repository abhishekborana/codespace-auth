require('dotenv').config() // Adding Config file here
const express = require('express');

const app = express(); 

app.get("/",(req,res)=>{
    res.send("<h1>Hola ! Amigos</h1>");
})

module.exports = app;