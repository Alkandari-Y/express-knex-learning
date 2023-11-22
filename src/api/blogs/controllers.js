const BlogService = require("../../services/blogServices");
const CommentService = require("../../services/commentService");

exports.blogIdParamHandler = async (req, res, next, blogId) => {
  const foundBlog = await BlogService.getBlog({ id: blogId });
  if (!foundBlog) {
    return res
      .status(404)
      .json({ message: `Blog with id ${blogId} does not exist` });
  }

  req.blog = foundBlog;
  return next();
};

exports.getAllBlogs = async (req, res, next) => {
  try {
    const data = await BlogService.getAllBlogs();
    return res.json(data);
  } catch (error) {
    return next(error);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const newBLog = await BlogService.createBlog({
      ...req.body,
      author_id: req.session.user.id,
    });
    return res.status(201).json(newBLog);
  } catch (error) {
    return next(error);
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await BlogService.getBlogAndComments(req.blog.id);
    return res.json(blog);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.updateBlogById = async (req, res, next) => {
  try {
    const updatedBlog = await BlogService.updateBlog(
      {
        id: req.blog.id,
      },
      req.body
    );
    return res.status(202).json(updatedBlog);
  } catch (error) {
    return next(error);
  }
};

exports.deleteBlogById = async (req, res, next) => {
  try {
    await BlogService.deleteBlog({ id: req.blog.id });
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

exports.getBlogsByCurrentUser = async (req, res, next) => {
  try {
    const blogs = await BlogService.getBlogsByAuthor(req.session.user.id);
    return res.json(blogs);
  } catch (error) {
    return next(error);
  }
};

exports.getAllAuthors = async (req, res, next) => {
  try {
    const authors = await BlogService.getAllAuthors();
    return res.json(authors);
  } catch (error) {
    return next(error);
  }
};

exports.postComment = async (req, res, next) => {
  try {
    const { id: blog_id } = req.blog;
    const { id: user_id } = req.session.user;
    const comment = await CommentService.postComment({
      ...req.body,
      user_id,
      blog_id,
    });
    return res.status(201).json(comment);
  } catch (error) {
    return next(error);
  }
};
