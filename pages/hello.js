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