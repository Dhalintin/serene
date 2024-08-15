const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/category.controller')


router.route('/:id')
    .get(category_controller.get_a_category)
    .patch(category_controller.update_category)
    .delete(category_controller.delete_category)

router.route('/')
    .get(category_controller.get_all_categories)
    .post(category_controller.create_category)
    

module.exports = router