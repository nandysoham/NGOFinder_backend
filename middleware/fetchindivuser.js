const jwt = require('jsonwebtoken');

const JWT_SECRET = "soham$isagoodboy"

const fetchUser = (req,res,next)=>{
    // get the suer from the jwt token

    const token = req.header("auth-token")
    if(!token){
        res.status(401).json({error:" please authenticate first"})
    }
    // console.log(req.files)
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user
        next()
        
    } catch (error) {
        res.status(401).json({error:"wrong token or some error occured"})
    }
    

    
}

module.exports = fetchUser;