// https://rapidapi.com/xakageminato/api/ip-geolocation-ipwhois-io
// for getting the api details

var axios = require("axios").default;


exports.findLocation = (req,res)=>{
    var options = {
        method: 'GET',
        url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/',
        headers: {
          'x-rapidapi-host': 'ip-geolocation-ipwhois-io.p.rapidapi.com',
          'x-rapidapi-key': 'ff959680acmsh730e6323ee2ce00p166f0bjsn8e5f06a46910'
        }
      };
      
      try {
        axios.request(options).then(function (response) {
            // console.log(response.data);
            res.status(200).send(response.data)
        }).catch(function (error) {
            console.error(error);
            res.status(500).send("some error in the api")
        });
        
          
      } catch (error) {
          console.log(error);
          res.status(500).send("failed in using locator")
          
      }
      
}