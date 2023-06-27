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
