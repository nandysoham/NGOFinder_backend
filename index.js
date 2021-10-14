const express = require('express');
const cors = require("cors")
const env = require('dotenv');    // for .env running

const mongoose = require('mongoose')

const app = express();

const blogentryRoutes = require("./routes/blogentryRoutes")
const blogRecentRoutes = require("./routes/recentblogpostRoutes")
const readIndivBlogRoutes = require("./routes/readindivblog")
const newsLetterRoutes = require("./routes/newsLetter")
const indivusercrudRoutes = require("./routes/Individual/useradd")
const indivuserloginRoutes = require("./routes/Individual/userlogin")
const changedetailsindivuserRoutes = require("./routes/Individual/changedetails")
const changepassindivmailRoutes = require("./routes/Individual/updatepassword")

const findindivlocationRoutes = require("./routes/findindivLocation")
// env variables are contsant throughout and dotenv package is required for that
env.config();

app.use(cors())
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))


app.use('/static', express.static('uploads'))

app.use('/api',blogentryRoutes); 
app.use('/api',blogRecentRoutes); 
app.use('/api',readIndivBlogRoutes); 
app.use('/api',newsLetterRoutes); 
app.use("/api",indivusercrudRoutes);
app.use("/api",indivuserloginRoutes);
app.use("/api",changedetailsindivuserRoutes);
app.use("/api",findindivlocationRoutes);
app.use("/api",changepassindivmailRoutes);



// this can be created from the .env file
// `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ihdlx.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 

mongoose.connect(
    process.env.MONGOURI,
    // 'mongodb://localhost:27017/ecology',
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
