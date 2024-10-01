/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Response, NextFunction, Router } from "express";
import authenticate from "../middleware/authenticate";
import { canAccess } from "../middleware/canAccess";
import { Request } from "express-jwt";
import { assignTaskValidator, paginationValidator } from "../validators/task-validator";
import AdminService from "../services/AdminService";
import AdminController from "../controllers/AdminController";
import Task from "../models/Task";
import User from "../models/User";
import { AssignTaskRequest, PaginationRequest } from "../types";

const adminRouter = Router();
const adminService = new AdminService(Task, User)
const adminController = new AdminController(adminService);

adminRouter.post("/assign-task", authenticate,
    canAccess(["admin"]), assignTaskValidator, (req: Request, res: Response, next: NextFunction) => adminController.assignTask(req as AssignTaskRequest, res, next))

adminRouter.post("/users", authenticate,
    canAccess(["admin"]), paginationValidator, (req: Request, res: Response, next: NextFunction) => adminController.fetchUsers(req as PaginationRequest, res, next))

export default adminRouter;