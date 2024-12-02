const { validateRequiredFields } = require("../utils/validation");

/**
 * Middleware to validate category data in the request body.
 */
function validateCategory(req, res, next) {
    try {
        const { name, userId } = req.body;

        // Validate required fields
        validateRequiredFields({ fieldName: "name", value: name });
        validateRequiredFields({ fieldName: "userId", value: userId });

        // Ensure the category name is a valid non-empty string
        if (typeof name !== "string" || name.trim().length === 0) {
            throw new Error("Category name must be a non-empty string.");
        }

        // Ensure the userId is a valid non-empty string
        if (typeof userId !== "string" || userId.trim().length === 0) {
            throw new Error("User ID must be a non-empty string.");
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { validateCategory };
