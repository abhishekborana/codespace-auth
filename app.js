require('dotenv').config() // Adding Config file here
require("./database/database").connect()
const User  = require("./models/user");
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('./models/user');
const cookieParser = require('cookie-parser');

const app = express(); 
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("<h1>Hola ! Amigos</h1>");
})


app.post("/register", async (req,res)=>{
    try{
        // get all data from body
        const {firstName,lastName,email,password} = req.body

         // all the data should exists
        if(!(firstName && lastName && email && password)){
            res.status(400).send('Missing Parameters');
        }


        // check if user already exists
        const isUserExists = await User.findOne({email});
        if(isUserExists){
            res.status(401).send('User Already Exist With Given Email');
        }

        // encrpty the password
        const encryptPass = await bcrypt.hash(password,10);

        // save user in db 
        const user = await User.create({
            firstname:firstName,
            lastname:lastName,
            email:email,
            password:encryptPass
        })

        // generate token for user and send it
        const token =jwt.sign(
            {id:user._id,email:email},  //payload
            'auth-service',
            {expiresIn:"2h"}
        );
        user.token=token;
        user.password=undefined;
        
        res.status(200).json(user)

    }
    catch(error){
        console.log(error);
    }
})


app.post("/login",async (req,res)=>{
    try{
        // get all data from frontend
        const {email,passoword}=req.body;

        // validation
        if(!(email && password)){
            res.status(400).send("Missing Fields");
        }

        // find user in db
        const userDetails = await User.findOne({email});

        // match password 
        if(userDetails && (bcrypt.compare(passoword,userDetails.password))){

            const token = jwt.sign(
                {id:user._id,email:email},
                'auth-service',
                {expiresIn:"2h"}
            )
            userDetails.token = token;
            userDetails.password= undefined;

            // cookie
            const options = {
                expires:new Date(Date.now() + 1*24*60*60*1000),
                httpOnly:true
            };
            res.status(200).cookie("token",token,options).json({
                success:true,
                token,
                user:userDetails
            })
            
        }

        res.status(401).send("Invalid Credentials");
    }
    catch(error){
        console.log(error);
    }
})

module.exports = app;