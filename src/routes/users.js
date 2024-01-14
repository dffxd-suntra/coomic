const Router = require("@koa/router");
const router = new Router();

const user_controller = require("../controllers/user");

router.post("register/", user_controller.user_register);
router.post("login/", user_controller.user_login);
router.all("logout/", user_controller.user_logout);
router.all(":user_id(\\d{1,9})?/info/", user_controller.user_info);
router.post(":user_id(\\d{1,9})/update/", user_controller.user_info_update);

module.exports = router;