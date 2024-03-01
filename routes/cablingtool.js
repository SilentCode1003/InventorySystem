var express = require("express");
var router = express.Router();
const { Validator } = require("./controller/middleware");

const mysqlcabling = require("./repository/cablingdb");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { MasterTool } = require("./model/cablingmodel");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "cablingtoollayout");
});


module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_tool`;

    mysqlcabling.Select(sql, (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 0) {
        let data = MasterTool(result);
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
    let brand = req.body.brand;
    let description = req.body.description;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let toolinventory = [];

    toolinventory.push([brand, description, status, createdby, createddate]);
    mysqlcabling.InsertTable("master_tool", toolinventory, (err, result) => {
        if (err) console.error("Error: ", err);

        console.log(result);
        res.json({
          msg: "success",
        });
      }
    );
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.put("/edit", (req, res) => {
  try {
    let {brand, description, id} = req.body;

    let data = [brand, description, id];

    let sql_Update = `UPDATE master_tool 
                     SET mt_brand = ?
                     WHERE mt_description = ?`;

    let sql_check = `SELECT * FROM master_tool WHERE mt_id ='${id}'`;

    mysqlcabling.Select(sql_check, (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 1) {
        return res.json({
          msg: "notexist",
        });
      } else {
        mysqlcabling.UpdateMultiple(sql_Update, data, (err, result) => {
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

router.put("/status", (req, res) => {
  try {
    let id = req.body.id;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, id];

    let sql_Update = `UPDATE master_tool 
                     SET mt_status = ?
                     WHERE mt_id = ?`;

    console.log(data);

    mysqlcabling.UpdateMultiple(sql_Update, data, (err, result) => {
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
