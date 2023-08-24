var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", isAuthAdminUser, function (req, res, next) {
  res.render("index", {
    title: req.session.title,
    fullname: req.session.fullname,
    roletype: req.session.roletype,
    position: req.session.position,
    department: req.session.department,
  });
});

function isAuthAdminUser(req, res, next) {
  console.log(req.session.roletype);

  if (req.session.roletype == "Admin") {
    next();
  } else {
    if (req.session.roletype == "User" && req.session.department == "Cabling") {
      res.redirect("/cablingdashboard");
    } else {
      res.redirect("/login");
    }
  }
}

module.exports = router;
