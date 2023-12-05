// ... (other code)

// Fetch authentication token from server (replace with actual server-side logic)
async function fetchAuthToken() {
    try {
        const response = await fetch('http://localhost:3000/getAuthToken', { mode: 'cors' });
        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('Error fetching authentication token:', error);
        return null;
    }
}

// Set HTTP-only cookie for authentication token
function setAuthTokenCookie(token) {
    document.cookie = `authToken=${token}; HttpOnly; SameSite=Strict; Secure`;
}

window.onload = async function () {
    const existingAuthToken = await fetchAuthToken();

    if (!existingAuthToken) {
        const authToken = uuidv4();
        console.log('Authentication Token:', authToken);
        setAuthTokenCookie(authToken);
    } else {
        console.log('Existing Authentication Token:', existingAuthToken);

        if (existingAuthToken === '56229b83-c7f7-467e-8e28-93a0ec01ed5c') {
            alert('Welcome Admin');
            const adminElement = document.querySelector('.admin-section');
            if (adminElement) {
                adminElement.style.display = 'block';
                localStorage.removeItem('adminSectionRemoved');
            } else {
                console.error('Admin element not found in the document');
            }
        }
    }
};
