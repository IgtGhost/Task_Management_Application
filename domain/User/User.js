class User {
    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.categories = []; // Array of category IDs owned by the user
    }

    // Method to add a category for this user
    addCategory(categoryId) {
        if (!this.categories.includes(categoryId)) {
            this.categories.push(categoryId);
        } else {
            throw new Error(`Category with ID ${categoryId} already exists for this user.`);
        }
    }

    // Method to remove a category
    removeCategory(categoryId) {
        const index = this.categories.indexOf(categoryId);
        if (index !== -1) {
            this.categories.splice(index, 1);
        } else {
            throw new Error(`Category with ID ${categoryId} does not exist.`);
        }
    }
}

module.exports = User;
