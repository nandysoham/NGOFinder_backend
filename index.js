const express = require('express');
const env = require('dotenv');    // for .env running

const mongoose = require('mongoose')

const app = express();

const blogentryRoutes = require("./routes/blogentryRoutes")
const blogRecentRoutes = require("./routes/recentblogpostRoutes")


// env variables are contsant throughout and dotenv package is required for that
env.config();

app.use(express.json())


app.use('/api',blogentryRoutes); 
app.use('/api',blogRecentRoutes); 


// this can be created from the .env file
// `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ihdlx.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 

mongoose.connect(
    'mongodb://localhost:27017/ecology',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(()=>{
        console.log("Database connected");
    })
    .catch(err => {
        console.log(err);
        console.log("sorry database cannot be connected ...");
    });


app.listen(process.env.PORT, ()=>{
    console.log(`the server is running on port ${process.env.PORT}`);
})
