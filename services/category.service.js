const Category = require('../models/category.model');

class CategoryService {
    /**
     * Retrieves a category by its ID.
     *
     * @param {number} category_id - The ID of the category to retrieve.
     * @returns {Promise<Category>} - A promise that resolves to the category object.
     *
     * @example
     * const category = await getCategory(1);
     * console.log(category.name); // Output: "Electronics"
     */

    async get_category(category_id) {
        const category = await Category.findById(category_id);
        return category;
    }

    async get_all_categories() {
        const categories = await Category.find();
        return categories;
    }

    async create_category(name, desc) {
        const category = await Category.create({ name, desc });
        return category;
    }

    async unique_name(name) {
        const existingCategory = await Category.findOne({ name });
        return existingCategory !== null;
    }

    async update_category(category_id, updates) {
        const updateObject = {};

        if (updates.name !== undefined) {
            updateObject.name = updates.name;
        }

        if (updates.desc !== undefined) {
            updateObject.desc = updates.desc;
        }

        const updatedCategory = await Category.findByIdAndUpdate(category_id, { $set: updateObject }, { new: true });

        return updatedCategory !== null;
    }

    async delete_category(category_id) {
        return await Category.findByIdAndDelete(category_id);
    }
}

const category_service = new CategoryService();
module.exports = category_service;
