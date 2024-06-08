// https://app.abstractapi.com/api/ip-geolocation/tester


var axios = require("axios").default;


exports.findLocation = (req,res,next)=>{
    var options = {
        method: 'GET',
        url: `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEOAPI}`,
      };
      
      try {
        axios.request(options).then(function (response) {
            // console.log(response.data);
            // res.status(200).send(response.data)
            req.client_lat = response.data.latitude;
            req.client_long = response.data.longitude;
            req.client_city = response.data.city;
            // console.log(response);
            // console.log(req.client_lat," , ", req.client_long);
            if(req.client_lat && req.client_long){
                next();
            }
            else{
                res.send("showing null in lattitude and longitude")
            }
        }).catch(function (error) {
            console.error(error);
            res.status(500).send("some error in the api")
        });
        
          
      } catch (error) {
          console.log(error);
          res.status(500).send("failed in using locator")
          
      }
      
}