module.exports = function(){
  var env     = this;
  return env.lib.MysqlLayer.extend("MysqlModel", {
    tableName: "models",
    primaryKey: "model_id",
    fields: {
      model_id: "INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
      field_a:  "varchar(10)",
      field_b:  "int"
    }
  });
};

/*

CREATE TABLE models (
  model_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  field_a  varchar(10),
  field_b int
);


*/
