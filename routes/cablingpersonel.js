var express = require("express");
var router = express.Router();

const mysql = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { CablingPersonelModel } = require("./model/modelclass");
const { Validator } = require("./controller/middleware");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "cablingpersonel");

});


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
    let createdby = req.session.fullname;
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

router.post("/excelsave", (req, res) => {
  try {
    let data = req.body.data;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let cabling_personel = [];
    let count = 0;
    let dup_data = "";
    let isDuplicate = false;

    data = JSON.parse(data);
    let data_length = data.length;

    data.forEach((key, item) => {
      var personel = key.personel;
      var sql_check = `select * from cabling_personel where cp_personel='${personel}'`;
      mysql.isSingleDataExist(
        sql_check,
        "CablingPersonel",
        (err, isduplicate) => {
          if (err) console.error("Error: ", err);

          if (isduplicate) {
            isDuplicate = isduplicate;
            dup_data += `${personel}]`;
          } else {
            cabling_personel.push([personel, status, createdby, createddate]);
          }

          count += 1;
          if (data_length == count) {
            // console.log(cabling_personel);
            let clean_no_duplicate =
              helper.removeDuplicateSets(cabling_personel);
            let cablingPersonelModel = clean_no_duplicate.map(
              (data) =>
                new CablingPersonelModel(data[0], data[1], data[2], data[3])
            );
            let refine_cabling_personel = [];

            cablingPersonelModel.forEach((personel, index) => {
              refine_cabling_personel.push([
                personel.personel,
                personel.status,
                personel.createdby,
                personel.createddate,
              ]);
            });

            if (isDuplicate) {
              return res.json({
                msg: "exist",
                data: dup_data,
              });
            }

            mysql.InsertTable(
              "cabling_personel",
              refine_cabling_personel,
              (err, result) => {
                if (err) console.error("Error: ", err);

                console.log(result);
                return res.json({
                  msg: "success",
                });
              }
            );
          }
        }
      );
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
