import { model, Schema } from "mongoose"
import { Task } from "../types";

const taskSchema = new Schema<Task>({
    assignedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["To Do", "In Progress", "Completed"],
        default: "To Do"
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
        default: "High"
    }
}, {
    timestamps: true
})


const Task = model<Task>("Task", taskSchema)
export default Task;