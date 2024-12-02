const express = require("express");
const UserService = require("../domain/User/UserService");
const { validateUser } = require("../middleware/userValidation");

const userRouter = express.Router();

// Create a new user
userRouter.post("/", validateUser, async (req, res) => {
    try {
        const userService = new UserService();
        const user = await userService.createUser(req.body);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a user by ID
userRouter.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const userService = new UserService();
        const user = await userService.getUserById(userId);
        res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Add a category to a user
userRouter.patch("/:userId/categories", async (req, res) => {
    try {
        const { userId } = req.params;
        const { categoryId } = req.body;

        if (!categoryId) {
            return res.status(400).json({ error: "Category ID is required" });
        }

        const userService = new UserService();
        const user = await userService.addCategoryToUser(userId, categoryId);
        res.status(200).json({ message: "Category added to user", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove a category from a user
userRouter.delete("/:userId/categories/:categoryId", async (req, res) => {
    try {
        const { userId, categoryId } = req.params;

        const userService = new UserService();
        const user = await userService.removeCategoryFromUser(userId, categoryId);
        res.status(200).json({ message: "Category removed from user", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = userRouter;
