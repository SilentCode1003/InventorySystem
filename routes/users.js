var express = require("express");
var router = express.Router();

const mysql = require("./repository/admindb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { Validator } = require("./repository/middleware");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "users");
});



module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_user`;

    mysql.Select(sql, "MasterUser", (err, result) => {
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
    let fullname = req.body.fullname;
    let username = req.body.username;
    let password = req.body.password;
    let roletype = req.body.roletype;
    let position = req.body.position;
    let accesstype = req.body.accesstype;
    let department = req.body.department;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let master_user = [];

    crypt.Encrypter(password, (err, encrypted) => {
      if (err) console.error("Error: ", err);

      master_user.push([
        fullname,
        username,
        encrypted,
        accesstype,
        roletype,
        position,
        department,
        status,
        createdby,
        createddate,
      ]);

      mysql.InsertTable("master_user", master_user, (err, result) => {
        if (err) console.error("Error: ", err);
        console.log(result);

        res.json({
          msg: "success",
        });
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
