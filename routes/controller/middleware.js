var roleacess = [
  {
    role: "Admin",
    routes: [
      {
        layout: "index",
      },
      {
        layout: "accesstype",
      },
      {
        layout: "brand",
      },
      {
        layout: "cablingdashboard",
      },
      {
        layout: "cablingitemprice",
      },
      {
        layout: "cablingitems",
      },
      {
        layout: "cablingitemunits",
      },
      {
        layout: "cablingmaterial",
      },
      {
        layout: "cablingpersonel",
      },
      {
        layout: "cablingproduct",
      },
      {
        layout: "cablingrequestmaterial",
      },
      {
        layout: "cablingrequestproduct",
      },
      {
        layout: "cablingrequesttype",
      },
      {
        layout: "department",
      },
      {
        layout: "position",
      },
      {
        layout: "production",
      },
      {
        layout: "productionmaterial",
      },
      {
        layout: "reportmaterials",
      },
      {
        layout: "roletype",
      },
      {
        layout: "store",
      },
      {
        layout: "users",
      },
      {
        layout: "vendors",
      },
      {
        layout: "repeatrequest",
      },
      {
        layout: "cablingtoollayout",
      },
      {
        layout: "cablingrequesttool"
      },
      {
        layout: "cablinginventorytool"
      },
    ],
  },
  {
    role: "User",
    routes: [
      {
        layout: "cablingdashboard",
      },
      {
        layout: "cablingproduct",
      },
      {
        layout: "cablingmaterial",
      },
      {
        layout: "cablingtools",
      },
      {
        layout: "cablingrequestmaterial",
      },
      {
        layout: "cablingrequestproduct",
      },
      {
        layout: "requesttools",
      },
      {
        layout: "requestpurchaseorder",
      },
      {
        layout: "reportmaterials",
      },
      {
        layout: "reportpurchaseorder",
      },
      {
        layout: "cablingrequesttool"
      },
      {
        layout: "cablinginventorytool"
      },
    ],
  },
  {
    role: "Manager",
    routes: [
      {
        layout: "cablingdashboard",
      },
      {
        layout: "cablingitemprice",
      },
      {
        layout: "cablingitems",
      },
      {
        layout: "cablingitemunits",
      },
      {
        layout: "cablingmaterial",
      },
      {
        layout: "cablingpersonel",
      },
      {
        layout: "cablingproduct",
      },
      {
        layout: "cablingrequestmaterial",
      },
      {
        layout: "cablingrequestproduct",
      },
      {
        layout: "cablingrequesttype",
      },
      {
        layout: "reportmaterials",
      },
      {
        layout: "cablingrequesttool"
      },
      {
        layout: "cablinginventorytool"
      },
    ],
  },
];

exports.Validator = function (req, res, layout) {
  if (req.session.roletype == "User" && layout == "index") {
    return res.redirect("/cablingdashboard");
  } else {
    roleacess.forEach((key, item) => {
      var routes = key.routes;

      routes.forEach((value, index) => {
        console.log(`${key.role} - ${value.layout}`);

        if (key.role == req.session.roletype && value.layout == layout) {
          return res.render(`${layout}`, {
            title: req.session.title,
            fullname: req.session.fullname,
            roletype: req.session.roletype,
            position: req.session.position,
            department: req.session.department,
          });
        }
      });
    });

    res.redirect("/login");
  }
};
