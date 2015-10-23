

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

  Running it with "node app.js"
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
      mode:              "development",
      process_mode:      "cluster",
      rootDir:           __dirname,
      
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
      mode:              "development",
      process_mode:      "cluster",
      rootDir:           __dirname,

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

  Creating needed folder
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
          // Methods here can not be targeted from other workers
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
        root:          "/hello",
        template:      "hello",
        
        "GET /long/:name" :      function(req, res, next){
          var self = this;
          // Calling worker.unit.method with params, including callback
          env.i.do("controllers.HelloController.helloMessage", req.params.name, function(err, message){
            res.data = { message: message };        
            self.render(req, res);        
          });
        },

        // The short variant
        // target | params (comma separated) | mountpoint on res.data
        "GET /short/:name": "controllers.HelloController.helloMessage | req.params.name | message"

      });
    };

  Change "templates/helo.jade" to show the entire message

    html
      head
        title #{message}
      body
        h1 #{message}


  Visit http://localhost:3000/hello/long/Jonny and http://localhost:3000/hello/short/Jonny to see the result

9. Adding dataLayer worker
==========================

  DataLayers are separate packages. In this example. We will use mongodb engine and DataLayer:
    npm install https://github.com/shstefanov/infrastructure-server-engine-mongodb.git
  And mongodb DataLayer metapackage
    npm install https://github.com/shstefanov/infrastructure-server-datalayer-mongodb.git

  In app.js

    var infrastructure = require("infrastructure");

    infrastructure({
      mode:              "development",
      process_mode:      "cluster",
      rootDir:           __dirname,

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
        controllers: { path: "controllers", loaders: [ "controllers" ], libs: { "Controller" : "Controller" } },

        data: {
          path:    "data",    // Folder where datalayers are
          engines: [ "infrastructure-server-engine-mongodb"           ], // The engine
          loaders: [ "data" ], // Built-in data loader

          libs:{
            MongoLayer:    "infrastructure-server-datalayer-mongodb"  // The base class, we will inherit it
          },

          config: {

            // Mongodb engine needs the following configuration to connect
            "mongodb": {
              host:            "localhost",
              port:            27017,
              db:              "app_dev",
              auto_reconnect:  true,
              options:         { nativeParser: true }  // More options at http://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html
            }

          }

        }



      }
    }, function(err, env){ if(err) throw err; });



  Creating needed folder
    mkdir data

  Running this will add this line to log output:
    [sys]  [2015-10-22 12:58:23][mongodb].......................... Connected to MongoDB on localhost:27017/app_dev


10. Creating DataLayer object
=============================

  In "data" folder:

    // data/Models.js

    module.exports = function(){
      var env     = this;
      
      return env.lib.MongoLayer.extend("Models", {
        collectionName: "Models",
      });

    }

  After running the app we should see in log:
    [sys]  [2015-10-23 22:00:01][DataLayer:mongodb]................ Models

  And we can try it's CRUD:

    // app.js
    var infrastructure = require("infrastructure");
    // Config is moved to json file
    infrastructure(require("./config.json"), function(err, env){ 
      if(err) throw err; 
      
      if(require("cluster").isMaster){
        
        env.i.do("data.Models.create", {field_a: 5, field_b: 6}, function(err, model){ // err === null
          
          env.i.do("log.info", "Created model", model);
          
          env.i.do("data.Models.find", function(err, models){  // err === null
            env.i.do("log.info", "Get all models", models);
          });

        });

      }
      
    });

  Running this will show us 2 info logs


11. Tests
=========

  Add test runner and mocha devdependency in package.json

    {
      "name": "insrastructure-app",
      "version": "0.0.1",
      "private": false,
      "author": {
        "name": "Some Name",
        "email": "some.mail@mail.com"
      },
      "dependencies": {
        "infrastructure": "git+https://github.com/shstefanov/infrastructure.git#dev",
        "infrastructure-server-datalayer-mongodb": "git+https://github.com/shstefanov/infrastructure-server-datalayer-mongodb.git",
        "infrastructure-server-engine-express": "git+https://github.com/shstefanov/infrastructure-server-engine-express.git",
        "infrastructure-server-engine-mongodb": "git+https://github.com/shstefanov/infrastructure-server-engine-mongodb.git",
        "infrastructure-server-pages-express": "git+https://github.com/shstefanov/infrastructure-server-pages-express.git",
      },

      "devDependencies": {
        "mocha": "latest"
      },

      "scripts": {
        "test": "node node_modules/mocha/bin/mocha --recursive --colors --sort --check-leaks --no-exit --full-trace --throw-deprecation test"
      }
    }

  Then "npm install"

  Create folder "test" and "run-stop.js" in it

    // test/run-stop.js
    var assert = require("assert");
    var infrastructure = require("infrastructure/test_env.js");

    describe("Start - stop application", function(){
      
      var env;

      it("starts application", function(next){
        this.timeout(4000);
        infrastructure.start({ process_mode: "cluster" }, function(err, test_env){
          assert.equal( err, null );
          env = test_env;
          next();
        });
      });

      it("stops application", function(next){
        this.timeout(4000);
        env.stop(function(err){
          assert.equal(err, null);
          next();
        });
      });

    });

  Running "npm" will show us some extra logs in console. To fix this, we will add something that will patch the config object in test mode.
  In "config.json" in main object's root add "test" and write some configurations in it:

    {

      "process_mode":      "cluster",

      "structures": {...},

      "test": {
        "structures": {"log": {"options": {"sys": false }, "info": false } }
      }
      
    }

  Remove '"mode": "development",' from it, "development is default value"
  And running it again should show something like this in the console:

    $> npm test

    > insrastructure-app@0.0.1 test /home/stefan/projects/infrastructure-app
    > node node_modules/mocha/bin/mocha --recursive --colors --sort --check-leaks --no-exit --full-trace --throw-deprecation test



      Start - stop application
        ✓ starts application (1435ms)
        ✓ stops application


      2 passing (1s)

    $>
