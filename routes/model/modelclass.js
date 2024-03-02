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

class MasterItemUnitModel {
  constructor(itemunitcode, itemcode, unit, status, createdby, createddate) {
    this.itemunitcode = itemunitcode;
    this.itemcode = itemcode;
    this.unit = unit;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class MasterItemPriceModel {
  constructor(
    itempricecode,
    itemcode,
    barcode,
    price,
    status,
    createdby,
    createddate
  ) {
    this.itempricecode = itempricecode;
    this.itemcode = itemcode;
    this.barcode = barcode;
    this.price = price;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class MasterToolModel {
  constructor(id, brand, description, status, createdby, createddate) {
    this.id = id;
    this.brand = brand;
    this.description = description;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class MasterStockModel {
  constructor(
    stockquantitycode,
    itemcode,
    minimum,
    maximum,
    status,
    createdby,
    createddate
  ) {
    this.stockquantitycode = stockquantitycode;
    this.itemcode = itemcode;
    this.minimum = minimum;
    this.maximum = maximum;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class MasterBranchModel {
  constructor(brandcode, brandname, status, createdby, createddate) {
    this.brandcode = brandcode;
    this.brandname = brandname;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class RequestEquipmentDetailModel {
  constructor(
    detailid,
    requestby,
    requestdate,
    detail,
    remarks,
    status,
    approvedby,
    approvedate
  ) {
    this.detailid = detailid;
    this.requestby = requestby;
    this.requestdate = requestdate;
    this.detail = detail;
    this.remarks = remarks;
    this.status = status;
    this.approvedby = approvedby;
    this.approvedate = approvedate;
  }
}

class RequestEquipmentItemModel {
  constructor(
    systemid,
    detailid,
    requestby,
    requestdate,
    itembrand,
    description,
    quantity,
    unit,
    status,
    approvedby,
    approveddate
  ) {
    this.systemid = systemid;
    this.detailid = detailid;
    this.requestby = requestby;
    this.requestdate = requestdate;
    this.itembrand = itembrand;
    this.description = description;
    this.quantity = quantity;
    this.unit = unit;
    this.status = status;
    this.approvedby = approvedby;
    this.approveddate = approveddate;
  }
}

class ReturnEquipmentModel {
  constructor(
    returnid,
    itemcode,
    returnby,
    returndate,
    quantity,
    remark,
    status,
    checkby,
    checkdate
  ) {
    this.returnid = returnid;
    this.itemcode = itemcode;
    this.returnby = returnby;
    this.returndate = returndate;
    this.quantity = quantity;
    this.remark = remark;
    this.status = status;
    this.checkby = checkby;
    this.checkdate = checkdate;
  }
}

class ReturnToolModel {
  constructor(
    returnid,
    itemcode,
    returnby,
    returndate,
    quantity,
    remark,
    status,
    checkby,
    checkdate
  ) {
    this.returnid = returnid;
    this.itemcode = itemcode;
    this.returnby = returnby;
    this.returndate = returndate;
    this.quantity = quantity;
    this.remark = remark;
    this.status = status;
    this.checkby = checkby;
    this.checkdate = checkdate;
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
  constructor(systemid, personel, status, createdby, createddate) {
    this.systemid = systemid;
    this.personel = personel;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class CablingRequestTypeModel {
  constructor(typecode, typename, status, createdby, createddate) {
    this.typecode = typecode;
    this.typename = typename;
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
  constructor(
    reportid,
    detailid,
    brand,
    description,
    quantity,
    unit,
    drnumber,
    personel,
    status,
    createdby,
    createddate
  ) {
    (this.reportid = reportid),
      (this.detailid = detailid),
      (this.brand = brand),
      (this.description = description),
      (this.quantity = quantity),
      (this.unit = unit),
      (this.drnumber = drnumber),
      (this.personel = personel),
      (this.status = status),
      (this.createdby = createdby),
      (this.createddate = createddate);
  }
}

class ReturnMaterialModel {
  constructor(
    returnid,
    detailid,
    brand,
    description,
    quantity,
    unit,
    personel,
    status,
    createdby,
    createddate
  ) {
    (this.returnid = returnid),
      (this.detailid = detailid),
      (this.brand = brand),
      (this.description = description),
      (this.quantity = quantity),
      (this.unit = unit),
      (this.personel = personel),
      (this.status = status),
      (this.createdby = createdby),
      (this.createddate = createddate);
  }
}

class MasterVendorModel {
  constructor(
    vendorid,
    vendorname,
    contactname,
    contactemail,
    contactphone,
    address,
    status,
    createdby,
    createddate
  ) {
    (this.vendorid = vendorid),
      (this.vendorname = vendorname),
      (this.brand = brand),
      (this.contactname = contactname),
      (this.contactemail = contactemail),
      (this.contactphone = contactphone),
      (this.address = address),
      (this.status = status),
      (this.createdby = createdby),
      (this.createddate = createddate);
  }
}

class RepeatRequestModel {
  constructor(id, name, details, status, createdby, createddate) {
    (this.id = id),
      (this.name = name),
      (this.details = details),
      (this.status = status),
      (this.createdby = createdby),
      (this.createddate = createddate);
  }
}

class InventoryToolModel {
  constructor(id, toolid, serialtag, status, createdby, createddate) {
    (this.id = id),
      (this.toolid = toolid),
      (this.serialtag = serialtag),
      (this.status = status),
      (this.createdby = createdby),
      (this.createddate = createddate);
  }
}

class RequestToolDetailModel {
  constructor(
    id,
    requestdate,
    requestby,
    detail,
    remarks,
    status,
    createdby,
    createddate
  ) {
    (this.id = id),
      (this.requestdate = requestdate),
      (this.requestby = requestby),
      (this.detail = detail),
      (this.remarks = remarks),
      (this.status = status),
      (this.createdby = createdby),
      (this.createddate = createddate);
  }
}

class RequestToolItemModel {
  constructor(id, detailid, toolid, serialtag) {
    (this.id = id),
      (this.detailid = detailid),
      (this.toolid = toolid),
      (this.serialtag = serialtag);
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

//#region Admin Models
class MasterUserModel {
  constructor(
    usercode,
    fullname,
    username,
    password,
    accesstype,
    roletype,
    position,
    department,
    status,
    createdby,
    createddate
  ) {
    (this.usercode = usercode),
      (this.fullname = fullname),
      (this.username = username),
      (this.password = password),
      (this.accesstype = accesstype),
      (this.roletype = roletype),
      (this.position = position),
      (this.department = department),
      (this.status = status),
      (this.createdby = createdby),
      (this.createddate = createddate);
  }
}

class MasterAccessTypeModel {
  constructor(accesstypecode, accesstypename, status, createdby, createddate) {
    (this.accesstypecode = accesstypecode),
      (this.accesstypename = accesstypename),
      (this.status = status),
      (this.createdby = createdby),
      (this.createddate = createddate);
  }
}

class MasterRoleTypeModel {
  constructor(roletypecode, roletypename, status, createdby, createddate) {
    (this.roletypecode = roletypecode),
      (this.roletypename = roletypename),
      (this.status = status),
      (this.createdby = createdby),
      (this.createddate = createddate);
  }
}

class MasterPositionModel {
  constructor(positioncode, positionname, status, createdby, createddate) {
    (this.positioncode = positioncode),
      (this.positionname = positionname),
      (this.status = status),
      (this.createdby = createdby),
      (this.createddate = createddate);
  }
}

class MasterDepartmentModel {
  constructor(departmentcode, departmentname, status, createdby, createddate) {
    (this.departmentcode = departmentcode),
      (this.departmentname = departmentname),
      (this.status = status),
      (this.createdby = createdby),
      (this.createddate = createddate);
  }
}

class MasterStoreModel {
  constructor(storecode, storename, status, createdby, createddate) {
    (this.storecode = storecode),
      (this.storename = storename),
      (this.status = status),
      (this.createdby = createdby),
      (this.createddate = createddate);
  }
}


class MasterBrandModel {
  constructor(id, name, status, createdby, createddate) {
    (this.id = id),
      (this.name = name),
      (this.status = status),
      (this.createdby = createdby),
      (this.createddate = createddate);
  }
}

//#endregion
module.exports = {
  MasterBrandModel,
  MasterStoreModel,
  MasterDepartmentModel,
  MasterRoleTypeModel,
  MasterPositionModel,
  MasterItemModel,
  CablingProductModel,
  CablingPersonelModel,
  InventoryItemModel,
  InventoryLogsModel,
  RequestMaterialModel,
  ReportMaterialModel,
  ConsumptionReportModel,
  ReportMaterialConsumptionModel,
  MasterItemUnitModel,
  MasterToolModel,
  MasterStockModel,
  RequestEquipmentDetailModel,
  RequestEquipmentItemModel,
  MasterBranchModel,
  RequestToolDetailModel,
  RequestToolItemModel,
  ReturnEquipmentModel,
  ReturnToolModel,
  CablingRequestTypeModel,
  ReturnMaterialModel,
  MasterVendorModel,
  RepeatRequestModel,
  MasterUserModel,
  MasterAccessTypeModel,
  MasterItemPriceModel,
  InventoryToolModel,
};
