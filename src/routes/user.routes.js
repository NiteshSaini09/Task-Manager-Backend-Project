import { Router } from "express";
import  veryfyJWT  from "../middlewares/auth.middleware.js";
import * as userController from "../controllers/user.controllers.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/user.validator.js";

const router = Router();


router.route("/register").post(validate(registerSchema),userController.register);
router.route("/login").post(validate(loginSchema),userController.login);

export default router;