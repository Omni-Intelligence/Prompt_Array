import React from 'react';
import { useParams } from 'react-router-dom';
import { useGroupDetails } from '@/hooks/useGroupDetails';
import { FolderTree } from '@/components/folder/FolderTree';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { groupPrompts } from '@/data/mockPrompts';
import { Badge } from "@/components/ui/badge";

const GroupDetail = () => {
  const { groupId } = useParams();
  const { group } = useGroupDetails(groupId);
  const navigate = useNavigate();
  const prompts = groupPrompts[groupId] || [];

  // Mock folders data - replace with actual data fetching
  const folders = [
    {
      id: '1',
      name: 'Marketing Materials',
      parentId: null,
      groupId: groupId,
      children: [
        {
          id: '2',
          name: 'Social Media',
          parentId: '1',
          groupId: groupId,
          children: []
        },
        {
          id: '3',
          name: 'Blog Posts',
          parentId: '1',
          groupId: groupId,
          children: []
        }
      ]
    },
    {
      id: '4',
      name: 'Product Documentation',
      parentId: null,
      groupId: groupId,
      children: []
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/groups')}
              className="hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {group.title}
              </h1>
              <p className="text-muted-foreground">{group.description}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-lg font-semibold mb-4">Folders</h2>
              <FolderTree folders={folders} groupId={groupId} />
            </div>
          </div>

          <div className="md:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <div className="w-64">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search prompts..." 
                    className="pl-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                  />
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 transition-colors">
                Add Prompt
              </Button>
            </div>

            <div className="grid gap-4">
              {prompts.map((prompt) => (
                <Card 
                  key={prompt.id}
                  className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => { navigate(`/prompts/${prompt.id}`); }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{prompt.title}</h3>
                        <p className="text-muted-foreground text-sm">{prompt.description}</p>
                        <div className="flex gap-2 mt-2">
                          {prompt.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Star className={`${prompt.isStarred ? 'fill-primary text-primary' : 'text-gray-400'} h-5 w-5`} />
                    </div>
                    <div className="text-sm text-muted-foreground mt-4">
                      Last used {prompt.lastUsed}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GroupDetail;