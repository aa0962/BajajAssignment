const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors'); // Import CORS
const app = express();
const PORT = process.env.PORT || 6060;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors({
    origin: 'http://localhost:3000' // Update this with your frontend URL
}));


// POST method
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    const user_id = "john_doe_17091999"; // Example User ID
    const email = "john@xyz.com"; // Example Email
    const roll_number = "ABCD123"; // Example Roll Number

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    
    // Get the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(item => item.match(/[a-z]/));
    const highest_lowercase_alphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets[lowercaseAlphabets.length - 1]] : [];

    // File handling
    let file_valid = false;
    let file_mime_type = null;
    let file_size_kb = null;

    if (file_b64) {
        // Decode base64 string
        const buffer = Buffer.from(file_b64, 'base64');
        file_valid = true;
        file_mime_type = 'application/octet-stream'; // Default MIME type; adjust based on your file type
        file_size_kb = (buffer.length / 1024).toFixed(2); // Size in KB
    }

    res.json({
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highest_lowercase_alphabet,
        file_valid: file_valid,
        file_mime_type: file_mime_type,
        file_size_kb: file_size_kb
    });
});

// GET method
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
