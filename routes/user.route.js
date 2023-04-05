const router = require("express").Router();

const UserController = require("../controllers/user.controller");

router.post("/signup", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);

module.exports = router;
