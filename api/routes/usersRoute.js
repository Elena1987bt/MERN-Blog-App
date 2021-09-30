const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router
  .route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
