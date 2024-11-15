const { validateRequiredFields } = require("../utils/validation");

function validateTask(req, res, next) {
    try {
        const { title, description, dueDate, userId, priority } = req.body;

        // Validate required fields
        validateRequiredFields({ fieldName: "title", value: title });
        validateRequiredFields({ fieldName: "description", value: description });
        validateRequiredFields({ fieldName: "dueDate", value: dueDate });
        validateRequiredFields({ fieldName: "userId", value: userId });

        // Validate priority field if provided
        const validPriorities = ["low", "normal", "high"];
        if (priority && !validPriorities.includes(priority)) {
            throw new Error(`Invalid priority value. Allowed values are: ${validPriorities.join(", ")}`);
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { validateTask };
