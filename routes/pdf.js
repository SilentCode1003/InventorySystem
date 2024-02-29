var express = require("express");
var router = express.Router();

const mysql = require("./repository/cablingdb");
const dictionary = require("./repository/dictionary");
const { GetCurrentDate} = require("./repository/customhelper");
const { Validator } = require("./controller/middleware");
const { Generate } = require("./repository/pdf");

/* GET home page. */
router.get("/", function (req, res, next) {
    Validator(req, res, "pdf");
});

module.exports = router;

let pdfBuffer = "";
let filename = "";
let date = "";

router.post("/processpdfdata", (req, res) => {
  try {
    let {pdfcontent, template} = req.body;
    let converted = JSON.parse(pdfcontent);
    console.log("Processed Data: ", converted, template);

    if (pdfcontent.length != 0 && pdfcontent != undefined) {
      Generate(converted, template)
      .then((result) => {

        pdfBuffer = result;
        filename = template;
        date = GetCurrentDate();

        res.json({
          msg: "success",
          data: result,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.json({
          msg: error,
        });
      });
    }else{
      res.json({
        msg: "nodata",
      });
    }
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.get("/generatepdf", (req, res) => {
  try {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${filename}_${date}.pdf`
    );

    res.send(pdfBuffer);
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});