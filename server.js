require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var bfhlRoutes = require('./routes/bfhlRoutes');

// Create express app
var app = express();
var port = process.env.PORT || 6060;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/bfhl', bfhlRoutes);

// Start server
app.listen(port, function() {
    console.log('Server is running on port ' + port);
});
