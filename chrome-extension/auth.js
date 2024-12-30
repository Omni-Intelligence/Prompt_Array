// Handle login button click
function setupLoginButton() {
    console.log('Setting up login button');
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        console.log('Found login button');
        loginButton.addEventListener('click', () => {
            console.log('Login button clicked');
            // Add return_to parameter to help with redirect after login
            const returnUrl = encodeURIComponent('https://www.promptarray.ai/dashboard');
            const loginUrl = `https://www.promptarray.ai/signin?return_to=${returnUrl}`;
            chrome.tabs.create({ url: loginUrl });
        });
    } else {
        console.error('Login button not found');
    }
}

// Initialize auth when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Auth.js: DOM loaded');
    setupLoginButton();
});
