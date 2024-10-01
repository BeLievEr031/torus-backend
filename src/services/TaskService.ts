import { Types } from "mongoose";
import Task from "../models/Task";
import { Task as ITask, PaginationData } from "../types";
import mongoose from "mongoose"

class TaskService {
    constructor(private taskRepository: typeof Task) { }
    async addTask(task: ITask) {
        return await this.taskRepository.create(task);
    }

    async fetchTask({ userid, page, limit, orderBy }: PaginationData & { userid: Types.ObjectId }) {
        return await this.taskRepository.find({ assignedUser: userid })
            .skip((+page - 1) * +limit)
            .limit(+limit)
            .sort({ createdAt: orderBy === "asc" ? 1 : -1 })
    }

    async updateTask(id: Types.ObjectId, task: ITask) {
        return await this.taskRepository.updateOne({ _id: id }, task, { new: true });
    }

    async deleteTask(id: Types.ObjectId) {
        return await this.taskRepository.findByIdAndDelete(id);
    }

    async findTaskByUserId(id: string) {
        return await this.taskRepository.findOne({ assignedUser: id })
    }

    async findValidTaskByUserId(taskId: string, userId: string) {
        return await this.taskRepository.findOne({ $and: [{ _id: new mongoose.Types.ObjectId(taskId) }, { assignedUser: new mongoose.Types.ObjectId(userId) }, { creatorId: new mongoose.Types.ObjectId(userId) }] })
    }

}


export default TaskService;