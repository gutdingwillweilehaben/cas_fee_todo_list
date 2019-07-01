import express from 'express';
const router = express.Router();
import {tasksController} from '../controller/tasksController';

router.post("/", tasksController.createTask.bind(tasksController));
router.get("/:sort?:direction?:filtered?", tasksController.getTasks.bind(tasksController));
router.get("/:id/", tasksController.getTask.bind(tasksController));
router.put("/:id/", tasksController.updateTask.bind(tasksController));
router.put("/toggle/:id/", tasksController.toggleTask.bind(tasksController));
router.delete("/:id/", tasksController.deleteTask.bind(tasksController));

export const taskRoutes = router;