var express = require("express");
var router = express.Router();

const mysql = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { Validator } = require("./controller/middleware");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "cablingitemunits");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_item_unit`;

    mysql.Select(sql, "MasterItemUnit", (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

      res.json({
        msg: "success",
        data: result,
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/save", (req, res) => {
  try {
    let unitdescription = req.body.unitdescription;
    let itemname = req.body.itemname;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = "DEV42";
    let createddate = helper.GetCurrentDatetime();
    let master_item_unit = [];

    let sql_exist = `select * from master_item_unit where miu_itemcode='${itemname}' and miu_unit='${unitdescription}'`;
    mysql.Select(sql_exist, "MasterItemUnit", (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

      if (result.length != 0) {
        return res.json({
          msg: "exist",
        });
      } else {
        master_item_unit.push([
          itemname,
          unitdescription,
          status,
          createdby,
          createddate,
        ]);
        mysql.InsertTable(
          "master_item_unit",
          master_item_unit,
          (err, result) => {
            if (err) console.error("Error: ", err);

            console.log(result);
            res.json({
              msg: "success",
            });
          }
        );
      }
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/edit", (req, res) => {
  try {
    let unitdescriptionmodal = req.body.unitdescriptionmodal;
    let itemlistmodal = req.body.itemlistmodal;
    let itemunitcode = req.body.itemunitcode;

    let data = [itemlistmodal, unitdescriptionmodal, itemunitcode];

    let sql_Update = `UPDATE master_item_unit 
                     SET miu_itemcode = ?,
                     miu_unit = ?
                     WHERE miu_itemunitcode = ?`;

    let sql_check = `SELECT * FROM master_item_unit WHERE miu_itemunitcode='${itemunitcode}'`;

    console.log(data);

    mysql.Select(sql_check, "MasterItemUnit", (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 1) {
        return res.json({
          msg: "notexist",
        });
      } else {
        mysql.UpdateMultiple(sql_Update, data, (err, result) => {
          if (err) console.error("Error: ", err);

          console.log(result);

          res.json({
            msg: "success",
          });
        });
      }
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/status", (req, res) => {
  try {
    let itemunitcode = req.body.itemunitcode;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, itemunitcode];

    let sql_Update = `UPDATE master_item_unit 
                     SET miu_status = ?
                     WHERE miu_itemunitcode = ?`;

    console.log(data);

    mysql.UpdateMultiple(sql_Update, data, (err, result) => {
      if (err) console.error("Error: ", err);

      res.json({
        msg: "success",
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
