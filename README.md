

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


