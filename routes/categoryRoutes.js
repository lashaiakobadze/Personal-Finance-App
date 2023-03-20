const express = require('express');

const authController = require('./../controllers/authController');
const categoryController = require('./../controllers/categoryController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Create a new category
router.post('/', categoryController.createCategory);

// Rename a category and Delete a category
router
  .route('/:id')
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
