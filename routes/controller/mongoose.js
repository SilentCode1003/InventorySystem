const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBSession = require("connect-mongodb-session")(session);

const mysql = require("../repository/admindb");

exports.SetMongo = (app) => {
  //mongodb
  mongoose.connect("mongodb://localhost:27017/Inventory").then((res) => {
    console.log("MongoDB Connected!");
  });

  const store = new MongoDBSession({
    uri: "mongodb://localhost:27017/Inventory",
    collection: "InventorySession",
  });

  //Session
  app.use(
    session({
      secret: "5L Secret Key",
      resave: false,
      saveUninitialized: false,
      store: store,
    })
  );

  //Check SQL Connection
  mysql.CheckConnection();
};
