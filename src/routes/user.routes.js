import { Router } from "express";
import  veryfyJWT  from "../middlewares/auth.middleware.js";
import * as userController from "../controllers/user.controllers.js";

const router = Router();


router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

export default router;