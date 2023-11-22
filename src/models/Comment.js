const BaseModel = require("./base");

class Comment extends BaseModel {
    static tableName = 'comment';
}

module.exports = Comment;