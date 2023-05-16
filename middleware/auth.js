const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    // grab token from cookie
    const token = req.cookies.token;

    // if no token, stop there
    if(!token){
        res.status(403).send("Invalid token");
    }

    // decode token and get id 
    try{
        const decode = jwt.verify(token,'auth-service'); 
        req.user=decode;
    }
    catch(error){
        console.log("Error While Decoding Token");
        res.status(401).send("Invalid token");
    }

    return next();
}

module.exports=auth;