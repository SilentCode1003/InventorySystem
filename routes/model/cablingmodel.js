const {
  MasterItemModel,
  MasterItemUnitModel,
  MasterToolModel,
  RequestEquipmentDetailModel,
  RequestEquipmentItemModel,
  MasterBranchModel,
  RequestToolDetailModel,
  RequestToolItemModel,
  ReturnEquipmentModel,
  ReturnToolModel,
  CablingPersonelModel,
  CablingRequestTypeModel,
  CablingProductModel,
  InventoryItemModel,
  InventoryLogsModel,
  ConsumptionReportModel,
  ReturnMaterialModel,
  RepeatRequestModel,
  MasterItemPriceModel,
  InventoryToolModel,
  MasterBrandModel,
} = require("./modelclass");

exports.MasterItem = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      itemcode: key.mi_itemcode,
      brand: key.mi_brand,
      description: key.mi_description,
      status: key.mi_status,
      createdby: key.mi_createdby,
      createddate: key.mi_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new MasterItemModel(
        key["itemcode"],
        key["brand"],
        key["description"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.MasterItemUnit = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      itemunitcode: key.miu_itemunitcode,
      itemcode: key.miu_itemcode,
      unit: key.miu_unit,
      status: key.miu_status,
      createdby: key.miu_createdby,
      createddate: key.miu_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new MasterItemUnitModel(
        key["itemunitcode"],
        key["itemcode"],
        key["unit"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.MasterItemPrice = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      itempricecode: key.mip_itempricecode,
      itemcode: key.mip_itemcode,
      barcode: key.mip_barcode,
      price: key.mip_price,
      status: key.mip_status,
      createdby: key.mip_createdby,
      createddate: key.mip_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new MasterItemPriceModel(
        key["itempricecode"],
        key["itemcode"],
        key["barcode"],
        key["price"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.MasterTool = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.mt_id,
      brand: key.mt_brand,
      description: key.mt_description,
      status: key.mt_status,
      createdby: key.mt_createdby,
      createddate: key.mt_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new MasterToolModel(
        key["id"],
        key["brand"],
        key["description"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.MasterStock = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      stockquantitycode: key.msxn_stockquantitycode,
      itemcode: key.msxn_itemcode,
      minimum: key.msxn_minimum,
      maximum: key.msxn_maximum,
      status: key.msxn_status,
      createdby: key.msxn_createdby,
      createddate: key.msxn_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new MasterToolModel(
        key["stockquantitycode"],
        key["itemcode"],
        key["minimum"],
        key["maximum"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.RequestEquipmentDetail = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      detailid: key.red_detailid,
      requestby: key.red_requestby,
      requestdate: key.red_requestdate,
      detail: key.red_detail,
      remarks: key.red_remarks,
      status: key.red_status,
      approvedby: key.red_approvedby,
      approvedate: key.red_approvedate,
    });
  });

  return dataResult.map(
    (key) =>
      new RequestEquipmentDetailModel(
        key["detailid"],
        key["requestby"],
        key["requestdate"],
        key["detail"],
        key["remarks"],
        key["status"],
        key["approvedby"],
        key["approvedate"]
      )
  );
};

exports.RequestEquipmentItem = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      systemid: key.rei_systemid,
      detailid: key.rei_detailid,
      requestby: key.rei_requestby,
      requestdate: key.rei_requestdate,
      itembrand: key.rei_itembrand,
      description: key.rei_description,
      quantity: key.rei_quantity,
      unit: key.rei_unit,
      status: key.rei_status,
      approvedby: key.rei_approvedby,
      approveddate: key.rei_approveddate,
    });
  });

  return dataResult.map(
    (key) =>
      new RequestEquipmentItemModel(
        key["systemid"],
        key["detailid"],
        key["requestby"],
        key["requestdate"],
        key["itembrand"],
        key["description"],
        key["quantity"],
        key["unit"],
        key["status"],
        key["approvedby"],
        key["approveddate"]
      )
  );
};

exports.ReturnEquipment = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      returnid: key.re_returnid,
      itemcode: key.re_itemcode,
      returnby: key.re_returnby,
      returndate: key.re_returndate,
      quantity: key.re_quantity,
      remark: key.re_remark,
      status: key.re_status,
      checkby: key.re_checkby,
      checkdate: key.re_checkdate,
    });
  });

  return dataResult.map(
    (key) =>
      new ReturnEquipmentModel(
        key["returnid"],
        key["itemcode"],
        key["returnby"],
        key["returndate"],
        key["quantity"],
        key["remark"],
        key["status"],
        key["checkby"],
        key["checkdate"]
      )
  );
};

exports.ReturnTool = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      returnid: key.rt_returnid,
      toolcode: key.rt_toolcode,
      returnby: key.rt_returnby,
      returndate: key.rt_returndate,
      remark: key.rt_remark,
      status: key.rt_status,
      checkby: key.rt_checkby,
      checkdate: key.rt_checkdate,
    });
  });

  return dataResult.map(
    (key) =>
      new ReturnToolModel(
        key["returnid"],
        key["toolcode"],
        key["returnby"],
        key["returndate"],
        key["remark"],
        key["status"],
        key["checkby"],
        key["checkdate"]
      )
  );
};

