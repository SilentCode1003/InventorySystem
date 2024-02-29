var express = require("express");
var router = express.Router();

const mysql = require("./repository/admindb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { Validator } = require("./controller/middleware");
const { MasterRoleType } = require("./model/adminmodel");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "roletype");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_role_type`;

    mysql.Select(sql, (err, result) => {
      if (err) console.error("Error: ", err);
      if (result.length != 0) {
        let data = MasterRoleType(result);
        return res.json({
          msg: "success",
          data: data,
        });
      } else {
        return res.json({
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

router.post("/save", (req, res) => {
  try {
    let roletypename = req.body.roletypename;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let master_role_type = [];

    master_role_type.push([roletypename, status, createdby, createddate]);
    mysql.InsertTable("master_role_type", master_role_type, (err, result) => {
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
    let roletypenamemodal = req.body.roletypenamemodal;
    let roletypecode = req.body.roletypecode;

    let data = [roletypenamemodal, roletypecode];

    let sql_Update = `UPDATE master_role_type 
                     SET mrt_roletypename = ?
                     WHERE mrt_roletypecode = ?`;

    let sql_check = `SELECT * FROM master_role_type WHERE mrt_roletypecode='${roletypecode}'`;

    console.log(data);
    console.log(sql_Update);
    console.log(sql_check);

    mysql.Select(sql_check, (err, result) => {
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
    let roletypecode = req.body.roletypecode;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, roletypecode];

    let sql_Update = `UPDATE master_role_type 
                     SET mrt_status = ?
                     WHERE mrt_roletypecode = ?`;

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
