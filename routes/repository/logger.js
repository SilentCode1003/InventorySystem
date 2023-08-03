const { InventoryItemModel } = require("../model/modelclass");
const mysql = require("./cablingdb");
const helper = require("./customhelper");

class Logger {
  constructor(type, description, user, date) {
    this.type = type;
    this.description = description;
    this.user = user;
    this.date = date;
  }

  ActivityLogs() {
    let inventory_logs = [[this.type, this.description, this.user, this.date]];
    mysql.InsertTable("inventory_logs", inventory_logs, (err, result) => {
      if (err) console.error("Error: ", err);
      console.log(
        `TYPE: ${this.type} DESCRIPTION: ${this.description} USER: ${this.user} DATE: ${this.date} RESULT: ${result}`
      );
    });
  }
}

module.exports = { Logger };
