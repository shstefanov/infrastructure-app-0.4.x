// app.js

var infrastructure = require("infrastructure");

infrastructure({
  // This is the config
  mode:              "development", // defaults to "development"
  process_mode:      "cluster",     // defaults to "single"
  rootDir:           __dirname,     // project root directory

  structures: {
    log: {
      engines: ["log"],             // Mostly workers need to have one or more engines
      options: {                    // options will only affect this built-in worler
        sys: true,                  // "sys" option will be used by system(worker engines, loaders and some instances to report it's initialization)
        info: true                  // Any other log option is custom and can be used by the application to log different things
      }
    }
  }

}, function(err, env){
  if(err) throw err;

  if(require("cluster").isMaster){
    // First argument - the target we call
    // Second - specific for logger - log context
    // Thurd  - info we want to log
    env.i.do("log.info", "master process", "initialization successfull");
  }


});