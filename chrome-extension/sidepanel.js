import { createClient } from '@supabase/supabase-js'
import { config } from './config.js'

// Initialize Supabase client
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY)

// State
let currentTab = 'recent'
let currentUser = null
let userGroups = []
let userPrompts = []

// Authentication
async function checkAuth() {
  // Check auth status through background script
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'CHECK_AUTH' }, async (response) => {
      if (response.isAuthenticated) {
        // Get the user data from Supabase
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) {
          console.error('Error getting user:', error.message)
          resolve(false)
          return
        }
        currentUser = user
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

// UI State Management
function showLoadingState() {
  document.getElementById('loading-state').style.display = 'flex'
  document.getElementById('auth-state').style.display = 'none'
  document.getElementById('main-content').style.display = 'none'
}

function showAuthState() {
  document.getElementById('loading-state').style.display = 'none'
  document.getElementById('auth-state').style.display = 'flex'
  document.getElementById('main-content').style.display = 'none'
}

function showMainContent() {
  document.getElementById('loading-state').style.display = 'none'
  document.getElementById('auth-state').style.display = 'none'
  document.getElementById('main-content').style.display = 'flex'
}

// Data Fetching
async function fetchUserGroups() {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('user_id', currentUser.id)
  
  if (error) {
    console.error('Error fetching groups:', error.message)
    return
  }
  
  userGroups = data
  renderQuickAccessGroups()
}

async function fetchUserPrompts() {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('updated_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching prompts:', error.message)
    return
  }
  
  userPrompts = data
  renderPrompts()
}

// Event Listeners
function setupEventListeners() {
  console.log('Setting up event listeners');
  
  // Tab switching
  document.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const tabName = e.currentTarget.dataset.tab;
      switchTab(tabName);
    });
  });

  // Search functionality
  const searchInput = document.querySelector('input[type="text"]');
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterPrompts(searchTerm);
  });
}

// UI Rendering
function switchTab(tabName) {
  currentTab = tabName;
  
  // Update UI
  document.querySelectorAll('[data-tab]').forEach(tab => {
    const isActive = tab.dataset.tab === tabName;
    if (isActive) {
      tab.classList.add('bg-purple-100', 'text-purple-600');
      tab.classList.remove('text-gray-600', 'hover:bg-purple-100');
    } else {
      tab.classList.remove('bg-purple-100', 'text-purple-600');
      tab.classList.add('text-gray-600', 'hover:bg-purple-100');
    }
  });

  renderPrompts();
}

function renderQuickAccessGroups() {
  const container = document.getElementById('quick-access-groups')
  if (!container) return
  
  container.innerHTML = userGroups.map(group => `
    <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
      <div class="w-3 h-3 rounded-full ${group.color || 'bg-purple-400'}"></div>
      <div class="flex-1">
        <h3 class="text-sm font-medium text-gray-900">${group.name}</h3>
        <p class="text-xs text-gray-500">${group.prompt_count || 0} prompts</p>
      </div>
    </div>
  `).join('')
}

function renderPrompts(filteredPrompts = userPrompts) {
  const container = document.getElementById('prompts-container')
  if (!container) return
  
  container.innerHTML = filteredPrompts.map(prompt => `
    <div class="p-4 border-b border-gray-200 hover:bg-gray-50">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <span class="text-2xl">${prompt.icon || '📝'}</span>
          <div>
            <h3 class="text-sm font-medium text-gray-900">${prompt.title}</h3>
            <p class="text-xs text-gray-500">Last updated: ${new Date(prompt.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button onclick="toggleFavorite(${prompt.id})" class="text-gray-400 hover:text-yellow-400">
            ${prompt.is_favorite ? '★' : '☆'}
          </button>
          <button onclick="deletePrompt(${prompt.id})" class="text-gray-400 hover:text-red-500">
            🗑️
          </button>
        </div>
      </div>
    </div>
  `).join('')
}

function filterPrompts(searchTerm) {
  const filtered = userPrompts.filter(prompt => 
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  renderPrompts(filtered)
}

// Actions
async function toggleFavorite(promptId) {
  const prompt = userPrompts.find(p => p.id === promptId)
  if (!prompt) return
  
  const { error } = await supabase
    .from('prompts')
    .update({ is_favorite: !prompt.is_favorite })
    .eq('id', promptId)
  
  if (error) {
    console.error('Error toggling favorite:', error.message)
    return
  }
  
  await fetchUserPrompts()
}

async function deletePrompt(promptId) {
  const { error } = await supabase
    .from('prompts')
    .delete()
    .eq('id', promptId)
  
  if (error) {
    console.error('Error deleting prompt:', error.message)
    return
  }
  
  await fetchUserPrompts()
}

// Initialize
async function initialize() {
  console.log('Initializing...');
  showLoadingState();
  
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    console.log('Not authenticated, showing auth state');
    showAuthState();
    return;
  }
  
  console.log('Authenticated, loading data');
  await Promise.all([
    fetchUserGroups(),
    fetchUserPrompts()
  ]);
  
  showMainContent();
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  setupEventListeners();
  initialize();
});
