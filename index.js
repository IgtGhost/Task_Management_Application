const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes"); // Import routes from the routes/index.js
require("dotenv").config(); // Load environment variables

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Mount the routes
app.use("/", routes); // Prefix all routes with `/api`

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the Task Management API!");
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
