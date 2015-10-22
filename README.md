

1. Install infrastructure (branch "dev" for now)
================================================
    npm install https://github.com/shstefanov/infrastructure.git#dev

  Or in package.json
    {
      "dependencies": {
        "infrastructure": "https://github.com/shstefanov/infrastructure.git#dev"
      }
    }

2. Create app entry point
=========================
    
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

  Running it
    node app.js
  should run and exit without any output - there is no workers to run


3. Adding first worker
======================

  It will be built-in logger worker. Workers are defined under "structure" object in config.

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

  Running it will output something like: 
    [sys]  [2015-10-22 09:38:37][logger]........................... options: sys, info
    [sys]  [2015-10-22 09:38:37][worker]........................... log
    [sys]  [2015-10-22 09:38:37][application started].............. 131ms
    [info]  [2015-10-22 09:38:37][master process]................... initialization successfull

  We see that system reports something.
  The log of built-in logger logs info, separated in 4 parts
  1. Option we use to log something
  2. The date
  3. Log context
  4. Log info
