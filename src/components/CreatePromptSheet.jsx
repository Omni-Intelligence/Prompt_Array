import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CreatePromptSheet = ({ trigger }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [newPrompt, setNewPrompt] = React.useState({
    title: '',
    content: '',
    description: '',
    tags: []
  });
  const [currentTag, setCurrentTag] = React.useState('');

  const handleCreatePrompt = (e) => {
    e.preventDefault();
    if (!newPrompt.title || !newPrompt.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Here you would typically make an API call to create the prompt
    toast.success("Prompt created successfully!");
    setIsOpen(false);
    setNewPrompt({ title: '', content: '', description: '', tags: [] });
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (currentTag && !newPrompt.tags.includes(currentTag)) {
      setNewPrompt(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setNewPrompt(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Create New Prompt</SheetTitle>
          <SheetDescription>
            Add a new prompt to your library
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {newPrompt.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <form onSubmit={handleAddTag} className="flex gap-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag"
              />
              <Button type="submit" variant="secondary">Add</Button>
            </form>
          </div>
          <Button type="submit" className="w-full">
            Create Prompt
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreatePromptSheet;