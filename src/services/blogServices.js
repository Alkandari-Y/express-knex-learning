const Blog = require("../models/Blog");

class BlogService {
  static async createBlog(data) {
    const [newBlog] = await Blog.create(data);

    return newBlog;
  }

  static async getAllBlogs() {
    const blogs = await Blog.findAll();
    return blogs;
  }

  static async getBlog(searchParams) {
    const blogs = await Blog.findOne(searchParams);
    return blogs;
  }

  static async getBlogAndComments(blogId) {
    const blog = await Blog.findOneSelectComments(blogId)
    return blog;
  }

  static async updateBlog(searchParams, data) {
    if (data.hasOwnProperty("published")) {
      if (data.published && !data.published_at) {
        data.published_at = new Date().toISOString();
      } else if (!data.published) {
        data.published_at = null;
      }
    }
    const blog = await Blog.updateOne(searchParams, data);
    return blog;
  }

  static async deleteBlog(searchParams) {
    const blog = await Blog.deleteOne(searchParams);
    return blog;
  }

  static async getBlogsByAuthor(author) {
    const blogs = await Blog.find({ author_id: author });
    return blogs;
  }

  static async getAllAuthors() {
    const authors = await Blog.findAllAuthors();
    return authors;
  }
}

module.exports = BlogService;
