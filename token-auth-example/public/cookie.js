// Function to get the value of a cookie by name
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

// Set cookie for authentication token
function setAuthTokenCookie(token) {
    document.cookie = `authToken=${token}; SameSite=Strict; Secure`;
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
                // Fetch all issued tokens from the server
                fetchAllTokens();
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

// Assign the fetchAuthToken function to window.onload
window.onload = fetchAuthToken;
