export const useGroupDetails = (groupId) => {
  // Mock data - would be replaced with actual API calls
  const groups = {
    1: {
      id: 1,
      title: 'Blog Writing',
      description: 'Collection of prompts for writing engaging blog content',
      icon: '✍️'
    },
    2: {
      id: 2,
      title: 'Social Media',
      description: 'Prompts for creating engaging social media content',
      icon: '📱'
    },
    3: {
      id: 3,
      title: 'Email Marketing',
      description: 'Templates and prompts for email campaigns',
      icon: '📧'
    },
    4: {
      id: 4,
      title: 'SEO Content',
      description: 'Prompts optimized for search engine visibility',
      icon: '🔍'
    },
    5: {
      id: 5,
      title: 'Technical Writing',
      description: 'Prompts for technical documentation and guides',
      icon: '💻'
    },
    6: {
      id: 6,
      title: 'Creative Stories',
      description: 'Prompts for creative writing and storytelling',
      icon: '📚'
    }
  };

  const group = groups[groupId] || {
    title: 'Group Not Found',
    description: 'This group does not exist',
    icon: '❓'
  };

  return { group };
};