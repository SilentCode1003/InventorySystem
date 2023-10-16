var express = require("express");
var router = express.Router();

const mysql = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { Validator } = require("./repository/middleware");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "cablingitemprice");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_item_price`;

    mysql.Select(sql, "MasterItemPrice", (err, result) => {
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
    let itemprice = req.body.itemprice;
    let barcode = req.body.barcode;
    let description = req.body.description;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let master_item_price = [];

    master_item_price.push([
      description,
      barcode,
      itemprice,
      status,
      createdby,
      createddate,
    ]);

    console.log(master_item_price);
    mysql.InsertTable("master_item_price", master_item_price, (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);
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

router.post("/edit", (req, res) => {
  try {
    let itempricemodal = req.body.itempricemodal;
    let itempricecode = req.body.itempricecode;

    let data = [itempricemodal, itempricecode];

    let sql_Update = `UPDATE master_item_price 
                     SET mip_price= ?
                     WHERE mip_itempricecode = ?`;

    let sql_check = `SELECT * FROM master_item_price WHERE mip_itempricecode='${itempricecode}'`;

    console.log(data);

    mysql.Select(sql_check, "MasterItemPrice", (err, result) => {
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
    let itemcode = req.body.itemcode;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, itemcode];

    let sql_Update = `UPDATE master_item_price 
                     SET mip_status = ?
                     WHERE mip_itempricecode= ?`;

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
