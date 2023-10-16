var express = require("express");
var router = express.Router();

const mysql = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { MasterItemModel } = require("./model/modelclass");
const { Validator } = require("./repository/middleware");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "cablingitems");
});


module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_item`;

    mysql.Select(sql, "MasterItem", (err, result) => {
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
    let itemdescription = req.body.itemdescription;
    let brandname = req.body.brandname;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let master_item = [];

    let sql_exist = `select * from master_item where mi_brand='${brandname}' and mi_description='${itemdescription}'`;
    mysql.Select(sql_exist, "MasterItem", (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

      if (result.length != 0) {
        return res.json({
          msg: "exist",
        });
      } else {
        let sql_check = `select * from master_brand where mb_brandname='${brandname}'`;
        mysql
          .isDataExist(sql_check, "MasterBrand")
          .then((result) => {
            console.log(result);

            if (result) {
              master_item.push([
                brandname,
                itemdescription,
                status,
                createdby,
                createddate,
              ]);
              mysql.InsertTable("master_item", master_item, (err, result) => {
                if (err) console.error("Error: ", err);

                console.log(result);
                res.json({
                  msg: "success",
                });
              });
            } else {
              let master_brand = [];

              master_brand.push([brandname, status, createdby, createddate]);
              mysql.InsertTable("master_brand", master_brand, (err, result) => {
                if (err) console.error("Error: ", err);
                console.log(result);

                master_item.push([
                  brandname,
                  itemdescription,
                  status,
                  createdby,
                  createddate,
                ]);
                mysql.InsertTable("master_item", master_item, (err, result) => {
                  if (err) console.error("Error: ", err);

                  console.log(result);
                  res.json({
                    msg: "success",
                  });
                });
              });
            }
          })
          .catch((error) => {
            return res.json({ msg: error });
          });
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

    mysql.Select(sql_check, "MasterItem", (err, result) => {
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

router.post("/getitem", (req, res) => {
  try {
    let brand = req.body.brand;
    let cabling_item = [];
    let sql = `select * from master_item where mi_brand='${brand}'`;

    mysql.Select(sql, "MasterItem", (err, result) => {
      if (err) console.error("Error: ", err);
      let clean_no_duplicate = helper.removeDuplicateSets(result);
      let masterItemModel = clean_no_duplicate.map(
        (data) =>
          new MasterItemModel(
            data["itemcode"],
            data["brand"],
            data["description"],
            data["status"],
            data["createdby"],
            data["createddate"]
          )
      );

      masterItemModel.forEach((item, index) => {
        cabling_item.push({
          description: item.description,
          status: item.status,
        });
      });

      console.log(cabling_item);

      res.json({
        data: cabling_item,
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
