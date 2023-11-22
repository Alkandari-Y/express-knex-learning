const router = require("express").Router();
const controllers = require("./controllers");
const isSessionAuthenticated = require("../../middlewares/auth/isSessionAuthenticated");
const isAuthor = require("../../middlewares/blogs/isAuthorPermission");

router.param("blogId", controllers.blogIdParamHandler);

router.get("/", controllers.getAllBlogs);
router.post("/", isSessionAuthenticated, controllers.createBlog);
router.get("/authors", controllers.getAllAuthors);
router.get("/my-blogs", controllers.getBlogsByCurrentUser);
router.get("/detail/:blogId/comments", controllers.getAllCommentsByBlog);
router
  .route("/detail/:blogId")
  .get(controllers.getBlogById)
  .put(isSessionAuthenticated, isAuthor, controllers.updateBlogById)
  .delete(isSessionAuthenticated, isAuthor, controllers.deleteBlogById)
  .post(isSessionAuthenticated, controllers.postComment);

module.exports = router;
