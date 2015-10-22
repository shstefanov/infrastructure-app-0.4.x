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
