import { createClient } from '@supabase/supabase-js';
import { config } from './config.js';

console.log('Background script loaded');

// Initialize Supabase client
const supabase = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_ANON_KEY
);

// Listen for auth changes from the website
chrome.cookies.onChanged.addListener(({ cookie, removed }) => {
  console.log('Cookie changed:', cookie);
  if (cookie.domain === 'promptarray.ai' && cookie.name === 'sb-auth-token' && !removed) {
    // Update the extension's auth state
    chrome.storage.local.set({ 'authToken': cookie.value });
  }
});

// Handle messages from content script or side panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message);
  
  if (message.type === 'SIGNIN') {
    console.log('Opening signin page');
    chrome.tabs.create({ 
      url: config.SIGNIN_URL 
    });
    return true;
  }
  
  if (message.type === 'CHECK_AUTH') {
    // Check if we have a valid auth token
    chrome.cookies.get({
      url: 'https://www.promptarray.ai',
      name: 'sb-auth-token'
    }, (cookie) => {
      if (cookie) {
        chrome.storage.local.set({ 'authToken': cookie.value });
        sendResponse({ isAuthenticated: true });
      } else {
        chrome.storage.local.remove('authToken');
        sendResponse({ isAuthenticated: false });
      }
    });
    return true;
  }
  
  return true;
});
