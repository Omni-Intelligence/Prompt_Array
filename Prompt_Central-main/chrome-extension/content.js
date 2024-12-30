// Function to inject prompt into ChatGPT's input field
function injectPrompt(prompt) {
  const textarea = document.querySelector('textarea[data-id="root"]');
  if (textarea) {
    // Set the value and trigger input event
    textarea.value = prompt;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    
    // Focus the textarea
    textarea.focus();
    
    // Optional: Automatically submit the prompt
    const submitButton = textarea.nextElementSibling;
    if (submitButton) {
      submitButton.click();
    }
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'usePrompt') {
    injectPrompt(request.prompt);
  }
  return true;
});

// Create floating button
function createFloatingButton() {
  const button = document.createElement('button');
  button.className = 'prompt-array-button';
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 5V19M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  
  const panel = document.createElement('div');
  panel.className = 'prompt-array-panel';
  
  button.addEventListener('click', () => {
    panel.classList.toggle('show');
  });
  
  document.body.appendChild(button);
  document.body.appendChild(panel);
  
  return { button, panel };
}

// Initialize
createFloatingButton();
