const mongoose = require('mongoose');

const {MONGODB_URL} = process.env;

exports.connect = ()=>{
    mongoose.connect(MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(
        console.log("Database Connected")
    )
    .catch((error)=>{
        console.log(`Error While Connecting to Database`);
        console.log(error);
        process.exit(1);
    })
}

