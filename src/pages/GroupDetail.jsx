import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Plus, Edit2, Trash2, Copy } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import CreatePromptSheet from '@/components/CreatePromptSheet';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [selectedPrompt, setSelectedPrompt] = React.useState(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);

  // Mock data - would be replaced with actual API calls
  const group = {
    id: groupId,
    title: 'Content Generation',
    description: 'Prompts for generating various types of content',
    icon: '✍️'
  };

  const prompts = [
    {
      id: 1,
      title: 'Blog Post Generator',
      description: 'Creates engaging blog post content',
      content: 'Write a blog post about [topic] that includes...',
      lastUsed: '2 days ago',
      tags: ['content', 'blog']
    },
    {
      id: 2,
      title: 'Social Media Caption',
      description: 'Generates social media captions',
      content: 'Create an engaging social media caption for...',
      lastUsed: '5 days ago',
      tags: ['social', 'marketing']
    }
  ];

  const handleCopyPrompt = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Prompt copied to clipboard!");
  };

  const handleDeletePrompt = (id) => {
    toast.success("Prompt deleted successfully!");
  };

  const handleEditClick = (prompt) => {
    setSelectedPrompt(prompt);
    setIsEditSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/groups')}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-4xl animate-in fade-in slide-in-from-left-5 duration-500">
              {group.icon}
            </span>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {group.title}
              </h1>
              <p className="text-muted-foreground">{group.description}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Prompts</h2>
          <CreatePromptSheet 
            trigger={
              <Button className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-colors group">
                <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Create Prompt
              </Button>
            }
          />
        </div>

        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="grid gap-4">
            {prompts.map((prompt) => (
              <Card 
                key={prompt.id}
                className="group backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20 hover:scale-[1.01]"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {prompt.title}
                      </CardTitle>
                      <CardDescription>{prompt.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleCopyPrompt(prompt.content)}
                        className="hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditClick(prompt)}
                        className="hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeletePrompt(prompt.id)}
                        className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-md backdrop-blur-sm mb-4">
                    <pre className="whitespace-pre-wrap text-sm font-mono">{prompt.content}</pre>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {prompt.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Last used: {prompt.lastUsed}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <CreatePromptSheet 
        trigger={<div />} // Hidden trigger as we control opening programmatically
        isOpen={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
        initialData={selectedPrompt}
      />
    </div>
  );
};

export default GroupDetail;