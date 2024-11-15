const axios = require("axios");
const Category = require("./Category");

const apiUrl = process.env.API_URL || "http://localhost:5000";

class CategoryService {
    constructor() {}

    // Method to create a new category
    async createCategory(categoryData) {
        try {
            const category = new Category(categoryData);
            const response = await axios.post(`${apiUrl}/categories`, category);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to create category: ${error.message}`);
        }
    }

    // Method to add a task to a category
    async addTaskToCategory(categoryId, taskId) {
        try {
            const response = await axios.patch(`${apiUrl}/categories/${categoryId}`, {
                $push: { tasks: taskId },
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to add task to category: ${error.message}`);
        }
    }
}

module.exports = CategoryService;
