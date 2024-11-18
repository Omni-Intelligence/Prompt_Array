import React from 'react';
import { Star, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePrompts } from '@/hooks/usePrompts';

const PromptItem = ({ prompt, onClick }) => (
  <li 
    onClick={() => onClick(prompt)}
    className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/20 transition-all duration-300 flex items-center justify-between cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <span className="text-2xl group-hover:scale-110 transition-transform">{prompt.icon || '📝'}</span>
      <div>
        <h3 className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
          {prompt.title}
        </h3>
        <p className="text-sm text-muted-foreground">Last updated {prompt.time || prompt.updated_at}</p>
      </div>
    </div>
    {prompt.starred && (
      <Star className="text-primary fill-primary group-hover:scale-110 transition-transform" />
    )}
  </li>
);

const PromptsList = ({ onPromptClick }) => {
  const { data: prompts, isLoading, error } = usePrompts();

  if (isLoading) {
    return <div>Loading prompts...</div>;
  }

  if (error) {
    return <div>Error loading prompts: {error.message}</div>;
  }

  // Categorize prompts
  const categorizedPrompts = {
    recent: prompts || [],
    favorites: prompts?.filter(p => p.starred) || [],
    owned: prompts?.filter(p => p.is_owned) || [],
    templates: prompts?.filter(p => p.is_template) || []
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">All Prompts</h2>
        <div className="w-full sm:w-64 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search prompts..." 
            className="pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50"
          />
        </div>
      </div>
      
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="w-full justify-start bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="owned">My Prompts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {Object.entries(categorizedPrompts).map(([category, categoryPrompts]) => (
          <TabsContent key={category} value={category}>
            <ScrollArea className="h-[400px]">
              <ul className="space-y-3">
                {categoryPrompts.map((prompt) => (
                  <PromptItem 
                    key={prompt.id} 
                    prompt={prompt}
                    onClick={onPromptClick}
                  />
                ))}
              </ul>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default PromptsList;