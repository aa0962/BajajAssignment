var express = require('express');
var bfhlController = require('../controllers/bfhlController');

// Create a router
var router = express.Router();

// Define GET and POST routes
router.get('/', bfhlController.getOperationCode);
router.post('/', bfhlController.handlePostRequest);

module.exports = router;
