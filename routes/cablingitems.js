var express = require("express");
var router = express.Router();

const {SelectParameter, InsertTable, Select, Update, UpdateMultiple} = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { Validator } = require("./controller/middleware");
const { MasterItem } = require("./model/cablingmodel");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "cablingitems");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `SELECT mi_itemcode as itemcode, mb_name as brand, mi_description as description, 
              mi_status as status, mi_createdby as createdby, mi_createddate as createddate
              from master_item
              INNER JOIN master_brand ON mi_brand = mb_id;`;

    Select(sql, (err, result) => {
      if (err) console.error("Error: ", err);
      if (result.length != 0) {
        return res.json({
          msg: "success",
          data: result,
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
    let masteritem = [];

    Check_Name(description)
      .then((result) => {
        let data = MasterItem(result);

        if (data.length != 0) {
          return res.json({
            msg: "exist",
          });
        } else {
          masteritem.push([brand, description, status, createdby, createddate]);
          InsertTable("master_item", masteritem, (err, result) => {
            if (err) console.error("Error: ", err);

            console.log(result);
            res.json({
              msg: "success",
            });
          }
          );
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


router.post("/edit", (req, res) => {
  try {
    let itemdescriptionmodal = req.body.itemdescriptionmodal;
    let brandlistmodal = req.body.brandlistmodal;
    let itemcode = req.body.itemcode;

    let data = [brandlistmodal, itemdescriptionmodal, itemcode];

    let sql_Update = `UPDATE master_item 
                     SET mi_brand = ?,
                     mi_description = ?
                     WHERE mi_itemcode = ?`;

    let sql_check = `SELECT * FROM master_item WHERE mi_itemcode='${itemcode}'`;

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

router.post("/status", (req, res) => {
  try {
    let itemcode = req.body.itemcode;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, itemcode];

    let sql_Update = `UPDATE master_item 
                     SET mi_status = ?
                     WHERE mi_itemcode = ?`;

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

router.post("/getitem", (req, res) => {
  try {
    let brand = req.body.brand;
    let cabling_item = [];
    let sql = `select * from master_item where mi_brand='${brand}'`;

    Select(sql, (err, result) => {
      if (err) console.error("Error: ", err);
      if (result != 0) {
        let data = MasterItem(result);
        data.forEach((item) => {
          cabling_item.push({
            description: item.description,
            status: item.status,
          });
        });

        console.log(cabling_item);

        res.json({
          msg: "success",
          data: cabling_item,
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

//#region Function
function Check_Name(name) {
  return new Promise((resolve, reject) => {
    // console.log("Check_brand", name)
    let sql = "select * from master_item where mi_description=?";

    SelectParameter(sql, [name], (err, result) => {
      if (err) reject(err);

      // console.log(result);
      resolve(result);
    });
  });
}

//#endregion
