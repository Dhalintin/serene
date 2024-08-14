const category_service = require('../services/category.service');
const handleValidationError = require('../utils/validation-error.util')

class CategoryController {
    /**
     * Get a category by ID
     *
     * @param {Object} req - The HTTP request object
     * @param {Object} res - The HTTP response object
     *
     * @returns {Promise} A promise that resolves to a JSON response
     *
     * @example
     * GET /categories/123
     *
     * Response:
     * {
     *   "status": "Success",
     *   "data": {
     *     "id": 123,
     *     "name": "Category Name",
     *     "description": "Category Description"
     *   }
     * }
     */
    async get_a_category(req, res) {
        const { id } = req.params;

        try {
            const category = await category_service.get_category(id);
            if (!category) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Category not found'
                });
            }
            if (category.length === 0) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Category not found'
                });
            }

            // fetch  the category by ID
            return res.status(200).send({
                status: 'Success',
                data: category
            });
        } catch (error) {
            if (error.name === "CastError") {
                return res.status(400).json({
                    status: 'Error',
                    message: 'Invalid Id format'
                });
                }
            return res.status(500).json({
                status: 'Error',
                message: 'Error getting category',
                error: error.message
            });
        }
    }

    async get_all_categories(req, res) {
        try {
            const data = await category_service.get_all_categories();
            if (!data) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Categories not found'
                });
            }
            if (data.length === 0) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Categories not found'
                });
            }
            res.status(200).json({
                length: data.length,
                data
            });
        } catch (e) {
            console.log(error.name);
            res.status(500).json({
                status: 'Error',
                message: error.message,
                name: error.name
            });
        }
    }

   async create_category(req, res) {
        const { name, desc } = req.body;

        
        try {
            const existing_category = await category_service.unique_name(name);
            
            if (existing_category) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Name already exists'
            });
            }
            
            const data = await category_service.create_category(name, desc);
            
            return res.status(201).json({
            status: 'Success',
            message: 'Category created successfully',
            data
            });
        } catch (e) {
           if (e.name === 'ValidationError') {
               if (handleValidationError(res, e, 'name')) return; 
               if (handleValidationError(res, e, 'desc')) return; 
             
           }
            
            console.error(e);
            return res.status(500).json({
            status: 'Error',
            message: 'An internal server error occurred'
            });
        }
   }
    
async  update_category(req, res) {
    const { id } = req.params;
    const { name, desc } = req.body;
    
    // Only include fields that are provided
    const data = {};
    if (name !== undefined) data.name = name;
    if (desc !== undefined) data.desc = desc;  

    // Check if there's any data to update
    if (Object.keys(data).length === 0) {
        return res.status(400).json({
        status: 'Error',
        message: 'No data provided for update'
        });
    }

    try {
        const update_cat = await category_service.update_category(id, data);
        
        if (update_cat) {
        return res.status(200).json({
            status: 'Success',
            message: 'Category updated successfully',
            data: update_cat
        });
        } else {
        return res.status(404).json({
            status: 'Error',
            message: 'Category not found'
        });
        }
    } catch (error) {
        console.error(error);  
        if (error.name === "CastError") {
        return res.status(400).json({
            status: 'Error',
            message: 'Invalid Id format'
        });
        }
        return res.status(500).json({
        status: 'Error',
        message: 'An error occurred while updating the category'
        });
    }
}
    
    async delete_category(req, res) {
        const { id } = req.params
        const id_exists = await category_service.get_category(id)
        
         if (!id_exists) {
             return res.status(404).json({
                 status: 'Fail',
                 message: `Category with such ID: ${id} does not exist`
             });
         }
        try {
           
            const delete_cat = await category_service.delete_category(id);
            if (delete_cat) { 
                return res.status(200).json({
                    status: 'Success',
                    message: 'Category deleted successfully'
                })
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 'Error',
                message: 'An error occurred while deleting the category'
            })
        }
    }
}

const category_controller = new CategoryController();
module.exports = category_controller;
