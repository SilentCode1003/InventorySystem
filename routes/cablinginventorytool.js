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
    let sql = `select it_id as id, mt_description as toolid, it_serialtag as serialtag, it_status as status, 
    it_createdby as createdby, it_createddate as createddate  from inventory_tool
    INNER JOIN master_tool ON it_toolid = mt_id;`;

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


router.get("/getlist", (req, res) => {
  try {
    let sql = `select * from master_tool;`;

    Select(sql, (err, result) => {
      if (err) console.error("Error: ", err);
      let data = MasterTool(result)
      console.log(data);
      if (result.length != 0) {
        return res.json({
          msg: "success",
          data: data,
        });
      } else {
        return res.json({
          msg: "success",
          data: data,
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
    let toolid = req.body.toolid;
    let serialtag = req.body.serialtag;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let toolinventory = [];

    Check_Serial(serialtag)
      .then((result) => {
        let data = MasterTool(result);

        if (data.length != 0) {
          return res.json({
            msg: "exist",
          });
        } else {
          toolinventory.push([toolid, serialtag, status, createdby, createddate]);
          InsertTable("inventory_tool", toolinventory, (err, result) => {
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
    let {toolid, serialtag, id} = req.body;
    let data = [];
    // let data = [brand, description, id];
    console.log(data);
    // let sql_Update = `UPDATE master_tool 
    //                  SET mt_brand = ?,
    //                  mt_description = ?
    //                  WHERE mt_id = ?`;

    let sql_update = "UPDATE inventory_tool set";

    if (toolid) {
      sql_update += " it_toolid=?,";
      data.push(toolid);
    }
    if (serialtag) {
      sql_update += " it_serialtag=?,";
      data.push(serialtag);
    }

    sql_update = sql_update.slice(0, -1);
    sql_update += " WHERE it_id=?";

    data.push(id);

    let sql_check = `SELECT * FROM inventory_tool WHERE it_id ='${id}'`;

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
      req.body.status == dictionary.GetValue(dictionary.INACT())
      ? dictionary.GetValue(dictionary.ACT())
      : dictionary.GetValue(dictionary.INACT());
    let data = [status, id];

    let sql_Update = `UPDATE inventory_tool 
                     SET it_status = ?
                     WHERE it_id = ?`;

    console.log(sql_Update, data);

    UpdateMultiple(sql_Update, data, (err, result) => {
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

//#region Function

function Check_Serial(serial) {
  return new Promise((resolve, reject) => {
    // console.log("Check Serial", serial)
    let sql = "select * from inventory_tool where it_serialtag=?";

    SelectParameter(sql, [serial], (err, result) => {
      if (err) reject(err);

      console.log(result);
      resolve(result);
    });
  });
}

//#endregion