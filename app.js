require('dotenv').config() // Adding Config file here
require("./database/database").connect()
const express = require('express');

const app = express(); 
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("<h1>Hola ! Amigos</h1>");
})


app.post("/register", async (req,res)=>{
    try{
        // get all data from body

        // all the data should exists

        // check if user already exists

        // encrpty the password

        // save user in db 

        // generate token for user and send it

    }
    catch(error){
        console.log(error);
    }
})


module.exports = app;