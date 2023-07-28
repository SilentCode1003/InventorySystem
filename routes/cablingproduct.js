var express = require("express");
var router = express.Router();

const mysql = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");

/* GET home page. */
router.get("/", isAuthAdminUser, function (req, res, next) {
  res.render("cablingproduct", {
    title: req.session.title,
    fullname: req.session.fullname,
    roletype: req.session.roletype,
    position: req.session.position,
    department: req.session.department,
  });
});

function isAuthAdminUser(req, res, next) {
  console.log(req.session.roletype);

  if (req.session.roletype == "Admin" || req.session.roletype == "User") {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = "select * from cabling_product";
    mysql.Select(sql, "CablingProduct", (err, result) => {
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
    let description = req.body.description;
    let serial = req.body.serial;
    let status = dictionary.GetValue(dictionary.WH());
    let addedby = req.session.fullname;
    let addeddate = helper.GetCurrentDatetime();
    let cabling_product = [];
    cabling_product.push([serial, description, status, addedby, addeddate]);

    let sql_check = `select * from cabling_product where cp_productserial='${serial}'`;

    mysql
      .isDataExist(sql_check, "CablingProduct")
      .then((isduplicate) => {
        if (isduplicate) {
          return res.json({
            msg: "exist",
          });
        } else {
          mysql.InsertTable(
            "cabling_product",
            cabling_product,
            (err, result) => {
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
