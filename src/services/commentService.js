const Comment = require("../models/Comment");

class CommentService {
  static async postComment(data) {
    const [comment] = await Comment.create(data);
    return comment;
  }

  static async findCommentsByBlog(searchParams) {
    const comments = await Comment.find(searchParams);
    return comments;
  }
}

module.exports = CommentService;
