var express = require("express");
var router = express.Router();
const { Validator } = require("./controller/middleware");
const { Select, SelectParameter } = require("./repository/cablingdb");
const {
  InventoryItem,
  RequestEquipmentDetail,
} = require("./model/cablingmodel");
const { GetValue, REQ, APD } = require("./repository/dictionary");
const { JsonDataResponse } = require("./repository/responce");
const { SelectStatement } = require("./repository/customhelper");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "cablingdashboard");
});
module.exports = router;

router.get("/getcurrentstocks", (req, res) => {
  try {
    let sql = `select 
    mip_itemcode as itemdescription,
    ii_stocks as stocks,
    case when mip_itemcode = ii_itemdescription then (mip_price * ii_stocks) end as itemcost
    from master_item_price
    inner join inventory_item on mip_itemcode = ii_itemdescription`;

    Select(sql, (err, result) => {
      if (err) console.error(err);

      if (result != 0) {
        res.json({
          msg: "success",
          data: result,
        });
      } else {
        res.json({
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

router.get("/getactiverequest", (req, res) => {
  try {
    let request = GetValue(REQ());
    let approved = GetValue(APD());
    let sql = `SELECT 
      COUNT(CASE WHEN red_status = ? THEN 1 END) as totalrequest,
      COUNT(CASE WHEN red_status = ? THEN 1 END) as totalreport
      FROM request_equipment_detail`;
    let selectparam = SelectStatement(sql, [request, approved]);

    Select(selectparam, (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 0) {
        let totalrequest = result[0].totalrequest;
        let totalreport = result[0].totalreport;

        let data = {
          totalrequest: totalrequest,
          totalreport: totalreport,
        };
        res.json(JsonDataResponse(data));
      } else {
        res.json(JsonDataResponse(result));
      }
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
