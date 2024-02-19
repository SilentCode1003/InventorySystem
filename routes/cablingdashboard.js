var express = require("express");
var router = express.Router();
const { Validator } = require("./controller/middleware");
const { Select } = require("./repository/cablingdb");
const { InventoryItem } = require("./model/cablingmodel");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "cablingdashboard");
});
module.exports = router;

router.get("/getcurrentstocks", (req, res) => {
  try {
    let sql = "select * from inventory_item";

    Select(sql, (err, result) => {
      if (err) console.error(err);

      if (result != 0) {
        let data = InventoryItem(result);

        res.json({
          msg: "success",
          data: data,
        });
      } else {
        res.json({
          msg: "success",
          data: result,
        });
      }
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
