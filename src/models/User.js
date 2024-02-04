const BaseModel = require("./base");

class User extends BaseModel {
  static tableName = "user";

  static findExistingUser(username, email) {
    const user = this.table
    .where({ username })
      .orWhere({ email }).first();
    return user;
  }
}

module.exports = User;
