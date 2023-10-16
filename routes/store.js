var express = require("express");
var router = express.Router();

const mysql = require("./repository/admindb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { Validator } = require("./repository/middleware");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "store");
});


module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_store`;

    mysql.Select(sql, "MasterStore", (err, result) => {
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
    let storename = req.body.storename;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let master_store = [];

    master_store.push([storename, status, createdby, createddate]);
    mysql.InsertTable("master_store", master_store, (err, result) => {
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
  //no yet set
  try {
    let positionnamemodal = req.body.positionnamemodal;
    let storecode = req.body.storecode;

    let data = [positionnamemodal, storecode];

    let sql_Update = `UPDATE master_store 
                     SET ms_positionname = ?
                     WHERE ms_storecode = ?`;

    let sql_check = `SELECT * FROM master_store WHERE ms_storecode='${storecode}'`;

    console.log(data);

    mysql.Select(sql_check, "MasterPosition", (err, result) => {
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
    let storecode = req.body.storecode;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, storecode];

    let sql_Update = `UPDATE master_store 
                     SET ms_status = ?
                     WHERE ms_id = ?`;

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
