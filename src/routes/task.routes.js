import { Router } from "express";
import  veryfyJWT  from "../middlewares/auth.middleware.js";
import * as taskController from "../controllers/task.controllers.js";
import { validate } from "../middlewares/validate.middleware.js";
import { addTaskValidator,getAllTasksValidator,updateTaskValidator } from "../validators/task.validator.js";

const router =Router()

router.route('/').post(veryfyJWT,validate(addTaskValidator),taskController.addTask)
router.route('/').get(veryfyJWT,validate(getAllTasksValidator,"query"),taskController.getAllTasks)
router.route('/:id').get(veryfyJWT  ,taskController.getTask)
router.route('/:id').patch(veryfyJWT,validate(updateTaskValidator),taskController.updateTask)
router.route('/:id').delete(veryfyJWT,taskController.deleteTask)

export default router