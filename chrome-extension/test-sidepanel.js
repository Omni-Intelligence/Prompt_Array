console.log('Script starting');
document.getElementById('debug').textContent = 'Script loaded';

function handleClick() {
    console.log('Button clicked');
    document.getElementById('debug').textContent = 'Button clicked';
    try {
        chrome.tabs.create({ url: 'https://www.promptarray.ai/signin' });
        document.getElementById('debug').textContent += ' - Opened tab';
    } catch (error) {
        document.getElementById('debug').textContent += ' - Error: ' + error.message;
        console.error('Error:', error);
    }
}

// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const button = document.getElementById('login-button');
    if (button) {
        console.log('Button found');
        button.addEventListener('click', handleClick);
    } else {
        console.error('Button not found');
    }
});
