// © 2023 Trincher Oleksandr. All rights reserved.

// For inquiries related to copyright or coding issues, kindly contact Trincher Oleksandr via Discord at 'oleksandrtrincher.

// This website is intended solely for research purposes. All individuals with access to 
// this website are considered part of a designated team or have provided explicit 
// agreement to comply with all activities and content on this platform. By accessing and 
// using this website, users implicitly acknowledge their affiliation with the project or their 
// consent to participate in and adhere to the terms outlined herein.

const express = require('express');
const cors = require('cors');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

let issuedTokens = {};

app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// Set headers for all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/getAuthToken', (req, res) => {
    const authToken = uuid.v4();
    const deviceInfo = req.headers['user-agent'];
    issuedTokens[authToken] = deviceInfo;
    res.json({ token: authToken, device: deviceInfo });
});

app.get('/getAllTokens', (req, res) => {
    res.json({ tokens: issuedTokens });
});

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
