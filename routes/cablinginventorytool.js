var express = require("express");
var router = express.Router();
const { Validator } = require("./controller/middleware");

const {SelectParameter, InsertTable, Select, Update, UpdateMultiple} = require("./repository/cablingdb");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { MasterTool } = require("./model/cablingmodel");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "cablinginventorytool");
});


module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select mt_id as id, mb_name as brand, mt_description as description, mt_status as status, 
    mt_createdby as createdby, mt_createddate as createddate  from master_tool
    INNER JOIN master_brand ON mt_brand = mb_id;`;

    Select(sql, (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 0) {
        return res.json({
          msg: "success",
          data: result,
        });
      } else {
        return res.json({
          msg: "nodata",
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

    Check_Name(description)
      .then((result) => {
        let data = MasterTool(result);

        if (data.length != 0) {
          return res.json({
            msg: "exist",
          });
        } else {
          toolinventory.push([brand, description, status, createdby, createddate]);
          InsertTable("master_tool", toolinventory, (err, result) => {
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
    let {brand, description, id} = req.body;
    let data = [];
    // let data = [brand, description, id];
    console.log(data);
    // let sql_Update = `UPDATE master_tool 
    //                  SET mt_brand = ?,
    //                  mt_description = ?
    //                  WHERE mt_id = ?`;

    let sql_update = "UPDATE master_tool set";

    if (brand) {
      sql_update += " mt_brand=?,";
      data.push(brand);
    }
    if (description) {
      sql_update += " mt_description=?,";
      data.push(description);
    }

    sql_update = sql_update.slice(0, -1);
    sql_update += " WHERE mt_id=?";

    data.push(id);

    let sql_check = `SELECT * FROM master_tool WHERE mt_id ='${id}'`;

    Select(sql_check, (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 1) {
        return res.json({
          msg: "notexist",
        });
      } else {
        // console.log(sql_update, data)
        UpdateMultiple(sql_update, data, (err, result) => {
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

function Check_Name(name) {
  return new Promise((resolve, reject) => {
    console.log("Check_brand", name)
    let sql = "select * from master_tool where mt_description=?";

    SelectParameter(sql, [name], (err, result) => {
      if (err) reject(err);

      console.log(result);
      resolve(result);
    });
  });
}

//#endregion