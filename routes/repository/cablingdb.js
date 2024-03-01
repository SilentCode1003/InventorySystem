const mysql = require("mysql");
const model = require("../model/cablingmodel");
require("dotenv").config();
const crypt = require("./cryptography");
const { SubtractDayTime } = require("./customhelper");

let password = "";
crypt.Decrypter(process.env._PASSWORD_CABLING, (err, result) => {
  if (err) throw err;

  password = result;
  console.log(`${result}`);
});

const connection = mysql.createConnection({
  host: process.env._HOST_CABLING,
  user: process.env._USER_CABLING,
  password: password,
  database: process.env._DATABASE_CABLING,
});

// crypt.Encrypter("#Ebedaf19dd0d", (err, result) => {
//   if (err) console.error("Error: ", err);

//   console.log(result);
// });

crypt.Decrypter("77c43406c8cbd4597eb4844da432c70f", (err, result) => {
  if (err) console.error("Error: ", err);

  console.log(`${result}`);
});

SubtractDayTime("2018-05-15", "2023-11-20");

exports.CheckConnection = () => {
  connection.connect((err) => {
    if (err) {
      console.error("Error connection to MYSQL databases: ", err);
      return;
    }
    console.log("MySQL database connection established successfully!");
  });
};

exports.InsertMultiple = async (stmt, todos) => {
  try {
    connection.connect((err) => {
      return err;
    });
    // console.log(`statement: ${stmt} data: ${todos}`);

    connection.query(stmt, [todos], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row inserted: ${results.affectedRows}`);

      return 1;
    });
  } catch (error) {
    console.log(error);
  }
};

exports.Select = (sql, callback) => {
  try {
    connection.connect((err) => {
      return err;
    });
    connection.query(sql, (error, results, fields) => {
      // console.log(results);

      if (error) {
        callback(error, null);
      }

      callback(null, results);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.SelectParameter = (sql, condition, callback) => {
  connection.query(sql, [condition], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    // console.log(results);

    callback(null, results);
  });
};

exports.StoredProcedure = (sql, data, callback) => {
  try {
    connection.query(sql, data, (error, results, fields) => {
      if (error) {
        callback(error.message, null);
      }
      callback(null, results[0]);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.StoredProcedureResult = (sql, callback) => {
  try {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        callback(error.message, null);
      }
      callback(null, results[0]);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.Update = async (sql, callback) => {
  try {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        callback(error, null);
      }
      // console.log('Rows affected:', results.affectedRows);

      callback(null, `Rows affected: ${results.affectedRows}`);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.UpdateMultiple = async (sql, data, callback) => {
  try {
    connection.query(sql, data, (error, results, fields) => {
      if (error) {
        callback(error, null);
      }
      // console.log('Rows affected:', results.affectedRows);

      callback(null, `Rows affected: ${results.affectedRows}`);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.CloseConnect = () => {
  connection.end();
};

exports.Insert = (stmt, todos, callback) => {
  try {
    connection.connect((err) => {
      return err;
    });
    // console.log(`statement: ${stmt} data: ${todos}`);

    connection.query(stmt, [todos], (err, results, fields) => {
      if (err) {
        callback(err, null);
      }
      // callback(null, `Row inserted: ${results}`);
      let data = [
        {
          rows: results.affectedRows,
          id: results.insertId,
        },
      ];
      callback(null, data);
      // console.log(`Row inserted: ${results.affectedRows}`);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.SelectResult = (sql, callback) => {
  try {
    connection.connect((err) => {
      return err;
    });
    connection.query(sql, (error, results, fields) => {
      // console.log(results);

      if (error) {
        callback(error, null);
      }

      callback(null, results);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.InsertTable = (tablename, data, callback) => {
  if (tablename == "master_item") {
    let sql = `INSERT INTO master_item(
        mi_brand,
        mi_description,
        mi_status,
        mi_createdby,
        mi_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_item_unit") {
    let sql = `INSERT INTO master_item_unit(
        miu_itemcode,
        miu_unit,
        miu_status,
        miu_createdby,
        miu_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_item_price") {
    let sql = `INSERT INTO master_item_price(
        mip_itemcode,
        mip_barcode,
        mip_price,
        mip_status,
        mip_createdby,
        mip_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }
  
  if (tablename == "master_tool") {
    let sql = `INSERT INTO master_tool(
        mt_brand,
        mt_description,
        mt_status,
        mt_createdby,
        mt_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_stock_max_min") {
    let sql = `INSERT INTO master_stock_max_min(
        msxn_itemcode,
        msxn_minimum,
        msxn_maximum,
        msxn_status,
        msxn_createdby,
        msxn_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_brand") {
    let sql = `INSERT INTO master_brand(
        mb_name,
        mb_status,
        mb_createdby,
        mb_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "cabling_personel") {
    let sql = `INSERT INTO cabling_personel(
        cp_personel,
        cp_status,
        cp_createdby,
        cp_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "cabling_request_type") {
    let sql = `INSERT INTO cabling_request_type(
        crt_typename,
        crt_status,
        crt_createdby,
        crt_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "request_equipment_detail") {
    let sql = `INSERT INTO request_equipment_detail(
        red_requestby,
        red_requestdate,
        red_detail,
        red_remarks,
        red_status) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "request_equipment_item") {
    let sql = `INSERT INTO request_equipment_item(
        rei_detailid,
        rei_requestby,
        rei_requestdate,
        rei_itembrand,
        rei_description,
        rei_quantity,
        rei_unit,
        rei_status,
        rei_approvedby,
        rei_approveddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "cabling_product") {
    let sql = `INSERT INTO cabling_product(
      cp_productserial,
      cp_description,
      cp_status,
      cp_addedby,
      cp_addeddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "inventory_item") {
    let sql = `INSERT INTO inventory_item(
          ii_itemcode,
          ii_itembrand,
          ii_itemdescription,
          ii_stocks,
          ii_update_stocks,
          ii_updateby,
          ii_updatedate,
          ii_status,
          ii_createdby,
          ii_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "inventory_logs") {
    let sql = `INSERT INTO inventory_logs(
          il_type,
          il_description,
          il_user,
          il_date) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "consumption_report") {
    let sql = `INSERT INTO consumption_report(
          cr_detail_id,
          cr_brand,
          cr_description,
          cr_quantity,
          cr_unit,
          cr_dr_number,
          cr_personel,
          cr_status,
          cr_createdby,
          cr_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "return_material") {
    let sql = `INSERT INTO return_material(
          rm_detail_id,
          rm_brand,
          rm_description,
          rm_quantity,
          rm_unit,
          rm_personel,
          rm_status,
          rm_createdby,
          rm_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_vendor") {
    let sql = `INSERT INTO master_vendor(
      mv_vendorname,
      mv_contactname,
      mv_contactemail,
      mv_contactphone,
      mv_address,
      mv_status,
      mv_createdby,
      mv_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "production_materials") {
    let sql = `INSERT INTO production_materials(
      mpm_productname,
      mpm_description,
      mpm_category,
      mpm_vendorid,
      mpm_price,
      mpm_status,
      mpm_createdby,
      mpm_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "production_material_count") {
    let sql = `INSERT INTO production_material_count(
      pmc_productid,
      pmc_quantity,
      pmc_unit,
      pmc_status,
      pmc_createdby,
      pmc_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "production_logs") {
    let sql = `INSERT INTO production_logs(
        pl_description,
        pl_status,
        pl_date) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "product_component") {
    let sql = `INSERT INTO product_component(
      pc_productid,
      pc_components,
      pc_status,  
      pc_createdby,
      pc_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "production_product_cost") {
    let sql = `INSERT INTO production_product_cost(
      ppc_componentid,
      ppc_productid,
      ppc_cost,
      ppc_status,
      ppc_createdby,
      ppc_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "delivery_report") {
    let sql = `INSERT INTO delivery_report(
      dt_serial,
      dr_number,
      dr_client,
      dr_deliverby,
      dr_date) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "repeat_request") {
    let sql = `INSERT INTO repeat_request(
      rr_name,
      rr_details,
      rr_status,
      rr_createdby,
      rr_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "inventory_tool") {
    let sql = `INSERT INTO inventory_tool(
      it_toolid,
      it_serialtag,
      it_status,
      it_createdby,
      it_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }
};

exports.isDataExist = (sql, tablename) => {
  return new Promise((resolve, reject) => {
    this.Select(sql, (err, result) => {
      if (err) reject(err);

      console.log(result);

      if (result.length != 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

exports.isSingleDataExist = (sql, callback) => {
  this.Select(sql, (err, result) => {
    if (err) callback(err, null);

    if (result.length != 0) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
};
