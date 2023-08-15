//#region SQL Models
class MasterItemModel {
  constructor(itemcode, brand, description, status, createdby, createddate) {
    this.itemcode = itemcode;
    this.brand = brand;
    this.description = description;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class CablingProductModel {
  constructor(productserial, description, status, addedby, addeddate) {
    this.productserial = productserial;
    this.description = description;
    this.status = status;
    this.addedby = addedby;
    this.addeddate = addeddate;
  }
}

class CablingPersonelModel {
  constructor(personel, status, createdby, createddate) {
    this.personel = personel;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class InventoryItemModel {
  constructor(
    itemcode,
    itembrand,
    itemdescription,
    stocks,
    updatestocks,
    updateby,
    updatedate,
    status,
    createdby,
    createddate
  ) {
    this.itemcode = itemcode;
    this.itembrand = itembrand;
    this.itemdescription = itemdescription;
    this.stocks = stocks;
    this.updatestocks = updatestocks;
    this.updateby = updateby;
    this.updatedate = updatedate;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class InventoryLogsModel {
  constructor(type, description, user, date) {
    this.type = type;
    this.description = description;
    this.user = user;
    this.date = date;
  }
}

class ConsumptionReportModel {
  constructor(brand, description, count) {
    this.brand = brand;
    this.description = description;
    this.count = count;
  }
}
//#endregion

//#region Data Models
class RequestMaterialModel {
  constructor(brand, description, count, unit) {
    this.brand = brand;
    this.description = description;
    this.count = count;
    this.unit = unit;
  }
}

class ReportMaterialModel {
  constructor(brand, description, count, unit, dr) {
    this.brand = brand;
    this.description = description;
    this.count = count;
    this.unit = unit;
    this.dr = dr;
  }
}

class ReportMaterialConsumptionModel {
  constructor(
    detailid,
    requestby,
    requestdate,
    brand,
    description,
    quantity,
    unit,
    approvedby,
    approveddate,
    drnumber,
    used,
    usedunits,
    returned,
    returnedunits
  ) {
    this.detailid = detailid;
    this.requestby = requestby;
    this.requestdate = requestdate;
    this.brand = brand;
    this.description = description;
    this.quantity = quantity;
    this.unit = unit;
    this.approvedby = approvedby;
    this.approveddate = approveddate;
    this.drnumber = drnumber;
    this.used = used;
    this.usedunits = usedunits;
    this.returned = returned === null ? "" : returned;
    this.returnedunits = returnedunits === null ? "" : returnedunits;
  }
}

//#endregion

module.exports = {
  MasterItemModel,
  CablingProductModel,
  CablingPersonelModel,
  InventoryItemModel,
  InventoryLogsModel,
  RequestMaterialModel,
  ReportMaterialModel,
  ConsumptionReportModel,
  ReportMaterialConsumptionModel,
};
