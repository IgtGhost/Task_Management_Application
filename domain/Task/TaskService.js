const axios = require("axios");
const Task = require("./Task");

const apiUrl = process.env.API_URL || "http://localhost:3000";

class TaskService {
    constructor() {}

    // Create a new task
    async createTask(taskData) {
        try {
            const task = new Task(
                taskData.id,
                taskData.title,
                taskData.description,
                taskData.dueDate,
                taskData.priority,
                taskData.isComplete
            );
            const response = await axios.post(`${apiUrl}/tasks`, task);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to create task: ${error.message}`);
        }
    }

    // Complete a task
    async completeTask(taskId) {
        try {
            const response = await axios.patch(`${apiUrl}/tasks/${taskId}`, {
                isComplete: true,
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to complete task: ${error.message}`);
        }
    }

    // Update task details
    async updateTask(taskId, updatedData) {
        try {
            const response = await axios.patch(`${apiUrl}/tasks/${taskId}`, updatedData);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update task: ${error.message}`);
        }
    }
}

module.exports = TaskService;
