const Comment = require('../models/Comment');

class CommentService {
    static async postComment(data) {
        const comment = await Comment.create(data);
        return comment; 
    }
}

module.exports = CommentService;