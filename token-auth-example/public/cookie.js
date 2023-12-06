// © 2023 Trincher Oleksandr. All rights reserved.

// For inquiries related to copyright or coding issues, kindly contact Trincher Oleksandr via Discord at 'oleksandrtrincher.

// This website is intended solely for research purposes. All individuals with access to 
// this website are considered part of a designated team or have provided explicit 
// agreement to comply with all activities and content on this platform. By accessing and 
// using this website, users implicitly acknowledge their affiliation with the project or their 
// consent to participate in and adhere to the terms outlined herein.

// Function to get the value of a cookie by name
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

// Set cookie for authentication token
function setAuthTokenCookie(token) {
    document.cookie = `authToken=${token}; HttpOnly; SameSite=Strict; Secure`;
}

// Function to check and remove an element by ID
function checkAndRemoveElement(elementId) {
    const removed = JSON.parse(localStorage.getItem(`${elementId}Removed`)) || false;
    if (removed) {
        const element = document.querySelector(`#${elementId}`);
        if (element) {
            element.remove();
        }
    }
}

// Function to fetch or create an authentication token
async function fetchAuthToken() {
    try {
        const authToken = getCookie('authToken');
        if (authToken) {
            console.log(`Existing user with this ${authToken} token.`);
            // Check for the specific token and welcome the user
            if (authToken === '56229b83-c7f7-467e-8e28-93a0ec01ed5c') {
                console.log('Welcome Alex');

                window.checkToken = checkToken;
                // Fetch all issued tokens from the server
                fetchAllTokens();

                function checkToken(tokenToCheck) {
                    fetch('http://localhost:3000/getAllTokens')
                        .then(response => response.json())
                        .then(data => {
                            const deviceInfo = data.tokens[tokenToCheck];
                            if (data.tokens.includes(tokenToCheck)) {
                                console.log('OK - Device:', deviceInfo);
                            } else {
                                console.log('ERROR');
                            }
                        })
                        .catch(error => console.error('Error:', error));
                }
            }
            return authToken;
        } else {
            // If the cookie is not present, fetch a new token
            const response = await fetch('http://localhost:3000/getAuthToken', { mode: 'cors' });
            const data = await response.json();
            setAuthTokenCookie(data.token); // Set the new token only if it doesn't exist
            console.log(`New user received this ${data.token} token.`);
            return data.token;
        }
    } catch (error) {
        console.error('Error fetching/authentication token:', error);
        return null;
    }
}

// Function to fetch all issued tokens from the server
async function fetchAllTokens() {
    try {
        const response = await fetch('http://localhost:3000/getAllTokens', { mode: 'cors' });
        const data = await response.json();
        console.log('All issued tokens:', data.tokens);
    } catch (error) {
        console.error('Error fetching all tokens:', error);
    }
}

// Function to check a token entered in the console

// Assign the fetchAuthToken function to window.onload
window.onload = fetchAuthToken;
