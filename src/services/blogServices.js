const Blog = require('../models/Blog');

class BlogService {
    static async createBlog(data) {
        const newBlog = await Blog.create(data);

        return newBlog;
    }

    static async getAllBlogs() {
        const blogs = await Blog.findAll();
        return blogs;
    }

    static async getBlogWhere(queryBy) {
        const blogs = await Blog.findOne(queryBy);
        return blogs; 
    }

    static async updateBlogWhere(queryBy) {
        const blog = await Blog.updateOne(queryBy);
        return blog;
    }

    static async deleteBlogWhere(queryBy) {
        const blog = await Blog.deleteOne(queryBy);
        return blog;
    }

}


module.exports = BlogService;