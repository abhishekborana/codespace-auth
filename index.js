const app = require('./app');

// extracting PORT variable from config file, in this case PORT is coming from github repo secret keys
const {PORT} = process.env;

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});