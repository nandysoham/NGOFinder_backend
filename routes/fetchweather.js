const express = require("express")
const { findLocation } = require("../middleware/Locator/findLocation2")
const router = express.Router()

const axios = require("axios")

router.get("/getweather",findLocation,async (req,res)=>{
    const {client_lat, client_long,client_city} = req
    console.log(client_lat,client_city,client_long)
    const key = ""

    var options = {
        method: 'GET',
        // url: `http://api.weatherapi.com/v1/current.json?key=${key} &q=${client_lat},${client_long}&aqi=yes`,
        url: `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI} &q=${client_city}&aqi=yes`,
       
      };

      try {
        axios.request(options).then(function (response) {
            res.status(200).json(response.data)
        }).catch(function (error) {
            console.error(error);
            res.status(500).send("some error in the api")
        });
        
          
      } catch (error) {
          console.log(error);
          res.status(500).send("failed in fetching weather")
          
      }




})

module.exports = router