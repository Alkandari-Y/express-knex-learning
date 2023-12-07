const router = require("express").Router();
const controllers = require("./controllers");

router.post("/register/jwt", controllers.registerUserJWT);
router.post("/register/session", controllers.registerUserSession);
router.post("/login/jwt", controllers.loginUserJWT);
router.post("/login/session", controllers.loginUserSession);
router.post("/logout/session", controllers.logOutSession);
module.exports = router;
