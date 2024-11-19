import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowLeft, Plus } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import CreatePromptSheet from '@/components/CreatePromptSheet';
import { useState } from 'react';
import { getGroupPrompts } from '@/services/groups';
import { useGroupDetails } from '@/hooks/useGroupDetails';

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { group, isLoading: isLoadingGroup, error: groupError } = useGroupDetails(groupId);
  const { data: prompts = [], isLoading: isLoadingPrompts } = useQuery({
    queryKey: ['group-prompts', groupId],
    queryFn: () => getGroupPrompts(groupId),
    enabled: !!groupId
  });
  const [isCreatePromptOpen, setIsCreatePromptOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoadingGroup || isLoadingPrompts) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (groupError || !group) {
    return <Navigate to="/app/groups" replace />;
  }

  // Filter prompts based on search query
  const filteredPrompts = prompts.filter(prompt => 
    prompt.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/app/groups')}
          className="hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {group.name}
          </h1>
          <p className="text-muted-foreground">{group.description}</p>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => setIsCreatePromptOpen(true)}
          className="bg-primary hover:bg-primary/90 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Prompt
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No prompts in this group yet. Create your first prompt to get started!</p>
          </div>
        ) : (
          filteredPrompts.map((prompt) => (
            <Card 
              key={prompt.id} 
              className="card-hover cursor-pointer"
              onClick={() => navigate(`/app/prompts/${prompt.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{prompt.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{prompt.content}</p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">
                        Created {new Date(prompt.created_at).toLocaleDateString()}
                      </Badge>
                      <Badge variant="secondary">
                        Updated {new Date(prompt.updated_at).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <CreatePromptSheet
        isOpen={isCreatePromptOpen}
        onOpenChange={setIsCreatePromptOpen}
        initialData={{ groupId }}
      />
    </div>
  );
};

export default GroupDetail;