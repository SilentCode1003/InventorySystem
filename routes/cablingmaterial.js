var express = require("express");
var router = express.Router();

const mysql = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { MasterItemModel, InventoryItemModel } = require("./model/modelclass");
const { Logger } = require("./repository/logger");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("cablingmaterial", {
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
    let sql = `select * from inventory_item`;

    mysql.Select(sql, "InventoryItem", (err, result) => {
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
    let brandname = req.body.brandname;
    let itemcount = req.body.itemcount;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createddate = helper.GetCurrentDatetime();

    let sql_exist = `select * from master_item where mi_brand='${brandname}' and mi_description='${description}'`;
    mysql.Select(sql_exist, "MasterItem", (err, result) => {
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

      let sql_check = `select * from inventory_item where ii_itembrand='${brandname}' and ii_itemdescription='${description}'`;
      mysql.Select(sql_check, "InventoryItem", (err, result) => {
        if (err) console.error("Error: ", err);

        console.log(result);
        let inventoryItem = helper.ConvertToJson(result);
        let inventoryItemModel = inventoryItem.map(
          (data) =>
            new InventoryItemModel(
              data["itemcode"],
              data["itembrand"],
              data["itemdescription"],
              data["stocks"],
              data["updatestocks"],
              data["updateby"],
              data["updatedate"],
              data["status"],
              data["createdby"],
              data["createddate"]
            )
        );

        if (result.length != 0) {
          //update existing data
          let inventory_item = [];
          inventoryItemModel.forEach((item, index) => {
            let total = parseFloat(item.stocks) + parseFloat(itemcount);
            inventory_item = [
              total,
              itemcount,
              createdby,
              createddate,
              item.itemcode,
            ];
          });

          let update_inventory_item = `update inventory_item set ii_stocks=?, ii_update_stocks=?, ii_updateby=?, ii_updatedate=? where ii_itemcode=?`;
          mysql.UpdateMultiple(
            update_inventory_item,
            inventory_item,
            (err, result) => {
              if (err) console.error("Error: ", err);

              console.log(result);

              const logger = new Logger(
                "Update",
                `${brandname} ${description} ${itemcount}`,
                req.session.fullname,
                helper.GetCurrentDatetime()
              );

              logger.ActivityLogs();

              return res.json({
                msg: "update",
              });
            }
          );
        } else {
          let inventory_item = [];
          masterItemModel.forEach((key, index) => {
            inventory_item.push([
              key.itemcode,
              key.brand,
              key.description,
              itemcount,
              "",
              "",
              "",
              status,
              createdby,
              createddate,
            ]);
          });

          mysql.InsertTable("inventory_item", inventory_item, (err, result) => {
            if (err) console.error("Error: ", err);

            console.log(result);

            const logger = new Logger(
              "Added",
              `${brandname} ${description} ${itemcount}`,
              req.session.fullname,
              helper.GetCurrentDatetime()
            );

            logger.ActivityLogs();

            return res.json({
              msg: "success",
            });
          });
        }
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/edit", (req, res) => {
  //no yet set
  try {
    let itemdescriptionmodal = req.body.itemdescriptionmodal;
    let brandlistmodal = req.body.brandlistmodal;
    let itemcode = req.body.itemcode;

    let data = [brandlistmodal, itemdescriptionmodal, itemcode];

    let sql_Update = `UPDATE inventory_item 
                     SET mi_brand = ?,
                     mi_description = ?
                     WHERE mi_itemcode = ?`;

    let sql_check = `SELECT * FROM inventory_item WHERE mi_itemcode='${itemcode}'`;

    console.log(data);

    mysql.Select(sql_check, "InventoryItem", (err, result) => {
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
    const logger = new Logger(
      "Update",
      `${itemcode} ${status}`,
      req.session.fullname,
      helper.GetCurrentDatetime()
    );

    let sql_Update = `UPDATE inventory_item 
                     SET ii_status = ?
                     WHERE ii_itemcode = ?`;

    console.log(data);

    mysql.UpdateMultiple(sql_Update, data, (err, result) => {
      if (err) console.error("Error: ", err);

      logger.ActivityLogs();

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
