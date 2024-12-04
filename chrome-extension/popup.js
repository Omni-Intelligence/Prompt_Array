import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with your existing credentials
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// DOM Elements
const authStatus = document.getElementById('auth-status');
const content = document.getElementById('content');

// Check authentication status
async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    showDashboard();
  } else {
    showLoginButton();
  }
}

// Show login button
function showLoginButton() {
  authStatus.innerHTML = `
    <button class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
      Sign In
    </button>
  `;
  content.innerHTML = '<p class="text-center">Please sign in to access your prompts</p>';
  
  authStatus.querySelector('button').addEventListener('click', () => {
    // Open main website login page
    chrome.tabs.create({ url: 'YOUR_WEBSITE_URL/signin' });
  });
}

// Show dashboard content
async function showDashboard() {
  // Fetch user's prompts and groups
  const { data: prompts, error: promptsError } = await supabase
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: groups, error: groupsError } = await supabase
    .from('groups')
    .select('*')
    .order('created_at', { ascending: false });

  if (promptsError || groupsError) {
    content.innerHTML = '<p class="text-red-500">Error loading content</p>';
    return;
  }

  // Render content
  content.innerHTML = `
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold">Quick Access</h2>
        <button id="newPrompt" class="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 text-sm">
          New Prompt
        </button>
      </div>
      <div class="grid grid-cols-2 gap-2">
        ${groups.slice(0, 4).map(group => `
          <div class="p-3 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer">
            <h3 class="font-medium truncate">${group.name}</h3>
          </div>
        `).join('')}
      </div>
      <div class="space-y-2">
        <h2 class="text-lg font-semibold">Recent Prompts</h2>
        ${prompts.slice(0, 5).map(prompt => `
          <div class="p-3 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer">
            <h3 class="font-medium truncate">${prompt.title}</h3>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Add event listeners
  document.getElementById('newPrompt').addEventListener('click', () => {
    chrome.tabs.create({ url: 'YOUR_WEBSITE_URL/new-prompt' });
  });

  // Add click handlers for prompts and groups
  document.querySelectorAll('.cursor-pointer').forEach(element => {
    element.addEventListener('click', () => {
      chrome.tabs.create({ url: 'YOUR_WEBSITE_URL/dashboard' });
    });
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', checkAuth);
