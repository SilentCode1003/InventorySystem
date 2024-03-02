var express = require("express");
var router = express.Router();

const {SelectParameter, InsertTable, Select, Update, UpdateMultiple} = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { Validator } = require("./controller/middleware");
const { MasterBrand } = require("./model/cablingmodel");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "brand");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_brand`;

    Select(sql, (err, result) => {
      if (err) console.error("Error: ", err);
      if (result.length != 0) {
        let data = MasterBrand(result);
        console.log(data)

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

router.put("/edit", (req, res) => {
  try {
    let brand = req.body.brand;
    let id = req.body.id;

    let data = [brand, id];

    let sql_Update = `UPDATE master_brand 
                     SET mb_name = ?
                     WHERE mb_id = ?`;

    let sql_check = `SELECT * FROM master_brand WHERE mb_id='${id}'`;

    console.log(data);

    Select(sql_check, (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 1) {
        return res.json({
          msg: "notexist",
        });
      } else {
        UpdateMultiple(sql_Update, data, (err, result) => {
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

router.post("/save", (req, res) => {
  try {
    let name = req.body.brand;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby =
      req.session.fullname == null ? "dev42" : req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let master_brand = [];

    Check_brand(name)
      .then((result) => {
        let data = MasterBrand(result);

        if (data.length != 0) {
          return res.json({
            msg: "exist",
          });
        } else {
          master_brand.push([name, status, createdby, createddate]);
          console.log("data",master_brand)

          InsertTable("master_brand", master_brand, (err, result) => {
            if (err) console.error("Error: ", err);

            console.log(result);
            res.json({
              msg: "success",
            });
          });
        }
      })
      .catch((error) => {
        res.json({
          msg: error,
        });
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

    let sql_Update = `UPDATE master_brand 
                     SET mb_status = ?
                     WHERE mb_id = ?`;

    console.log(data);

    UpdateMultiple(sql_Update, data, (err, result) => {
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

//#region Function

function Check_brand(name) {
  return new Promise((resolve, reject) => {
    console.log("Check_brand", name)
    let sql = "select * from master_brand where mb_name=?";

    SelectParameter(sql, [name], (err, result) => {
      if (err) reject(err);

      console.log(result);
      resolve(result);
    });
  });
}

//#endregion