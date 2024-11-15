const express = require("express");
const taskRoutes = require("./taskRoutes");
const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");

const router = express.Router();

// Route grouping
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
