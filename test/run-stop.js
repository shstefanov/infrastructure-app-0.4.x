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
