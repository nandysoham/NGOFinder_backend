const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const companyUser = require("../../models/Company/companyUser")

const JWT_SECRET = "soham$isagoodboy"

//  authenticating the user--> no auth required
// users raw json
router.post('/company/login', [
    body('email').isEmail(),
    body('password', "password cannot be blank").exists(),
], async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success:success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await companyUser.findOne({ email })
        if (!user) {
            return res.status(400).json({success:success, error: " Please enter correct credentials" })
        }

        // comparing the passwords

        const passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare) {
            return res.status(400).json({success:success,error: " Please enter correct credentials" })
        }



        // if everything is fine and the passwords matched
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success,type:"company" ,authtoken,user})


    } catch (error) {
        success = false;
        console.log(error);
        res.status(500).json({success:success,error:"some internal server error occured"})
    }

})

module.exports = router;
