const path = require("path");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const multer = require("multer");
const express = require("express");
const errorHandler = require('errorhandler')
const routes = require('../routes/index')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');



  //setttings
  module.exports = app => {

  app.set("views", path.join(__dirname, "../views"));

  app.engine(
    ".hbs",
    exphbs({
      defaultLayout: "main",
      partialsDir: path.join(app.get("views"), "partials"),
      layoutsDir: path.join(app.get("views"), "layouts"),
      extname: ".hbs",
      handlebars: allowInsecurePrototypeAccess(Handlebars),
      helpers: require("./helpers")
    })
  );
  app.set("view engine", ".hbs");
  app.use(
     multer({ dest: path.join(__dirname, "../public/upload/temp") }).single(
       "image"
     )
   );
  //middlewares
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  //routes
routes(app);

//static file 

app.use('/public', express.static(path.join(__dirname, '../public')));

  //error handlers

if ('development' === app.get('env')){

app.use(errorHandler)
}









  return app;
};
