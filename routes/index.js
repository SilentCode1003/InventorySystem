var express = require("express");
var router = express.Router();
const { Validator } = require("./controller/middleware");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "index");
});


module.exports = router;
