var express = require("express");
var router = express.Router();

const mysql = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("cablingrequesttype", {
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
    let sql = `select * from cabling_request_type`;

    mysql.Select(sql, "CablingRequestType", (err, result) => {
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
    let typename = req.body.typename;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let cabling_request_type = [];

    cabling_request_type.push([typename, status, createdby, createddate]);
    mysql.InsertTable(
      "cabling_request_type",
      cabling_request_type,
      (err, result) => {
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

router.post("/edit", (req, res) => {
  try {
    let typenamemodal = req.body.typenamemodal;
    let typecode = req.body.typecode;

    let data = [typenamemodal, typecode];

    let sql_Update = `UPDATE cabling_request_type 
                     SET crt_typename = ?
                     WHERE crt_typecode = ?`;

    let sql_check = `SELECT * FROM cabling_request_type WHERE crt_typecode='${typecode}'`;

    console.log(data);

    mysql.Select(sql_check, "CablingRequestType", (err, result) => {
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
    let typecode = req.body.typecode;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, typecode];

    let sql_Update = `UPDATE cabling_request_type 
                     SET crt_status = ?
                     WHERE crt_typecode = ?`;

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
