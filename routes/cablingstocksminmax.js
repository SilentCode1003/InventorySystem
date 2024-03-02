var express = require("express");
var router = express.Router();

const {SelectParameter, InsertTable, Select, Update, UpdateMultiple} = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { Validator } = require("./controller/middleware");
const { MasterItem, CablingMinMax } = require("./model/cablingmodel");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "cablingstocksminmax");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select mmm_id as id, mi_description as itemcode, mmm_min as min, mmm_max as max, 
    mmm_status as status, mmm_createdby as createdby, mmm_createddate as createddate 
    FROM master_min_max
    INNER JOIN master_item ON mmm_itemcode = mi_itemcode;`;

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
    let itemcode = req.body.itemcode;
    let min = req.body.min;
    let max = req.body.max;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let minmaxdata = [];
    console.log(itemcode, min, max)

    Check_item(itemcode)
      .then((result) => {
        let data = CablingMinMax(result);

        if (data.length != 0) {
          return res.json({
            msg: "exist",
          });
        } else {
          minmaxdata.push([itemcode, min, max, status, createdby, createddate]);
          console.log(InsertTable)
          InsertTable("master_min_max", minmaxdata, (err, result) => {
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


router.put("/edit", (req, res) => {
  try {
    let min = req.body.min;
    let max = req.body.max;
    let id = req.body.id;

    let data = [min, max, id];

    let sql_Update = `UPDATE master_min_max 
                     SET mmm_min = ?,
                     mmm_max = ?
                     WHERE mmm_id = ?`;

    let sql_check = `SELECT * FROM master_min_max WHERE mmm_id='${id}'`;

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

router.put("/status", (req, res) => {
  try {
    let id = req.body.id;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, id];

    let sql_Update = `UPDATE master_min_max 
                     SET mmm_status = ?
                     WHERE mmm_id = ?`;

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
function Check_item(id) {
  return new Promise((resolve, reject) => {
    console.log("Check_id", id)
    let sql = "select * from master_min_max where mmm_itemcode=?";

    SelectParameter(sql, [id], (err, result) => {
      if (err) reject(err);

      console.log('data' ,result);
      resolve(result);
    });
  });
}

//#endregion
