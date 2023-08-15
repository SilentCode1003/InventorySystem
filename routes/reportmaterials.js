var express = require("express");
var router = express.Router();

const mysql = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { ReportMaterialConsumptionModel } = require("./model/modelclass");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("reportmaterials", {
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
    let firstday = helper.GetCurrentMonthFirstDay();
    let lastday = helper.GetCurrentMonthLastDay();
    let datefrom = `${firstday} 00:00`;
    let dateto = `${lastday} 23:59`;

    let sql = `select
    rei_detailid as detailid,
    rei_requestby as requestby,
    rei_requestdate as requestdate,
    rei_itembrand as brand,
    rei_description as description,
    rei_quantity as quantity,
    rei_unit as unit,
    rei_approvedby as approvedby,
    rei_approveddate as approveddate,
    cr_dr_number as drnumber,
    cr_quantity as used,
    cr_unit as usedunits,
    rm_quantity as returned,
    rm_unit as returnedunits
    from request_equipment_item
    left join consumption_report on rei_detailid = cr_detail_id and rei_itembrand = cr_brand and rei_description = cr_description
    left join return_material on rei_detailid = rm_detail_id  and rei_itembrand = rm_brand and rei_description = rm_description
    where rei_requestdate between '${datefrom}' and '${dateto}'
    order by rei_requestdate`;

    console.log(sql);

    mysql.SelectResult(sql, (err, result) => {
      if (err) console.error("Error: ", err);

      let data = [];
      let reportModel = helper.ConvertToJson(result);
      let report = reportModel.map(
        (data) =>
          new ReportMaterialConsumptionModel(
            data["detailid"],
            data["requestby"],
            data["requestdate"],
            data["brand"],
            data["description"],
            data["quantity"],
            data["unit"],
            data["approvedby"],
            data["approveddate"],
            data["drnumber"],
            data["used"],
            data["usedunits"],
            data["returned"],
            data["returnedunits"]
          )
      );

      report.forEach((item, index) => {
        data.push({
          detailid: item.detailid,
          requestby: item.requestby,
          requestdate: item.requestdate,
          brand: item.brand,
          description: item.description,
          quantity: `${item.quantity} ${item.unit}`,
          approvedby: item.approvedby,
          approveddate: item.approveddate,
          drnumber: item.drnumber,
          used: `${item.used} ${item.usedunits}`,
          returned: `${item.returned} ${item.returnedunits}`,
        });
      });

      console.log(data);
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
