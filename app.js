var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const mongodb = require("./routes/controller/mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var departmentRouter = require("./routes/department");
var positionRouter = require("./routes/position");
var accesstypeRouter = require("./routes/accesstype");
var roletypeRouter = require("./routes/roletype");
var cablingdashboardRouter = require("./routes/cablingdashboard");
var cablingitemsRouter = require("./routes/cablingitems");
var brandRouter = require("./routes/brand");
var cablingitemunitsRouter = require("./routes/cablingitemunits");
var cablingrequestmaterialRouter = require("./routes/cablingrequestmaterial");
var cablingpersonelRouter = require("./routes/cablingpersonel");
var cablingrequesttypeRouter = require("./routes/cablingrequesttype");
var storeRouter = require("./routes/store");
var cablingproductRouter = require("./routes/cablingproduct");
var cablingmaterialRouter = require("./routes/cablingmaterial");
var cablingitempriceRouter = require("./routes/cablingitemprice");
var reportmaterialsRouter = require("./routes/reportmaterials");
var cablingrequestproductRouter = require("./routes/cablingrequestproduct");
var vendorsRouter = require("./routes/vendors");
var productionRouter = require("./routes/production");
var productionmaterialRouter = require("./routes/productionmaterial");
var repeatrequestRouter = require("./routes/repeatrequest");
var cablingtoolRouter = require('./routes/cablingtool')
var cablingrequesttoolRouter = require('./routes/cablingrequesttool');
var pdfRouter = require('./routes/pdf');
var cablingInventorytoolRouter = require('./routes/cablinginventorytool');

var app = express();

//Initialize Mongo DB and Sessions
mongodb.SetMongo(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/department", departmentRouter);
app.use("/position", positionRouter);
app.use("/accesstype", accesstypeRouter);
app.use("/roletype", roletypeRouter);
app.use("/cablingdashboard", cablingdashboardRouter);
app.use("/cablingitems", cablingitemsRouter);
app.use("/brand", brandRouter);
app.use("/cablingitemunits", cablingitemunitsRouter);
app.use("/cablingrequestmaterial", cablingrequestmaterialRouter);
app.use("/cablingpersonel", cablingpersonelRouter);
app.use("/cablingrequesttype", cablingrequesttypeRouter);
app.use("/store", storeRouter);
app.use("/cablingproduct", cablingproductRouter);
app.use("/cablingmaterial", cablingmaterialRouter);
app.use("/cablingitemprice", cablingitempriceRouter);
app.use("/reportmaterials", reportmaterialsRouter);
app.use("/cablingrequestproduct", cablingrequestproductRouter);
app.use("/vendors", vendorsRouter);
app.use("/production", productionRouter);
app.use("/productionmaterial", productionmaterialRouter);
app.use("/repeatrequest", repeatrequestRouter);
app.use("/cablingtool", cablingtoolRouter);
app.use("/cablingrequesttool", cablingrequesttoolRouter); //
app.use("/pdf", pdfRouter); //
app.use("/cablinginventorytool", cablingInventorytoolRouter); //

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
