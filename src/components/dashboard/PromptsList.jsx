import React, { useState } from 'react';
import { Star, Search, Trash2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePrompts } from '@/hooks/usePrompts';
import { toggleFavorite } from '@/services/favorites';
import { seoPrompts } from '@/data/groups/seoPrompts';
import { technicalPrompts } from '@/data/groups/technicalPrompts';
import { emailPrompts } from '@/data/groups/emailPrompts';
import { creativeStoryPrompts } from '@/data/groups/creativeStoryPrompts';
import { Button } from "@/components/ui/button";
import { queryClient } from '@/lib/react-query';
import { toast } from "sonner";
import { deletePrompt } from '@/services/prompts';

const PromptItem = ({ prompt, onClick }) => {
  const handleFavorite = async (e) => {
    e.stopPropagation();
    try {
      await toggleFavorite(prompt.id);
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      toast.success(prompt.starred ? "Removed from favorites" : "Added to favorites");
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error("Failed to update favorite status");
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this prompt? This action cannot be undone.')) {
      try {
        await deletePrompt(prompt.id);
        queryClient.invalidateQueries({ queryKey: ['prompts'] });
        toast.success("Prompt deleted successfully");
      } catch (error) {
        console.error('Error deleting prompt:', error);
        toast.error("Failed to delete prompt");
      }
    }
  };

  return (
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
          <p className="text-sm text-muted-foreground">
            {prompt.lastUsed ? `Last used ${prompt.lastUsed}` : prompt.updated_at ? `Last updated ${new Date(prompt.updated_at).toLocaleDateString()}` : 'Recently added'}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFavorite}
          className={`${prompt.starred ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500 transition-colors`}
        >
          <Star className={`h-5 w-5 ${prompt.starred ? 'fill-current' : ''}`} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="text-gray-400 hover:text-destructive transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </li>
  );
};

const PromptsList = ({ onPromptClick }) => {
  const { data: userPrompts, isLoading, error } = usePrompts();
  const [searchTerm, setSearchTerm] = useState('');

  // Combine all template prompts
  const templatePrompts = [
    ...seoPrompts,
    ...technicalPrompts,
    ...emailPrompts,
    ...creativeStoryPrompts
  ];

  if (isLoading) {
    return <div>Loading prompts...</div>;
  }

  if (error) {
    return <div>Error loading prompts: {error.message}</div>;
  }

  const filteredPrompts = userPrompts.filter(prompt => 
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categorizedPrompts = {
    recent: filteredPrompts.slice(0, 10),
    favorites: filteredPrompts.filter(p => p.starred),
    owned: filteredPrompts,
    templates: templatePrompts
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            <ScrollArea className="h-[600px]">
              {categoryPrompts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {category === 'templates' ? 'No template prompts available.' : 'No prompts found. Create your first prompt by clicking the "New Prompt" button above.'}
                </p>
              ) : (
                <ul className="space-y-4">
                  {categoryPrompts.map((prompt) => (
                    <PromptItem 
                      key={prompt.id} 
                      prompt={prompt}
                      onClick={onPromptClick}
                    />
                  ))}
                </ul>
              )}
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default PromptsList;