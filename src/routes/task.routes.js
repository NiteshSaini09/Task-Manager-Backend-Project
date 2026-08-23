import { Router } from "express";
import  veryfyJWT  from "../middlewares/auth.middleware.js";
import * as taskController from "../controllers/task.controllers.js";

const router =Router()

router.route('/').post(veryfyJWT,taskController.addTask)

export default router