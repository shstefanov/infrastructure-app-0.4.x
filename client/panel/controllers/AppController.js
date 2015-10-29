module.exports = require("infrastructure-appcontroller-ractive").extend("AppController", {
  // Layout: require("game.views.Layout"),
  config: "ractive",

  routes: {
    "setContext": "setContext",
  },

  setContext: function( screen_name, tab, context, action ){
    var state = { 
      screen:    screen_name,
      tab:       tab,
      context:   context,
      action:    action,
    };
    this.reset( "state", state );
  },



});
