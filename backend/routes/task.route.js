import { Router } from "express";
import isAuthenticated from "../middleware/auth.middleware";
import { createTask, deleteTask, getTaskById, getTasksForUser, updateTask, updateTaskStatus } from "../controller/task.controller";

const taskRouter = Router();

app.route('/').post(isAuthenticated,createTask)
              .get(isAuthenticated,getTasksForUser);

app.route('/:id').get(isAuthenticated,getTaskById)
                .put(isAuthenticated,updateTask)
                .delete(isAuthenticated,deleteTask);

app.route('/status/:id').post(updateTaskStatus);

export default taskRouter;
