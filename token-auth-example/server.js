const express = require('express');
const uuid = require('uuid');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to allow CORS
app.use(cors({ origin: 'http://127.0.0.1:5500' })); // Specify the exact origin

// Endpoint to generate and return a new authentication token
app.get('/getAuthToken', (req, res) => {
    const authToken = uuid.v4();
    res.json({ token: authToken });
});

// Serve static files (replace 'public' with your actual directory containing HTML, CSS, and JS files)
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
