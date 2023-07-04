var express = require("express");
var router = express.Router();

const mysql = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("cablingpersonel", {
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
    let sql = `select * from cabling_personel`;

    mysql.Select(sql, "CablingPersonel", (err, result) => {
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
    let personelname = req.body.personelname;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = "DEV42";
    let createddate = helper.GetCurrentDatetime();
    let cabling_personel = [];

    cabling_personel.push([personelname, status, createdby, createddate]);
    mysql.InsertTable("cabling_personel", cabling_personel, (err, result) => {
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
    let personelnamemodal = req.body.personelnamemodal;
    let systemid = req.body.systemid;

    let data = [personelnamemodal, systemid];

    let sql_Update = `UPDATE cabling_personel 
                     SET cp_personel = ?
                     WHERE cp_systemid = ?`;

    let sql_check = `SELECT * FROM cabling_personel WHERE cp_systemid='${systemid}'`;

    console.log(data);

    mysql.Select(sql_check, "CablingPersonel", (err, result) => {
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
    let systemid = req.body.systemid;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, systemid];

    let sql_Update = `UPDATE cabling_personel 
                     SET cp_status = ?
                     WHERE cp_systemid = ?`;

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
