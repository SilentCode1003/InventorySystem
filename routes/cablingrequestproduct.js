var express = require("express");
var router = express.Router();

const mysql = require("./repository/cablingdb");
const admin = require("./repository/admindb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const {
  RequestMaterialModel,
  ReportMaterialModel,
  ConsumptionReportModel,
} = require("./model/modelclass");
const { Validator } = require("./controller/middleware");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "cablingrequestproduct");

});


module.exports = router;