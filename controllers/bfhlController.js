var multer = require('multer');

// Multer configuration for handling file upload
var storage = multer.memoryStorage();
var upload = multer({ storage: storage }).single('file_b64');

// GET: Operation Code
exports.getOperationCode = function (req, res) {
    return res.status(200).json({
        operation_code: 1
    });
};

// POST: Handle request data and file
exports.handlePostRequest = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({ is_success: false, message: 'File upload error' });
        }

        var { data, file_b64 } = req.body;

        if (!data) {
            return res.status(400).json({ is_success: false, message: 'Data is required' });
        }

        // Separate numbers and alphabets from input
        var numbers = [];
        var alphabets = [];
        var highestLowercaseAlphabet = '';

        data.forEach(function (item) {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (/^[a-zA-Z]$/.test(item)) {
                alphabets.push(item);
                if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        });

        // File handling logic
        var fileValid = false;
        var fileMimeType = '';
        var fileSizeKb = 0;

        if (req.file) {
            fileValid = true;
            fileMimeType = req.file.mimetype;
            fileSizeKb = (req.file.size / 1024).toFixed(2); // Convert bytes to KB
        }

        // Prepare response
        return res.status(200).json({
            is_success: true,
            user_id: 'john_doe_17091999',  // Replace with dynamic data if needed
            email: 'john@xyz.com',
            roll_number: 'ABCD123',
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
            file_valid: fileValid,
            file_mime_type: fileMimeType,
            file_size_kb: fileSizeKb
        });
    });
};
