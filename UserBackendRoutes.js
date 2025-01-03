<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define user routes
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

=======
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define user routes
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

>>>>>>> f96cd300ce63ab6e97d82b915d97ec530bc203d3
module.exports = router;