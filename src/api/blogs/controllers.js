const BlogService = require("../../services/blogServices");

exports.blogIdParamHandler = async (req, res, next, blogId) => {
  const foundBlog = await BlogService.getBlogWhere({ by: blogId });
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
    req.body.author_id = req.session.user.id;
    const newBLog = await BlogService.createBlog(req.body);
    return res.status(201).json(newBLog);
  } catch (error) {
    return next(error);
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    return res.json(req.blog);
  } catch (error) {
    return next(error);
  }
};

exports.updateBlogById = async (req, res, next) => {
  try {
    const updatedBlog = await BlogService.updateBlogWhere({
      data: req.body,
      by: req.blog.id,
    });
    return res.status(202).json(updatedBlog);
  } catch (error) {
    return next(error);
  }
};

exports.deleteBlogById = async (req, res, next) => {
  try {
    await BlogService.deleteBlogWhere({ by: req.blog.id });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
