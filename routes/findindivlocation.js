const express = require("express")
const { findLocation } = require("../middleware/Locator/findLocation")
const router = express.Router()

  
router.get('/findlocation',function(request, response) {
  
    var idAddress = request.connection.remoteAddress;
    response.send(idAddress)
  
});

// router.get("/indiv/location",findLocation);
module.exports = router