var express = require("express");
var router = express.Router();

const mysql = require("./repository/cablingdb");
const admin = require("./repository/admindb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { RequestMaterialModel } = require("./model/modelclass");

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
    let master_store_status = dictionary.GetValue(dictionary.ACT());
    let request_equipment_detail = [];
    let remarks = `${store} - ${type}`;
    let createdby = req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let master_store = [];
    let cabling_request_type = [];
    let request_equipment_item = [];
    let sql_exist = `select * from request_equipment_detail 
        where red_requestby='${requestby}' 
        and red_requestdate='${requestdate}' 
        and red_detail='${details}'`;

    let jsonDetails = helper.ConvertToJson(JSON.parse(details));
    let requestEquipmentItemModel = jsonDetails.map(
      (data) =>
        new RequestMaterialModel(
          data["brand"],
          data["description"],
          data["count"],
          data["unit"]
        )
    );

    //#region STORE
    let check_master_store = `select * from master_store where ms_storename='${store}'`;
    admin.Select(check_master_store, "MasterStore", (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 0) {
      } else {
        master_store.push([store, master_store_status, createdby, createddate]);

        admin.InsertTable("master_store", master_store, (err, result) => {
          if (err) console.error("Error: ", err);

          console.log(`${result}`);
        });
      }
    });
    //#endregion

    //#region TYPE
    let check_cabling_request_type = `select * from cabling_request_type where crt_typename='${type}'`;
    mysql.Select(
      check_cabling_request_type,
      "CablingRequestType",
      (err, result) => {
        if (err) console.error("Error: ", err);

        if (result.length != 0) {
        } else {
          cabling_request_type.push([
            type,
            master_store_status,
            createdby,
            createddate,
          ]);

          mysql.InsertTable(
            "cabling_request_type",
            cabling_request_type,
            (err, result) => {
              if (err) console.error("Error: ", err);

              console.log(`${result}`);
            }
          );
        }
      }
    );
    //#endregion

    //#region REQUEST
    mysql.Select(sql_exist, "RequestEquipmentDetail", (err, result) => {
      if (err) console.error("Error: ", err);

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
            let requestid = result[0].id;

            requestEquipmentItemModel.forEach((item, index) => {
              request_equipment_item.push([
                requestid,
                requestby,
                requestdate,
                item.brand,
                item.description,
                item.count,
                item.unit,
                status,
                "",
                "",
              ]);
            });

            console.log(request_equipment_item);
            mysql.InsertTable(
              "request_equipment_item",
              request_equipment_item,
              (err, result) => {
                if (err) console.error("Error: ", err);
                console.log(result);

                res.json({
                  msg: "success",
                });
              }
            );
          }
        );
      }
    });
    //#endregion
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
    let quantity = req.body.quantity;
    let sql = `select mi_brand as brand,
        mi_description as description,
        miu_unit as unit,
        ifnull(ii_stocks, 0) as stocks
        from master_item as mi
        inner join master_item_unit as red on mi_description = miu_itemcode
        left join inventory_item as ii on mi_description = ii_itemdescription
        where mi_description = '${description}'`;

    mysql.SelectResult(sql, (err, result) => {
      if (err) console.error(err);

      let jsonData = helper.ConvertToJson(result);
      let requestMaterialModel = jsonData.map(
        (data) =>
          new RequestMaterialModel(
            data["brand"],
            data["description"],
            data["stocks"],
            data["unit"]
          )
      );

      console.log(requestMaterialModel);

      requestMaterialModel.forEach((item, index) => {
        let current_count = isNaN(parseFloat(item.count))
          ? 0
          : parseFloat(item.count);
        let request_count = parseFloat(quantity);

        console.log(`${current_count} ${request_count}`);

        if (current_count < request_count) {
          return res.json({
            msg: "insufficient",
            data: requestMaterialModel,
          });
        } else {
          console.log(result);

          return res.json({
            msg: "success",
            data: result,
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

router.post("/approve", (req, res) => {
  try {
    let detailid = req.body.detailid;
    let status = dictionary.GetValue(dictionary.APD());
    let approvedby = req.session.fullname;
    let approvedate = helper.GetCurrentDatetime();
    let update_request_equipment_detail = `update request_equipment_detail 
            set red_status='${status}',
            red_approvedby='${approvedby}',
            red_approvedate='${approvedate}' 
            where red_detailid='${detailid}'`;
    let update_request_equipment_item = `update request_equipment_item 
          set rei_status='${status}',
          rei_approvedby='${approvedby}',
          rei_approveddate='${approvedate}' 
          where rei_detailid='${detailid}'`;

    mysql.Update(update_request_equipment_detail, (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);
    });

    mysql.Update(update_request_equipment_item, (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);
    });

    res.json({
      msg: "success",
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/getrequestdetail", (req, res) => {
  try {
    let detailid = req.body.detailid;
    let sql = `select  * from request_equipment_item where rei_detailid='${detailid}'`;

    mysql.Select(sql, "RequestEquipmentItem", (err, result) => {
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
