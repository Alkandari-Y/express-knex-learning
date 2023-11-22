const BaseModel = require("./base");

class Blog extends BaseModel {
  static tableName = "blogs";

  static async findAllAuthors() {
    const authors = await this.table
      .select(
        "users.username",
        "blogs.author_id",
        // json_agg and json_build_object are postgres specific
        // use this where JSON_ARRAYAGG will aggregate and JSON_OBJECT will create an object based on the table:
        // this._db.raw(
        //   "JSON_ARRAYAGG(JSON_OBJECT('id', blogs.id, 'title', blogs.title, 'content', blogs.content)) as blogs"
        // )
        // ref: https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_json-arrayagg
        // ref: https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_json-objectagg
        this._db.raw(
          "json_agg(json_build_object('id', blogs.id, 'title', blogs.title, 'content', blogs.content, 'published', blogs.published)) as blogs"
        )
      )
      .count("blogs.author_id") // added a count for the sake of it, and just to see how I can add it
      .leftJoin("users", "users.id", "blogs.author_id")
      .where("blogs.published", true) // can filter if needed to published articles only
      .groupBy("blogs.author_id", "users.id"); // group by will in the case of joins requires the same fields mentioned in the join to work properly

    return authors;
  }
}

module.exports = Blog;
