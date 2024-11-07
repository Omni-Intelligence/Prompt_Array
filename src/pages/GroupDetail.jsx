import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [isPromptSheetOpen, setIsPromptSheetOpen] = React.useState(false);
  const [newPrompt, setNewPrompt] = React.useState({
    title: '',
    content: '',
    description: ''
  });

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
      lastUsed: '2 days ago'
    },
    {
      id: 2,
      title: 'Social Media Caption',
      description: 'Generates social media captions',
      content: 'Create an engaging social media caption for...',
      lastUsed: '5 days ago'
    }
  ];

  const handleCreatePrompt = (e) => {
    e.preventDefault();
    if (!newPrompt.title || !newPrompt.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Here you would typically make an API call to create the prompt
    toast.success("Prompt created successfully!");
    setIsPromptSheetOpen(false);
    setNewPrompt({ title: '', content: '', description: '' });
  };

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
          <Sheet open={isPromptSheetOpen} onOpenChange={setIsPromptSheetOpen}>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Prompt
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Create New Prompt</SheetTitle>
                <SheetDescription>
                  Add a new prompt to this group
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={handleCreatePrompt} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={newPrompt.title}
                    onChange={(e) => setNewPrompt(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter prompt title"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Input
                    id="description"
                    value={newPrompt.description}
                    onChange={(e) => setNewPrompt(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter prompt description"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Prompt Content
                  </label>
                  <Textarea
                    id="content"
                    value={newPrompt.content}
                    onChange={(e) => setNewPrompt(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Enter your prompt content"
                    className="min-h-[200px]"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create Prompt
                </Button>
              </form>
            </SheetContent>
          </Sheet>
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