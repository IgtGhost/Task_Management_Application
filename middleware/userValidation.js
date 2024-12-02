const { validateRequiredFields } = require("../utils/validation");

/**
 * Middleware to validate user data in the request body.
 */
function validateUser(req, res, next) {
    try {
        const { id, username } = req.body;

        // Validate required fields
        validateRequiredFields({ fieldName: "id", value: id });
        validateRequiredFields({ fieldName: "username", value: username });

        // Ensure the username is a valid string
        if (typeof username !== "string" || username.trim().length === 0) {
            throw new Error("Username must be a non-empty string.");
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Middleware to validate category data when adding or removing categories for a user.
 */
function validateCategoryForUser(req, res, next) {
    try {
        const { categoryId } = req.body;

        // Validate required fields
        validateRequiredFields({ fieldName: "categoryId", value: categoryId });

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { validateUser, validateCategoryForUser };
