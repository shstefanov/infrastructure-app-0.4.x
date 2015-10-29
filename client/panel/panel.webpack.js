module.exports = function(){
  var env = this;

  return env.lib.Bundler.extend("PanelBundler", {
    name: "panel",   // The name of the bundle
    //entry: "./panel.index.js",
    entry: ["./panel.index.js", "./panel.index.less"], // Or just "./panel.index.js"
    output: "js/panel.bundle.js", // Output fulename based on configuration destination path
    styleFilename: "css/panel.bundle.css", // Default "css/[name].bundle.css""
    publicPath: "/",
    watch: true,

    chunks: {
      vendor: {
        output: "js/panel.vendor.js", // based on build destination as defined in config
        modules: ["underscore", "backbone"]
      }
    },

    // dependencies: ["infrastructure-appcontroller-ractive"],

    config: {
      SOME_CONFIG: { aaa: 55 }, // In files SOME_CONFIG will be replced with giwen object
    },

    alias: {
      // module_alias: path_to_module,    // in files: var my_module = = require("module_alias")
    },

    fileLoaders: {
      "images": {
        extensions: ["gif", "jpe?g", "png", "svg", "bmp" ],
        inlineLimit: 1, // Defaults to 1
        name: "[hash].[ext]" // Default "[hash].[ext]"
      },
      "fonts": {
        extensions: ["woff", "eot", "ttf", "woff2" ],
        inlineLimit: 1, // Defaults to 1
        name: "[hash].[ext]" // Default "[hash].[ext]"
      }
    },

    progress: true,

    scrapeRactiveTemplatesImages: true,


  });

}



