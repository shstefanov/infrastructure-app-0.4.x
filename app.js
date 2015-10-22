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