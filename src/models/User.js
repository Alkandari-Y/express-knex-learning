const BaseModel = require("./base");

class User extends BaseModel {
  static tableName = "users";
}

module.exports = User;
