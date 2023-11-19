const router = require("express").Router();
const controllers = require("./controllers");
const isSessionAuthenticated = require("../../middlewares/auth/isSessionAuthenticated");
const isAuthor = require("../../middlewares/blogs/isAuthorPermission");

router.param("blogId", controllers.blogIdParamHandler);

router.get("/", controllers.getAllBlogs);
router.post("/", isSessionAuthenticated, controllers.createBlog);
router.get("/:blogId", controllers.getBlogById);
router.put(
  "/:blogId",
  isSessionAuthenticated,
  isAuthor,
  controllers.updateBlogById
);
router.delete(
  "/:blogId",
  isSessionAuthenticated,
  isAuthor,
  controllers.deleteBlogById
);

module.exports = router;
