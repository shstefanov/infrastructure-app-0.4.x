module.exports = function(){
  var env = this;
  return env.lib.Controller.extend("HelloController", {
    
    private: {
      getMessage: function(name){
        return "Hello, " + name + "!";
      }
    },

    helloMessage: function(name, cb){
      cb(null, this.getMessage(name));
    }

  });
};
