const express = require("express");
const TaskService = require("../domain/Task/TaskService");
const { validateTask } = require("../middlewares/taskValidation");

const taskRouter = express.Router();

// Route to create a new task
taskRouter.post("/", validateTask, async (req, res) => {
    try {
        const task = await TaskService.createTask(req.body);
        res.status(201).json({
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            error: `Failed to create task: ${error.message}`,
        });
    }
});

// Route to get tasks by user ID
taskRouter.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await TaskService.getTasksByUserId(userId);
        res.status(200).json({
            message: `Tasks retrieved successfully for user ID: ${userId}`,
            tasks,
        });
    } catch (error) {
        res.status(500).json({
            error: `Failed to retrieve tasks: ${error.message}`,
        });
    }
});

// Route to mark a task as complete
taskRouter.patch("/:taskId/complete", async (req, res) => {
    try {
        const { taskId } = req.params;
        const updatedTask = await TaskService.completeTask(taskId);
        res.status(200).json({
            message: `Task marked as complete`,
            task: updatedTask,
        });
    } catch (error) {
        res.status(500).json({
            error: `Failed to mark task as complete: ${error.message}`,
        });
    }
});

// Route to update a task
taskRouter.patch("/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const updatedTask = await TaskService.updateTask(taskId, req.body);
        res.status(200).json({
            message: `Task updated successfully`,
            task: updatedTask,
        });
    } catch (error) {
        res.status(500).json({
            error: `Failed to update task: ${error.message}`,
        });
    }
});

module.exports = taskRouter;
