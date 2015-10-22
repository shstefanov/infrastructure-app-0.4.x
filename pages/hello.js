module.exports = function(){
  var env = this;
  return env.lib.Page.extend("HelloPage", {
    root:          "/hello",  // URI prefix
    template:      "hello",   // Template to be rendered
    "GET /:name" :      function(req, res, next){  // Handle some route
      res.data = { name: req.params.name };        // Attach data to be rendered by template
      this.render(req, res);                       // Call page renderer
    }
  });
};