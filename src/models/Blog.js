const BaseModel = require("./base");

class Blog extends BaseModel {
  static tableName = "blog";

  static findAllAuthors() {
    const authors = this.table
      .select(
        "user.username",
        "blog.author_id",
        // json_agg and json_build_object are postgres specific
        // use this where JSON_ARRAYAGG will aggregate and JSON_OBJECT will create an object based on the table:
        // this._db.raw(
        //   "JSON_ARRAYAGG(JSON_OBJECT('id', blog.id, 'title', blog.title, 'content', blog.content)) as blogs"
        // )
        // ref: https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_json-arrayagg
        // ref: https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_json-objectagg
        this._db.raw(
          "JSON_AGG(JSON_BUILD_OBJECT('id', blog.id, 'title', blog.title, 'content', blog.content, 'published', blog.published)) as blogs"
        )
      )
      .count("blog.author_id") // added a count for the sake of it, and just to see how I can add it
      .leftJoin("user", "user.id", "blog.author_id")
      .where("blog.published", true) // can filter if needed to published articles only
      .groupBy("blog.author_id", "user.id"); // group by will in the case of joins requires the same fields mentioned in the join to work properly

    return authors;
  }

  static findOneSelectComments(blogId) {
    const query = this.table
      .select(
        "blog.*",
        this._db.raw(
          `(SELECT COALESCE(
                JSON_AGG(
                    JSON_BUILD_OBJECT('id', public.comment.id, 'text', public.comment.text, 'user_id', public.comment.user_id,  'username', public.user.username)
                ) FILTER (WHERE public.comment.id IS NOT NULL),
                'null'::json
            ) FROM comment
            LEFT JOIN public.user ON comment.user_id = public.user.id
            WHERE comment.blog_id = blog.id
            ) as comments`
        )
      )
      .leftJoin("comment", "blog.id", "comment.blog_id")
      .where("blog.id", blogId)
      .groupBy("blog.id", "comment.blog_id");
    return query;
  }

  static findBlogSelectDetails(blogId) {
    const query = this.table
      .select(
        "blog.*",
        this._db.raw(
          "JSON_BUILD_OBJECT('id', public.user.id, 'username', public.user.username) as author"
        ),
        this._db.raw(
          `COALESCE(
            JSON_AGG(JSON_BUILD_OBJECT('id', category.id, 'name', category.name)) FILTER (WHERE public.category.id IS NOT NULL),
            'null'::json
          ) as categories`
        ),
        this._db.raw(
          `(SELECT COALESCE(
                JSON_AGG(
                    JSON_BUILD_OBJECT('id', public.comment.id, 'text', public.comment.text, 'user_id', public.comment.user_id,  'username', public.user.username)
                ) FILTER (WHERE public.comment.id IS NOT NULL),
                'null'::json
            ) FROM comment
            LEFT JOIN public.user ON comment.user_id = public.user.id
            WHERE comment.blog_id = blog.id
            ) as comments`
        )
      )
      .leftJoin("blog_category", "blog.id", "blog_category.blog_id")
      .leftJoin("comment", "comment.blog_id", "blog.id")
      .leftJoin("category", "category.id", "blog_category.category_id")
      .leftJoin("user", "blog.author_id", "public.user.id")
      .groupBy("blog.id", "public.user.id")
      .where("blog.id", blogId)
      .first();
    return query;
  }
}

module.exports = Blog;
