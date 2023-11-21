const BaseModel = require("./base");

class User extends BaseModel {
  static tableName = "users";

  static async findExistingUser(username, email) {
    const user = await this.table
    .where({ username })
      .orWhere({ email }).first();
    return user;
  }
}

module.exports = User;
