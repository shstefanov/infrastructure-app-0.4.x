

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


4. Adding http pages worker
===========================

  We need to install some other packages
  
  The engine:
    npm install https://github.com/shstefanov/infrastructure-server-engine-express.git

  The loader and classes metapackage:
    npm install https://github.com/shstefanov/infrastructure-server-pages-express.git

  Adding pages configuration to structures
    // app.js

    var infrastructure = require("infrastructure");

    infrastructure({
      // This is the config
      mode:              "development", // defaults to "development"
      process_mode:      "cluster",     // defaults to "single"
      rootDir:           __dirname,     // project root directory

      structures: {
        log: { engines: ["log"], options: { sys: true, info: true } },
        
        pages: {
          path:       "pages",                                            // Path, relatove to rootDir
          engines:    [ "infrastructure-server-engine-express"       ],   // The engine
          loaders:    [ "infrastructure-server-pages-express/loader" ],   // And the loader
          libs: {
            Page :              "infrastructure-server-pages-express/Page"  // We need to inherit this class when creating our pages
          },
          config: { // Minimum configuration, needed by express engine to work
            views:{
              path:        "templates", // Templates folder, Path, relatove to rootDir
              view_engine: "jade",      // View engine used
              cache:       true
            },
            http: { port: 3000 }
          }
        }
      }
    }, function(err, env){ if(err) throw err; });

  Other options: https://github.com/shstefanov/infrastructure-server-pages-express

  Creating needed folders
    mkdir pages
    mkdir templates

  Running this will add this line to log output:
    [sys]  [2015-10-22 10:59:51][http]............................. Express server listening on port 3000


5. Creating page class and template
=============================

  In "pages" folder, create "hello.js" file

    module.exports = function(){
      var env = this;
      return env.lib.Page.extend("HelloPage", {
        root:          "/hello",  // URI prefix
        template:      "hello",   // Template to be rendered
        "GET /:name" : function(req, res, next){  // Handle some route
          res.data = { name: req.params.name };        // Attach data to be rendered by template
          this.render(req, res);                       // Call page renderer
        }
      });
    };

  In "templates" folder, create "hello.jade" file

    html
      head
        title Hello #{name}
      body
        h1 Hello #{name}


  Running it will add more reports to logs
  
    [sys]  [2015-10-22 11:14:30][route]............................ GET    /hello/:name

  Visiting http://localhost:3000/hello/Jonny will show the template as html.


6. Adding controllers worker
===========================

  Adding controllers configuration to structures
    // app.js

    var infrastructure = require("infrastructure");

    infrastructure({
      // This is the config
      mode:              "development", // defaults to "development"
      process_mode:      "cluster",     // defaults to "single"
      rootDir:           __dirname,     // project root directory

      structures: {
        log: { engines: ["log"], options: { sys: true, info: true } },
        pages: {
          path:       "pages",
          engines:    [ "infrastructure-server-engine-express"          ],
          loaders:    [ "infrastructure-server-pages-express/loader"    ],
          libs: {     Page : "infrastructure-server-pages-express/Page" },
          config: {
            views:{ path: "templates", view_engine: "jade", cache: true },
            http: { port: 3000 }
          }
        },

        controllers: {
          path:        "controllers",     // The folder where controllers are
          loaders:     [ "controllers" ], // built-in controllers loader
          libs: {
            "Controller" : "Controller"   // We need to inherit this class when creating our controllers
          }
        }

      }
    }, function(err, env){ if(err) throw err; });

  Other options: https://github.com/shstefanov/infrastructure-server-pages-express

  Creating needed folders
    mkdir controllers

  Running this will add this line to log output:
    [sys]  [2015-10-22 11:58:58][worker]........................... controllers

7. Creating the controller
==========================

  In "controllers" folder, make "HelloController.js"

    module.exports = function(){
      var env = this;
      return env.lib.Controller.extend("HelloController", {
        
        private: {
          getMessage: function(name){
            return "Hello" + name + "!";
          }
        },

        helloMessage: function(name, cb){
          cb(null, this.getMessage(name));
        }

      });
    };

  When running the application, we will see additional log:
    [sys]  [2015-10-22 12:04:49][controller]....................... HelloController

8. Calling the controller from page
===================================

  Edit "pages/hello.js"

     module.exports = function(){
      var env = this;
      return env.lib.Page.extend("HelloPage", {
        root:          "/hello",  // URI prefix
        template:      "hello",   // Template to be rendered
        
        "GET /long/:name" :      function(req, res, next){
          var self = this;
          env.i.do("controllers.HelloController.helloMessage", req.params.name, function(err, message){
            res.data = { message: message };        
            self.render(req, res);        
          });
        }

      });
    };

  Change "templates/helo.jade" to show the entire message

    html
      head
        title #{message}
      body
        h1 #{message}


  Visit http://localhost:3000/hello/long/Jonny and http://localhost:3000/hello/short/Jonny to see the result




