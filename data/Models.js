module.exports = function(){
  var env     = this;
  return env.lib.MongoLayer.extend("Models", {
    collectionName: "Models",
  });
}
