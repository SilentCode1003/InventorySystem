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

module.exports = {
  MasterItemModel,
  CablingProductModel,
  CablingPersonelModel,
  InventoryItemModel,
  InventoryLogsModel,
};
