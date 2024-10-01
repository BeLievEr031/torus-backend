/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response, NextFunction, Router } from "express"
import authenticate from "../middleware/authenticate";
import { addTaskValidator, deleteTaskValidator, paginationValidator, updateTaskValidator } from "../validators/task-validator";
import TaskController from "../controllers/TaskController";
import TaskService from "../services/TaskService";
import Task from "../models/Task";
import { AddTaskRequest, AuthenticateReq, PaginationRequest } from "../types";

const taskRouter = Router();
const taskService = new TaskService(Task);

const taskController = new TaskController(taskService)
taskRouter.post("/", authenticate, addTaskValidator, (req: Request, res: Response, next: NextFunction) => taskController.addTask(req as AddTaskRequest, res, next));

taskRouter.get("/", authenticate, paginationValidator, (req: Request, res: Response, next: NextFunction) => taskController.fetchTask(req as PaginationRequest, res, next));

taskRouter.put("/:id", authenticate, updateTaskValidator, (req: Request, res: Response, next: NextFunction) => taskController.updateTask(req as AddTaskRequest, res, next));

taskRouter.delete("/:id", authenticate, deleteTaskValidator, (req: Request, res: Response, next: NextFunction) => taskController.deleteTask(req as AuthenticateReq, res, next));

export default taskRouter;