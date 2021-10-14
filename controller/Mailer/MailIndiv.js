const nodemailer = require('nodemailer');


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
function mailindiv(params){
    try{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEWSLETTER_EMAIL,
                pass: process.env.NEWSLETTER_PASS
            }
        });

        var mailOptions = {
            from: 'ecoprojectteam123@gmail.com',
            to:params.to,
            bcc: params.bcc ? params.bcc : "",
            subject: params.subject,
            html : params.html
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = mailindiv