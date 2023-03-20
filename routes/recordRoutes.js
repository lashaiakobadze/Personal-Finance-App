const express = require('express');

const authController = require('./../controllers/authController');
const recordController = require('./../controllers/recordController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Add a new record and Get all records for a user
router
  .route('/')
  .post(recordController.createRecord)
  .get(recordController.getAllRecords);

// Update category
router.route('/:id').patch(recordController.updateRecord);

module.exports = router;
