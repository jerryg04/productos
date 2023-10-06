const express = require("express")
var router = express.Router();

/* GET Home Page */
router.get('/', function(req, res, next) {
    res.send('<h1>Home page</h1>');
})

module.exports = router;