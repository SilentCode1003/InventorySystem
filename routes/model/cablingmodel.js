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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
};

exports.MasterTool = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      toolcode: key.mt_toolcode,
      tag: key.mt_tag,
      serial: key.mt_serial,
      description: key.mt_description,
      status: key.mt_status,
      createdby: key.mt_createdby,
      createddate: key.mt_createddate,
    });
  });

  return dataResult;
};

exports.MasterStock = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      stockquantitycode: key.msxn_stockquantitycode,
      itemcode: key.msxn_itemcode,
      msxn_minimum: key.msxn_minimum,
      msxn_maximum: key.msxn_maximum,
      msxn_status: key.msxn_status,
      createdby: key.msxn_createdby,
      createddate: key.msxn_createddate,
    });
  });

  return dataResult;
};

exports.MasterBrand = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      brandcode: key.mb_brandcode,
      brandname: key.mb_brandname,
      status: key.mb_status,
      createdby: key.mb_createdby,
      createddate: key.mb_createddate,
    });
  });

  return dataResult;
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

  return dataResult;
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

  return dataResult;
};

exports.RequestToolDetail = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      detailid: key.rtd_detailid,
      requestby: key.rtd_requestby,
      requestdate: key.rtd_requestdate,
      detail: key.rtd_detail,
      remarks: key.rtd_remarks,
      status: key.rtd_status,
      approvedby: key.rtd_approvedby,
      approveddate: key.rtd_approveddate,
    });
  });

  return dataResult;
};

exports.RequestToolItem = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      systemid: key.rti_systemid,
      detailid: key.rti_detailid,
      requestby: key.rti_requestby,
      requestdate: key.rti_requestdate,
      description: key.rti_description,
      serialtag: key.rti_serialtag,
      status: key.rti_status,
      approvedby: key.rti_approvedby,
      approveddate: key.rti_approveddate,
    });
  });

  return dataResult;
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

  return dataResult;
};

exports.ReturnEquipment = (data) => {
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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
};

exports.MasterVendor = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      vendorid: key.mv_vendorid,
      vendorname: key.mv_vendorname,
      contactname: key.mv_contactname,
      contactemail: key.mv_contactemail,
      contactphone: key.mv_contactphone,
      address: key.mv_address,
      status: key.mv_status,
      createdby: key.mv_createdby,
      createddate: key.mv_createddate,
    });
  });

  return dataResult;
};

exports.ProductionMaterials = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      productid: key.mpm_productid,
      productname: key.mpm_productname,
      description: key.mpm_description,
      category: key.mpm_category,
      vendorid: key.mpm_vendorid,
      price: key.mpm_price,
      status: key.mpm_status,
      createdby: key.mpm_createdby,
      createddate: key.mpm_createddate,
    });
  });

  return dataResult;
};

exports.ProductionMaterialCount = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      countid: key.pmc_countid,
      productid: key.pmc_productid,
      quantity: key.pmc_quantity,
      unit: key.pmc_unit,
      status: key.pmc_status,
      createdby: key.pmc_createdby,
      createddate: key.pmc_createddate,
    });
  });

  return dataResult;
};

exports.ProductionLogs = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      logid: key.pl_logid,
      description: key.pl_description,
      status: key.pl_status,
      date: key.pl_date,
    });
  });

  return dataResult;
};

exports.ProductComponent = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      componentid: key.pc_componentid,
      productid: key.pc_productid,
      components: key.pc_components,
      status: key.pc_status,
      createdby: key.pc_createdby,
      createddate: key.pc_createddate,
    });
  });

  return dataResult;
};

exports.ProductionProductCost = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      productionid: key.ppc_productionid,
      componentid: key.ppc_componentid,
      productid: key.ppc_productid,
      cost: key.ppc_cost,
      status: key.ppc_status,
      createdby: key.ppc_createdby,
      createddate: key.ppc_createddate,
    });
  });

  return dataResult;
};

exports.DeliveryReport = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.dr_id,
      serial: key.dt_serial,
      number: key.dr_number,
      client: key.dr_client,
      deliverby: key.dr_deliverby,
      date: key.dr_date,
    });
  });

  return dataResult;
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

  return dataResult;
};
