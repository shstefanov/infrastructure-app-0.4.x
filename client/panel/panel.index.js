// var _           = require("underscore");
// var bulk        = require("bulk-require");
var App         = require("App");

// require("panel.controllers.AppController");

App.config(require.context("./controllers", true));
App.Controllers = App.bulk(require.context("./controllers"));

var volen = require("./volen.jpg");


// var ctx = require.context("./controllers");

// window.req = ctx;

// console.log("context: ", ctx)


                  // bulk(__dirname+"/boot",             ["**/*.js",   "**/*.coffee" ] );
// App.partials    = bulk(__dirname+"/views/partials",   [ "**/*.html"               ] );
// App.Models      = bulk(__dirname+"/models",           [ "**/*.js",  "**/*.coffee" ] );
// App.Controllers = bulk(__dirname+"/controllers",      [ "**/*.js",  "**/*.coffee" ] );

//var app         = require("app");
// app.init({
//   App:          App,
//   config:       require("config"),
//   settings:     window.settings,
//   routes:       require("./routes.json"),
//   data:         require("data")
// }, function(err){
//   console.log(err?err.stack:undefined);
//   if(err) throw err;
//   console.log("app initialized");



// });
