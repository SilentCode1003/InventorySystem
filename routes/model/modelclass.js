class CablingProductModel {
  constructor(productserial, description, status, addedby, addeddate) {
    this.productserial = productserial;
    this.description = description;
    this.status = status;
    this.addedby = addedby;
    this.addeddate = addeddate;
  }
}

module.exports = { CablingProductModel };
