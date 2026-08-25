import { Router } from "express";
import  veryfyJWT  from "../middlewares/auth.middleware.js";
import * as taskController from "../controllers/task.controllers.js";
import { validate } from "../middlewares/validate.middleware.js";
import { addTaskValidator } from "../validators/task.validator.js";

const router =Router()

router.route('/').post(veryfyJWT,validate(addTaskValidator),taskController.addTask)
router.route('/').get(veryfyJWT,taskController.getAllTasks)
router.route('/:id').get(veryfyJWT,taskController.getTask)
router.route('/:id').patch(veryfyJWT,taskController.updateTask)
router.route('/:id').delete(veryfyJWT,taskController.deleteTask)
// router.route('/').get(veryfyJWT,taskController.searchTasks)


export default router