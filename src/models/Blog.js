const BaseModel = require("./base");

class Blog extends BaseModel {
  static tableName = "blogs";
}

module.exports = Blog;
