// app.js

var infrastructure = require("infrastructure");

infrastructure({
  // This is the config
  mode:              "development", // defaults to "development"
  process_mode:      "cluster",     // defaults to "single"
  rootDir:           __dirname,     // project root directory

}, function(err, env){
  if(err) throw err;
});