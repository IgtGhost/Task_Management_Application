const express = require("express");
const CategoryService = require("../domain/Category/CategoryService");
const { validateCategory } = require("../middleware/categoryValidation");

const categoryRouter = express.Router();

// Create a new category
categoryRouter.post("/", validateCategory, async (req, res) => {
    try {
        const categoryService = new CategoryService();
        const category = await categoryService.createCategory(req.body);
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a task to a category
categoryRouter.patch("/:categoryId/tasks", async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { taskId } = req.body;

        if (!taskId) {
            return res.status(400).json({ error: "Task ID is required" });
        }

        const categoryService = new CategoryService();
        const updatedCategory = await categoryService.addTaskToCategory(categoryId, taskId);
        res.status(200).json({ message: "Task added to category", category: updatedCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all categories
categoryRouter.get("/", async (req, res) => {
    try {
        const categoryService = new CategoryService();
        const categories = await categoryService.getAllCategories();
        res.status(200).json({ message: "Categories retrieved successfully", categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = categoryRouter;
