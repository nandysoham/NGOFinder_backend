const express = require('express')
const { findLocation } = require('../../middleware/Locator/findLocation')
const router = express.Router()

const companyUser = require('../../models/Company/companyUser')

router.post("/company/showcompanies/bydistance",findLocation ,async (req,res)=>{
    const {client_lat, client_long} = req
    // console.log(req);
    // console.log(client_lat, client_long);
    const measuredist=(comp_lat,comp_long, client_lat, client_long)=>{
        dist = (comp_lat-client_lat)*(comp_lat-client_lat) + (comp_long-client_long)*(comp_long-client_long);
        return dist
    }

    try {
        let companiesarr = await companyUser.find({}).select("-password")
        let distarr = companiesarr.sort(function(x,y){
            if(measuredist(parseFloat(x.lattitude),parseFloat(x.longitude),client_lat, client_long) > measuredist(parseFloat(y.lattitude),parseFloat(y.longitude),client_lat, client_long)) return 1;
            else return -1;
        })
        res.status(200).json(distarr)
    } catch (error) {
        console.log(error)
        res.status(500).send("some internal server error occured")
        
    }

})


module.exports = router

/*
{
    "client_lat" : 23.2324,
    "client_long" : 87.8615
}

*/