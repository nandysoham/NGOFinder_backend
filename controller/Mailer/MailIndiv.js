// https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
// ALL SMTP DETAILS FOUND HERE
/**
 * Process in details
 *  Prerequisites: need to create a project in google dashboard
 *  1. https://console.cloud.google.com/apis/dashboard?project=dw12345
 *          --> move on enabled API and service | Credentials
 *  2. On right find the client Ids and client secrets
 *  3. Move to https://developers.google.com/oauthplayground/ 
 *  4. right top --> mark use custom apis -> put in client id and secrets
 *  5. select service --> select gmail -> v1 api
 *  6. exchange for refresh tokens
 */

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const env = require('dotenv');
env.config({ path: __dirname + '/./../../.env' });


/**
 * require an object + a json body
 * {
 *  to:"name@gmail.com",
 *  bcc:"bcc@gmail.com",
 *  subject: subject,
 *  html: htmlcode
 *  
 * }
 */
function mailindiv(params) {

    try {
        // preparing the oauth client
        const oauth2Client = new OAuth2(
            process.env.CLIENTID, // ClientID
            process.env.CLIENTSECRET, // Client Secret
            "https://developers.google.com/oauthplayground" // Redirect URL
        );


        // to get a new access token we need to provide the refresh token
        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESHTOKEN
        });
        const accessToken = oauth2Client.getAccessToken()

        const smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                clientId: process.env.CLIENTID,
                clientSecret: process.env.CLIENTSECRET,
                refreshToken: process.env.REFRESHTOKEN,
                accessToken: accessToken
            },
            tls: {
                rejectUnauthorized: false
            }
        });


        const mailOptions = {
            from: "ecoprojectteam123@gmail.com",
            to: params.to,
            subject: params.subject,
            generateTextFromHTML: true,
            html: params.html
        };


        smtpTransport.sendMail(mailOptions, (error, response) => {

            error ? console.log(error) : console.log(response);
            smtpTransport.close();
        });
    }
    catch(error){
        console.log(error);
    }

}

module.exports = mailindiv
// const params = {
//     to: "nandysoham16@gmail.com",
//     bcc: "cs20b046@iittp.ac.in",
//     subject: "random subject",
//     html : "<h1> hello </h1>"
// }

// mailindiv(params);