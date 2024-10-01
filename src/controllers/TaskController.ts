import mongoose from 'mongoose';
import { Response, NextFunction } from "express";
import { AddTaskRequest, AuthenticateReq, PaginationRequest, Task } from "../types";
import { validationResult } from "express-validator";
import TaskService from "../services/TaskService";
import createHttpError from 'http-errors';

class TaskController {
    constructor(private taskService: TaskService) { }

    async addTask(req: AddTaskRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const task = {
                assignedUser: new mongoose.Types.ObjectId(req.auth.id),
                creatorId: new mongoose.Types.ObjectId(req.auth.id),
                title: req.body.title,
                description: req.body.description,
                dueDate: req.body.dueDate,
                status: req.body.status,
                priority: req.body.priority,
            }

            const newTask = await this.taskService.addTask(task as Task);
            res.status(200).json({
                task: newTask,
                message: "New task added successfully"
            });

        } catch (error) {
            next(error);
        }
    }

    async fetchTask(req: PaginationRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { page, limit, orderBy } = req.query;
            const { id } = req.auth;
            const userid = new mongoose.Types.ObjectId(id)
            const tasks = await this.taskService.fetchTask({ userid, page, limit, orderBy });

            res.status(200).json({
                tasks,
                message: "Tasks fetch"
            })
        } catch (error) {
            next(error);
        }
    }

    async updateTask(req: AddTaskRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id: taskId } = req.params;

            const isValidTask = await this.taskService.findValidTaskByUserId(taskId, req.auth.id);

            if (!isValidTask) {
                next(createHttpError(404, "Invalid task"))
                return;
            }

            const task = {
                assignedUser: new mongoose.Types.ObjectId(req.auth.id),
                creatorId: new mongoose.Types.ObjectId(req.auth.id),
                title: req.body.title,
                description: req.body.description,
                dueDate: req.body.dueDate,
                status: req.body.status,
                priority: req.body.priority,
            }


            const newTask = await this.taskService.updateTask(new mongoose.Types.ObjectId(taskId), task as Task);

            res.status(200).json({
                task: newTask,
                message: "Task updated successfully"
            });

        } catch (error) {
            next(error);
        }
    }

    async deleteTask(req: AuthenticateReq, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id: taskId } = req.params;
            const isValidTask = await this.taskService.findValidTaskByUserId(taskId, req.auth.id);

            if (!isValidTask) {
                next(createHttpError(404, "Invalid task"))
                return;
            }
            await this.taskService.deleteTask(new mongoose.Types.ObjectId(taskId));

            res.status(200).json({
                message: "Task deleted successfully"
            })

        } catch (error) {
            next(error);
        }
    }

}


export default TaskController