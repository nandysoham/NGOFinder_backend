const express = require('express');
const cors = require("cors")
const env = require('dotenv');    // for .env running

const mongoose = require('mongoose')

const app = express();

const blogentryRoutes = require("./routes/blogentryRoutes")
const blogRecentRoutes = require("./routes/recentblogpostRoutes")
const readIndivBlogRoutes = require("./routes/readindivblog")
const newsLetterRoutes = require("./routes/newsLetter")

const indivuserdetailsRoutes = require("./routes/Individual/getindivdetails")
const indivusercrudRoutes = require("./routes/Individual/useradd")
const indivuserloginRoutes = require("./routes/Individual/userlogin")
const changedetailsindivuserRoutes = require("./routes/Individual/changedetails")
const changepassindivmailRoutes = require("./routes/Individual/updatepassword")
const publicindivdetailsRoutes = require("./routes/Individual/getpublicdetails")

const companyaddRoutes = require("./routes/Company/companyadd")
const changedetailscompanyuserRoutes = require("./routes/Company/changedetails")
const companyuserloginRoutes = require("./routes/Company/userlogin")
const changepasscompanymailRoutes = require("./routes/Company/updatepassword")
const companyUserDetails = require("./routes/Company/getindivdetails");
const companyUserPublicDetails = require("./routes/Company/getPublicDetails")

const showcompanybydistanceRoutes = require("./routes/Company/showcompanies")

const findindivlocationRoutes = require("./routes/findindivLocation")
const findweatherRoutes = require("./routes/fetchweather")



const commentaddRoutes = require("./routes/pushcomments")
const findcommentsRoutes = require("./routes/findcomments")


const uploadingRoutes = require("./routes/uploading")
// env variables are contsant throughout and dotenv package is required for that
env.config();

app.use(cors())
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))


app.use('/static', express.static('uploads'))
app.use('/staticindiv', express.static('Useruploads'))
app.use('/staticcompany', express.static('CompanyUseruploads'))
app.use('/staticerrors', express.static('erroruploads'))

app.use('/api',blogentryRoutes); 
app.use('/api',blogRecentRoutes); 
app.use('/api',readIndivBlogRoutes); 
app.use('/api',newsLetterRoutes); 

app.use("/api", indivuserdetailsRoutes)
app.use("/api",indivusercrudRoutes);
app.use("/api",indivuserloginRoutes);
app.use("/api",changedetailsindivuserRoutes);
app.use("/api",findindivlocationRoutes);
app.use("/api",changepassindivmailRoutes);
app.use("/api",publicindivdetailsRoutes)


app.use("/api",companyaddRoutes);
app.use("/api",changedetailscompanyuserRoutes);
app.use("/api",companyuserloginRoutes);
app.use("/api",changepasscompanymailRoutes)
app.use("/api", companyUserDetails);
app.use("/api", companyUserPublicDetails);


app.use("/api", showcompanybydistanceRoutes)
app.use("/api", findweatherRoutes)


app.use("/api",commentaddRoutes)
app.use("/api",findcommentsRoutes)


app.use("/api", uploadingRoutes)

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
