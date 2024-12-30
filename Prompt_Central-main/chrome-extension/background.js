import { createClient } from '@supabase/supabase-js';
import { config } from './config.js';

// Initialize Supabase client
const supabase = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_ANON_KEY
);

// Create context menu items
chrome.runtime.onInstalled.addListener(() => {
  // Create parent menu item
  chrome.contextMenus.create({
    id: 'promptArrayMenu',
    title: 'Prompt[Array]',
    contexts: ['selection']
  });

  // Create child menu items
  chrome.contextMenus.create({
    id: 'savePrompt',
    parentId: 'promptArrayMenu',
    title: 'Save as New Prompt',
    contexts: ['selection']
  });

  chrome.contextMenus.create({
    id: 'usePrompt',
    parentId: 'promptArrayMenu',
    title: 'Use in ChatGPT',
    contexts: ['selection']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const selectedText = info.selectionText;

  switch (info.menuItemId) {
    case 'savePrompt':
      // Check authentication
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        chrome.tabs.create({ url: `${config.WEBSITE_URL}/signin` });
        return;
      }

      // Save the prompt
      const { data, error } = await supabase
        .from('prompts')
        .insert([
          {
            title: selectedText.substring(0, 50) + '...',
            content: selectedText,
            user_id: session.user.id,
            is_public: false
          }
        ]);

      if (error) {
        console.error('Error saving prompt:', error);
      }
      break;

    case 'usePrompt':
      // Send message to content script to use the prompt in ChatGPT
      chrome.tabs.sendMessage(tab.id, {
        action: 'usePrompt',
        prompt: selectedText
      });
      break;
  }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // Toggle the side panel
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleSidePanel' });
  });
});

// Set the side panel options
chrome.sidePanel.setPanel({ panel: 'side_panel.html' });
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handle messages here
  return true;
});
