import Task from "../models/Task";
import User from "../models/User";
import { Task as ITask, PaginationData } from "../types/index"

class AdminService {
    constructor(private taskRepository: typeof Task, private userRepository: typeof User) { }

    async assignTask(taskData: ITask) {
        return await this.taskRepository.create(taskData)
    }

    async fetchUsers({ page, limit, orderBy }: PaginationData) {
        return await this.userRepository.find({})
            .skip((+page - 1) * +limit)
            .limit(+limit)
            .sort({ name: orderBy === "asc" ? 1 : -1 })
    }
}


export default AdminService;