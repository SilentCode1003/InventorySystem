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
