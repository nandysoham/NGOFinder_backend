const express = require('express')
const router = express.Router()

const Blogentry = require("../models/blogentry")

router.route('/blog/:id').get((req, res) => {
    Blogentry.findById(req.params.id)
      .then((blog) => res.json(blog))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  });

module.exports = router;