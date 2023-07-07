var express = require("express");
var router = express.Router();

const mysql = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("cablingrequestmaterial", {
    title: req.session.title,
    fullname: req.session.fullname,
    roletype: req.session.roletype,
    position: req.session.position,
    department: req.session.department,
  });
});

function isAuthAdminUser(req, res, next) {
  if (req.session.roletype == "Admin" || req.session.roletype == "User") {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from request_equipment_detail`;

    mysql.Select(sql, "RequestEquipmentDetail", (err, result) => {
      if (err) console.error("Error: ", err);
      let data = [];

      result.forEach((key, item) => {
        let detail = JSON.parse(key.detail);
        var subdetail = "";
        detail.forEach((subkey, subitem) => {
          subdetail += `[${subkey.brand} ${subkey.description}] ${subkey.count} ${subkey.unit} </br>`;
        });

        data.push({
          detailid: key.detailid,
          requestby: key.requestby,
          requestdate: key.requestdate,
          detail: subdetail,
          remarks: key.remarks,
          status: key.status,
          approvedby: key.approvedby,
          approvedate: key.approvedate,
        });
      });

      console.log(result);

      res.json({
        msg: "success",
        data: data,
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
    let requestby = req.body.requestby;
    let requestdate = req.body.requestdate;
    let details = req.body.details;
    let type = req.body.type;
    let store = req.body.store;
    let status = dictionary.GetValue(dictionary.REQ());
    let request_equipment_detail = [];
    let remarks = `${store} - ${type}`;

    let sql_exist = `select * from request_equipment_detail 
        where red_requestby='${requestby}' 
        and red_requestdate='${requestdate}' 
        and red_detail='${details}'`;

    mysql.Select(sql_exist, "RequestEquipmentDetail", (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

      if (result.length != 0) {
        return res.json({
          msg: "duplicate",
        });
      } else {
        request_equipment_detail.push([
          requestby,
          requestdate,
          details,
          remarks,
          status,
        ]);

        console.log(request_equipment_detail);
        mysql.InsertTable(
          "request_equipment_detail",
          request_equipment_detail,
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

    let sql_Update = `UPDATE request_equipment_detail 
                     SET red_itemcode = ?,
                     red_unit = ?
                     WHERE red_itemunitcode = ?`;

    let sql_check = `SELECT * FROM request_equipment_detail WHERE red_itemunitcode='${itemunitcode}'`;

    console.log(data);

    mysql.Select(sql_check, "RequestEquipmentDetail", (err, result) => {
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

    let sql_Update = `UPDATE request_equipment_detail 
                     SET red_status = ?
                     WHERE red_itemunitcode = ?`;

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

router.post("/add", (req, res) => {
  try {
    let description = req.body.description;
    let sql = `select mi_brand as brand,
    mi_description as description,
    miu_unit as unit
    from master_item as mi
    inner join master_item_unit as red on mi_description = miu_itemcode
    where mi_description = '${description}'`;

    mysql.SelectResult(sql, (err, result) => {
      if (err) console.error(err);

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
