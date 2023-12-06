window.onload = async function fetchAuthToken() {
    try {
        const authToken = getCookie('authToken');
        if (authToken) {
            console.log(`Existing user with this ${authToken} token.`);
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

// Function to get the value of a cookie by name
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

// Set HTTP-only cookie for authentication token
function setAuthTokenCookie(token) {
    document.cookie = `authToken=${token}; HttpOnly; SameSite=Strict; Secure`;
}

function checkAndRemoveElement(elementId) {
    const removed = JSON.parse(localStorage.getItem(`${elementId}Removed`)) || false;
    if (removed) {
        const element = document.querySelector(`.${elementId}`);
        element.remove();
    }
}
