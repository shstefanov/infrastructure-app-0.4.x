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

