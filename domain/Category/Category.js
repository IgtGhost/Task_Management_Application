class Category {
    constructor({ id, name, userId }) {
        this.id = id; // Unique identifier for the category
        this.name = name; // Name of the category
        this.userId = userId; // ID of the user who owns this category
        this.tasks = []; // Array to hold task IDs associated with this category
    }

}

module.exports = Category
