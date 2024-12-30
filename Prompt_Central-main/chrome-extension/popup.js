// State
let currentTab = 'recent';
let sidebarCollapsed = false;

// Mock Data
const quickAccessGroups = [
  { id: 1, name: 'Web Dev', promptCount: '12 prompts', color: 'bg-purple-400' },
  { id: 2, name: 'Podcasts', promptCount: '8 prompts', color: 'bg-blue-400' },
  { id: 3, name: 'Social Media', promptCount: '15 prompts', color: 'bg-green-400' },
  { id: 4, name: 'Business Strategy', promptCount: '10 prompts', color: 'bg-orange-400' },
  { id: 5, name: 'Email Marketing', promptCount: '6 prompts', color: 'bg-pink-400' }
];

const prompts = [
  {
    id: 1,
    title: 'Financial Analysis Prompt',
    lastUpdated: '12/12/2024',
    isFavorite: false,
    icon: '📊'
  },
  {
    id: 2,
    title: 'Email template',
    lastUpdated: '12/12/2024',
    isFavorite: true,
    icon: '📧'
  },
  {
    id: 3,
    title: 'Social Post',
    lastUpdated: '12/12/2024',
    isFavorite: false,
    icon: '📱'
  },
  {
    id: 4,
    title: 'Main - Email Broadcasts',
    lastUpdated: '12/11/2024',
    isFavorite: false,
    icon: '📢'
  },
  {
    id: 5,
    title: 'EDNA details',
    lastUpdated: '12/6/2024',
    isFavorite: false,
    icon: '📝'
  },
  {
    id: 6,
    title: 'Project Proposal',
    lastUpdated: '12/6/2024',
    isFavorite: false,
    icon: '📋'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Initialize UI
  renderQuickAccessGroups();
  renderPrompts();
  setupEventListeners();
});

function setupEventListeners() {
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

  // Sidebar collapse
  const collapseBtn = document.getElementById('collapse-sidebar');
  collapseBtn.addEventListener('click', toggleSidebar);
}

function toggleSidebar() {
  const sidebar = document.querySelector('nav');
  const collapseBtn = document.getElementById('collapse-sidebar');
  sidebarCollapsed = !sidebarCollapsed;

  if (sidebarCollapsed) {
    sidebar.classList.remove('w-16');
    sidebar.classList.add('w-0');
    collapseBtn.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    `;
  } else {
    sidebar.classList.remove('w-0');
    sidebar.classList.add('w-16');
    collapseBtn.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    `;
  }
}

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
  const container = document.querySelector('#quick-access-groups');
  
  container.innerHTML = quickAccessGroups.map(group => `
    <div class="p-4 ${group.color} rounded-lg cursor-pointer hover:opacity-90 transition-all transform hover:scale-[1.02]">
      <h3 class="text-white font-medium text-lg">${group.name}</h3>
      <p class="text-white/80 text-sm mt-1">${group.promptCount}</p>
    </div>
  `).join('');
}

function renderPrompts(filteredPrompts = prompts) {
  const container = document.querySelector('#prompts-list');
  
  container.innerHTML = filteredPrompts.map(prompt => `
    <div class="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100/70 transition-all transform hover:scale-[1.01] cursor-pointer">
      <div class="flex items-center space-x-4">
        <div class="text-2xl">${prompt.icon}</div>
        <div>
          <h3 class="font-medium text-gray-900">${prompt.title}</h3>
          <p class="text-sm text-gray-500">Last updated ${prompt.lastUpdated}</p>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <button class="p-1.5 text-gray-400 hover:text-yellow-500 transition-colors" onclick="toggleFavorite(${prompt.id})">
          <svg class="w-5 h-5" fill="${prompt.isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
          </svg>
        </button>
        <button class="p-1.5 text-gray-400 hover:text-red-500 transition-colors" onclick="deletePrompt(${prompt.id})">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
}

function filterPrompts(searchTerm) {
  const filtered = prompts.filter(prompt => 
    prompt.title.toLowerCase().includes(searchTerm)
  );
  renderPrompts(filtered);
}

// Actions
window.toggleFavorite = function(promptId) {
  const prompt = prompts.find(p => p.id === promptId);
  if (prompt) {
    prompt.isFavorite = !prompt.isFavorite;
    renderPrompts();
  }
};

window.deletePrompt = function(promptId) {
  const index = prompts.findIndex(p => p.id === promptId);
  if (index !== -1) {
    prompts.splice(index, 1);
    renderPrompts();
  }
};
