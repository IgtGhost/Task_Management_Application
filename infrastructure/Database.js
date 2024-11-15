const axios = require("axios");

class Database {
    constructor(apiUrl) {
        this.apiUrl = apiUrl || process.env.API_URL || "http://localhost:5000";
    }

    async get(collection, query = {}) {
        try {
            const queryString = new URLSearchParams(query).toString();
            const response = await axios.get(`${this.apiUrl}/${collection}?${queryString}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch data from ${collection}: ${error.message}`);
        }
    }

    async create(collection, data) {
        try {
            const response = await axios.post(`${this.apiUrl}/${collection}`, data);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to create record in ${collection}: ${error.message}`);
        }
    }

    async update(collection, id, data) {
        try {
            const response = await axios.patch(`${this.apiUrl}/${collection}/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update record in ${collection}: ${error.message}`);
        }
    }

    async delete(collection, id) {
        try {
            const response = await axios.delete(`${this.apiUrl}/${collection}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to delete record in ${collection}: ${error.message}`);
        }
    }
}

module.exports = new Database();
