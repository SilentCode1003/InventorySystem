var express = require("express");
var router = express.Router();

const mysql = require("./repository/cablingdb");
const crypt = require("./repository/cryptography");
const dictionary = require("./repository/dictionary");
const helper = require("./repository/customhelper");
const { CablingProductModel } = require("./model/modelclass");

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

router.post("/excelsave", (req, res) => {
  try {
    let data = req.body.data;
    let status = dictionary.GetValue(dictionary.WH());
    let addedby = req.session.fullname;
    let addeddate = helper.GetCurrentDatetime();
    let cabling_product = [];
    let count = 0;
    let dup_data = "";
    let isDuplicate = false;

    data = JSON.parse(data);
    let data_length = data.length;

    data.forEach((key, item) => {
      var serial = key.serial;
      var description = key.description;
      var sql_check = `select * from cabling_product where cp_productserial='${serial}'`;
      mysql.isSingleDataExist(
        sql_check,
        "CablingProduct",
        (err, isduplicate) => {
          if (err) console.error("Error: ", err);

          if (isduplicate) {
            isDuplicate = isduplicate;
            dup_data += `${description} [${serial}]`;
          } else {
            cabling_product.push([
              serial,
              description,
              status,
              addedby,
              addeddate,
            ]);
          }

          count += 1;
          if (data_length == count) {
            // console.log(cabling_product);
            let clean_no_duplicate =
              helper.removeDuplicateSets(cabling_product);
            let cablingProductMdel = clean_no_duplicate.map(
              (data) =>
                new CablingProductModel(
                  data[0],
                  data[1],
                  data[2],
                  data[3],
                  data[4]
                )
            );
            let refine_cabling_product = [];

            cablingProductMdel.forEach((product, index) => {
              refine_cabling_product.push([
                product.productserial,
                product.description,
                product.status,
                product.addedby,
                product.addeddate,
              ]);
            });

            if (isDuplicate) {
              return res.json({
                msg: "exist",
                data: dup_data,
              });
            }

            mysql.InsertTable(
              "cabling_product",
              refine_cabling_product,
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

// router.get("/test", (req, res) => {
//   let jsonData = [
//     {
//       productserial: 1000,
//       description: "MRBU",
//       status: "ACTIVE",
//       addedby: "CREATOR",
//       addeddate: "2023-07-20 09:56",
//     },
//     {
//       productserial: 1000,
//       description: "NCR",
//       status: "ACTIVE",
//       addedby: "CREATOR",
//       addeddate: "2023-07-20 09:56",
//     },
//     {
//       productserial: 1000,
//       description: "SLBU",
//       status: "ACTIVE",
//       addedby: "CREATOR",
//       addeddate: "2023-07-20 09:56",
//     },
//   ];
//   let duplicate = helper.removeDuplicateSets(jsonData);
//   let data = duplicate.map(
//     (data) =>
//       new CablingProductModel(
//         data["productserial"],
//         data["description"],
//         data["status"],
//         data["addedby"],
//         data["addeddate"]
//       )
//   );

//   let dataArr = [];
//   data.forEach((product, index) => {
//     dataArr.push([
//       product.productserial,
//       product.description,
//       product.status,
//       product.addedby,
//       product.addeddate,
//     ]);
//   });

//   console.log(dataArr);

//   res.json({
//     msg: "success",
//     data: dataArr,
//   });
// });
