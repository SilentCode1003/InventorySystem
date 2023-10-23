var express = require("express");
var router = express.Router();
const xl = require("excel4node");

const mysql = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { ReportMaterialConsumptionModel } = require("./model/modelclass");
const { Validator } = require("./repository/middleware");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "reportmaterials");
});

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

router.post("/search", (req, res) => {
  try {
    const { startdate, enddate } = req.body;
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
    where rei_requestdate between '${startdate} 00:00' and '${enddate} 23:59'
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
    res.json({});
  }
});

let _excelDataArr = [];
let _excelFile = "";
router.post("/excel", (req, res) => {
  try {
    let data = req.body.data;
    let filename = `${req.body.filename}_${helper.GetCurrentDate()}`;
    let dataArr = [];

    console.log(`Request Received: ${filename}`);
    console.log(`Data Received: ${data}`);

    dataArr = JSON.parse(data);
    console.log(`Data JSON Parse: ${dataArr}`);

    _excelDataArr = dataArr;
    _excelFile = filename;
    res.json({
      msg: "success",
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.get("/generate-excel", (req, res) => {
  // res.download(_excelFile);
  const workbook = new xl.Workbook();
  const worksheet = workbook.addWorksheet(`${_excelFile}`);
  var row = 1;
  var col = 1;

  var headerStyle = workbook.createStyle({
    font: {
      bold: true,
      underline: false,
    },
    alignment: {
      wrapText: true,
      horizontal: "center",
    },
  });

  var dataStyle = workbook.createStyle({
    font: {
      bold: false,
      underline: false,
    },
    alignment: {
      wrapText: true,
      horizontal: "center",
    },
  });

  // console.log(_excelDataArr);
  console.log(`data length: ${_excelDataArr}`);

  for (x = 0; x < _excelDataArr.length; x++) {
    // console.log(`header content length: ${_excelDataArr[x].length}`);

    for (z = 0; z < _excelDataArr[x].length; z++) {
      // console.log(`row: ${row} col ${col} data: ${_excelDataArr[x][z]}`);
      let data = `${_excelDataArr[x][z]}`;
      data = data.split(",");
      for (i = 0; i < data.length; i++) {
        if (row == 1) {
          worksheet.cell(row, col).string(data[i]).style(headerStyle);
        } else {
          worksheet.cell(row, col).string(data[i]).style(dataStyle);
        }

        col += 1;
      }
    }

    col = 1;
    row += 1;
  }
  workbook.write(`${_excelFile}.xlsx`, res);
});
