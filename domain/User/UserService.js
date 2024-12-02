const axios = require("axios");
const User = require("./User");

const apiUrl = process.env.API_URL || "http://localhost:3000";

class UserService {
    constructor() {}

    // Create a new user and add it to db.json
    async createUser(userData) {
        try {
            const user = new User(userData.id, userData.username);
            const response = await axios.post(`${apiUrl}/users`, user);

            if (response.status === 201) {
                return response.data;
            } else {
                throw new Error(`Failed to create user: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error in createUser: ${error.message}`);
            throw new Error(`Failed to create user in the database: ${error.message}`);
        }
    }

    // Get a user by ID
    async getUserById(userId) {
        try {
            const response = await axios.get(`${apiUrl}/users/${userId}`);

            if (response.data) {
                return response.data;
            } else {
                throw new Error(`User with ID ${userId} not found.`);
            }
        } catch (error) {
            console.error(`Error in getUserById: ${error.message}`);
            throw new Error(`Failed to retrieve user: ${error.message}`);
        }
    }

    // Add a category to a user
    async addCategoryToUser(userId, categoryId) {
        try {
            const user = await this.getUserById(userId);

            if (!user.categories) {
                user.categories = []; // Ensure categories is an array
            }

            if (user.categories.includes(categoryId)) {
                throw new Error(`Category with ID ${categoryId} already exists for the user.`);
            }

            user.categories.push(categoryId);

            const response = await axios.put(`${apiUrl}/users/${userId}`, user);
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Failed to add category: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error in addCategoryToUser: ${error.message}`);
            throw new Error(`Failed to add category to user: ${error.message}`);
        }
    }

    // Remove a category from a user
    async removeCategoryFromUser(userId, categoryId) {
        try {
            const user = await this.getUserById(userId);

            if (!user.categories || !user.categories.includes(categoryId)) {
                throw new Error(`Category with ID ${categoryId} does not exist for the user.`);
            }

            user.categories = user.categories.filter((id) => id !== categoryId);

            const response = await axios.put(`${apiUrl}/users/${userId}`, user);
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Failed to remove category: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error in removeCategoryFromUser: ${error.message}`);
            throw new Error(`Failed to remove category from user: ${error.message}`);
        }
    }
}

module.exports = UserService;
