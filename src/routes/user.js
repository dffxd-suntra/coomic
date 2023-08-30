const Router = require("@koa/router");
const router = new Router();

const user_controller = require("../controllers/user");

router.all("/register", user_controller.user_register);
router.all("/login", user_controller.user_login);
router.all("/logout", user_controller.user_logout);
router.all("/info", user_controller.user_info);

module.exports = router;