exports.CablingPersonel = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      systemid: key.cp_systemid,
      personel: key.cp_personel,
      status: key.cp_status,
      createdby: key.cp_createdby,
      createddate: key.cp_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new CablingPersonelModel(
        key["systemid"],
        key["personel"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.CablingRequestType = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      typecode: key.crt_typecode,
      typename: key.crt_typename,
      status: key.crt_status,
      createdby: key.crt_createdby,
      createddate: key.crt_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new CablingRequestTypeModel(
        key["typecode"],
        key["typename"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.CablingProduct = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      productserial: key.cp_productserial,
      description: key.cp_description,
      status: key.cp_status,
      addedby: key.cp_addedby,
      addeddate: key.cp_addeddate,
    });
  });

  return dataResult.map(
    (key) =>
      new CablingProductModel(
        key["productserial"],
        key["description"],
        key["status"],
        key["addedby"],
        key["addeddate"]
      )
  );
};

exports.InventoryItem = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      itemcode: key.ii_itemcode,
      itembrand: key.ii_itembrand,
      itemdescription: key.ii_itemdescription,
      stocks: key.ii_stocks,
      updatestocks: key.ii_update_stocks,
      updateby: key.ii_updateby,
      updatedate: key.ii_updatedate,
      status: key.ii_status,
      createdby: key.ii_createdby,
      createddate: key.ii_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new InventoryItemModel(
        key["itemcode"],
        key["itembrand"],
        key["itemdescription"],
        key["stocks"],
        key["updatestocks"],
        key["updateby"],
        key["updatedate"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.InventoryLogs = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      logid: key.il_logid,
      type: key.il_type,
      description: key.il_description,
      user: key.il_user,
      date: key.il_date,
    });
  });

  return dataResult.map(
    (key) =>
      new InventoryLogsModel(
        key["logid"],
        key["type"],
        key["description"],
        key["user"],
        key["date"]
      )
  );
};

exports.ConsumptionReport = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      reportid: key.cr_report_id,
      detailid: key.cr_detail_id,
      brand: key.cr_brand,
      description: key.cr_description,
      quantity: key.cr_quantity,
      unit: key.cr_unit,
      drnumber: key.cr_dr_number,
      personel: key.cr_personel,
      status: key.cr_status,
      createdby: key.cr_createdby,
      createddate: key.cr_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new ConsumptionReportModel(
        key["reportid"],
        key["detailid"],
        key["brand"],
        key["description"],
        key["quantity"],
        key["unit"],
        key["drnumber"],
        key["unit"],
        key["personel"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.ReturnMaterial = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      returnid: key.rm_return_id,
      detailid: key.rm_detail_id,
      brand: key.rm_brand,
      description: key.rm_description,
      quantity: key.rm_quantity,
      unit: key.rm_unit,
      personel: key.rm_personel,
      status: key.rm_status,
      createdby: key.rm_createdby,
      createddate: key.rm_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new ReturnMaterialModel(
        key["returnid"],
        key["detailid"],
        key["brand"],
        key["description"],
        key["quantity"],
        key["unit"],
        key["unit"],
        key["personel"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.RepeatRequest = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.rr_id,
      name: key.rr_name,
      details: key.rr_details,
      status: key.rr_status,
      createdby: key.rr_createdby,
      createddate: key.rr_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new RepeatRequestModel(
        key["id"],
        key["name"],
        key["details"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.InventoryTool = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.it_id,
      toolid: key.it_toolid,
      serialtag: key.it_serialtag,
      status: key.it_status,
      createdby: key.it_createdby,
      createddate: key.it_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new InventoryToolModel(
        key["id"],
        key["toolid"],
        key["serialtag"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.RequestToolDetail = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.rtd_id,
      requestdate: key.rtd_requestdate,
      requestby: key.rtd_requestby,
      detail: key.rtd_detail,
      remarks: key.rtd_remarks,
      status: key.rtd_status,
      approvedby: key.rtd_approvedby,
      approveddate: key.rtd_approveddate,
    });
  });

  return dataResult.map(
    (key) =>
      new RequestToolDetailModel(
        key["id"],
        key["requestdate"],
        key["requestby"],
        key["detail"],
        key["remarks"],
        key["status"],
        key["approvedby"],
        key["approveddate"]
      )
  );
};

exports.RequestToolItem = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.rti_id,
      detailid: key.rti_detailid,
      toolid: key.rti_toolid,
      serialtag: key.rti_serialtag,
    });
  });

  return dataResult.map(
    (key) =>
      new RequestToolItemModel(
        key["id"],
        key["detailid"],
        key["toolid"],
        key["serialtag"],
      )
  );
};

exports.MasterBrand = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.mb_id,
      name: key.mb_name,
      status: key.mb_status,
      createdby: key.mb_createdby,
      createddate: key.mb_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new MasterBrandModel(
        key["id"],
        key["name"],
        key["status"],
        key["createdby"],
        key["createddate"],
      )
  );
};