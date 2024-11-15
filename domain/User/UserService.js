const axios = require("axios");
const User = require("./User");

const apiUrl = process.env.API_URL || "http://localhost:5000";

class UserService {
    constructor() {}

    // Create a new user
    async createUser(userData) {
        try {
            const user = new User(userData.id, userData.username);
            const response = await axios.post(`${apiUrl}/users`, user);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    // Get a user by ID
    async getUserById(userId) {
        try {
            const response = await axios.get(`${apiUrl}/users/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error(`User with ID ${userId} not found.`);
        }
    }

    // Add a category to a user
    async addCategoryToUser(userId, categoryId) {
        try {
            const user = await this.getUserById(userId);
            user.categories.push(categoryId);
            const response = await axios.put(`${apiUrl}/users/${userId}`, user);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to add category to user: ${error.message}`);
        }
    }

    // Remove a category from a user
    async removeCategoryFromUser(userId, categoryId) {
        try {
            const user = await this.getUserById(userId);
            user.categories = user.categories.filter((id) => id !== categoryId);
            const response = await axios.put(`${apiUrl}/users/${userId}`, user);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to remove category from user: ${error.message}`);
        }
    }
}

module.exports = UserService;
