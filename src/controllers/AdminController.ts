import { Response, NextFunction } from "express";
import AdminService from "../services/AdminService";
import { validationResult } from "express-validator";
import { AssignTaskRequest, PaginationRequest, Task } from "../types";
import mongoose from "mongoose";

class AdminController {
    constructor(private adminService: AdminService) { }

    async assignTask(req: AssignTaskRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const { userid } = req.query;

            const taskData = {
                assignedUser: new mongoose.Types.ObjectId(userid),
                creatorId: new mongoose.Types.ObjectId(req.auth.id),
                title: req.body.title,
                description: req.body.description,
                dueDate: req.body.dueDate,
                status: req.body.status,
                priority: req.body.priority,
            }

            const newTask = await this.adminService.assignTask(taskData as Task);

            res.status(200).json({
                task: newTask,
                message: "New task added successfully"
            });

        } catch (error) {
            next(error)
        }
    }

    async fetchUsers(
        req: PaginationRequest, res: Response, next: NextFunction
    ) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { page, limit, orderBy } = req.query;
            const paginationData = {
                page, limit, orderBy
            }

            const users = await this.adminService.fetchUsers(paginationData);

            res.status(200).json({
                users,
                message: "Users fetched successfully"
            });

        } catch (error) {
            next(error)
        }
    }
}

export default AdminController;