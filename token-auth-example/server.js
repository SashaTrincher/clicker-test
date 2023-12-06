const express = require('express');
const cors = require('cors');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Array to store issued tokens
let issuedTokens = [];

// Middleware to allow CORS
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// Set headers for all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/getAuthToken', (req, res) => {
    const authToken = uuid.v4();
    issuedTokens.push(authToken); // Store the issued token
    res.json({ token: authToken });
});

// Endpoint to get all issued tokens
app.get('/getAllTokens', (req, res) => {
    res.json({ tokens: issuedTokens });
});

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});