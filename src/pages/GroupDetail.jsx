import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
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

  // Mock data - would be replaced with actual API calls
  const group = {
    id: groupId,
    title: 'Content Generation',
    description: 'Prompts for generating various types of content',
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

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/groups')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{group.title}</h1>
            <p className="text-muted-foreground">{group.description}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Prompts</h2>
          <CreatePromptSheet 
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Prompt
              </Button>
            }
          />
        </div>

        <ScrollArea className="h-[600px]">
          <div className="grid gap-4">
            {prompts.map((prompt) => (
              <Card key={prompt.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{prompt.title}</CardTitle>
                      <CardDescription>{prompt.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="whitespace-pre-wrap text-sm">{prompt.content}</pre>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {prompt.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Last used: {prompt.lastUsed}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default GroupDetail;