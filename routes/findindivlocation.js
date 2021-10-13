const express = require("express")
const { findLocation } = require("../controller/Locator/findLocation")
const router = express.Router()

router.get("/indiv/location",findLocation);
module.exports = router