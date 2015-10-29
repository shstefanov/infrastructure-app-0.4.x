var infrastructure = require("infrastructure");

infrastructure(require("./config.json"), function(err, env){ 
  if(err) throw err; 
  
  if(require("cluster").isMaster){
    
    

    // env.i.do("data.Models.create", {field_a: 5, field_b: 6}, function(err, model){ // err === null
      
    //   env.i.do("log.info", "Created model", model);
      
    //   env.i.do("data.Models.find", function(err, models){  // err === null
    //     env.i.do("log.info", "Get all models", models);
    //   });

    // });



    // env.i.do("data.MysqlModel.create", {field_a: Math.random().toString().slice(-10), field_b: Date.now()}, function(err, model){ // err === null
      
    //   env.i.do("log.info", "Created model", model);
      
    //   env.i.do("data.MysqlModel.find", function(err, models){  // err === null
    //     env.i.do("log.info", "Get all models", models);
    //   });

    // });



  }
  
});
