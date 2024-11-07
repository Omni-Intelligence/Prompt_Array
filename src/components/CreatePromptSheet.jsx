import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const CreatePromptSheet = ({ trigger, isOpen, onOpenChange, initialData }) => {
  const [newPrompt, setNewPrompt] = React.useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    description: initialData?.description || '',
    tags: initialData?.tags || [],
    isPublic: initialData?.isPublic || false,
    teamId: initialData?.teamId || '',
    groupId: initialData?.groupId || ''
  });
  const [currentTag, setCurrentTag] = React.useState('');

  // Dummy data for teams and groups - replace with actual data
  const teams = [
    { id: '1', name: 'Marketing Team' },
    { id: '2', name: 'Content Team' },
    { id: '3', name: 'Development Team' }
  ];

  const groups = [
    { id: '1', name: 'Blog Writing' },
    { id: '2', name: 'Social Media' },
    { id: '3', name: 'Email Marketing' },
    { id: '4', name: 'SEO Content' }
  ];

  React.useEffect(() => {
    if (initialData) {
      setNewPrompt({
        title: initialData.title || '',
        content: initialData.content || '',
        description: initialData.description || '',
        tags: initialData.tags || [],
        isPublic: initialData.isPublic || false,
        teamId: initialData.teamId || '',
        groupId: initialData.groupId || ''
      });
    }
  }, [initialData]);

  const handleCreatePrompt = (e) => {
    e.preventDefault();
    if (!newPrompt.title || !newPrompt.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success(initialData ? "Prompt updated successfully!" : "Prompt created successfully!");
    onOpenChange?.(false);
    setNewPrompt({ 
      title: '', 
      content: '', 
      description: '', 
      tags: [],
      isPublic: false,
      teamId: '',
      groupId: ''
    });
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
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{initialData ? 'Edit Prompt' : 'Create New Prompt'}</SheetTitle>
          <SheetDescription>
            {initialData ? 'Edit your prompt details' : 'Add a new prompt to your library'}
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

          <div className="flex items-center justify-between space-x-2">
            <label htmlFor="public" className="text-sm font-medium">
              Make Public
            </label>
            <Switch
              id="public"
              checked={newPrompt.isPublic}
              onCheckedChange={(checked) => setNewPrompt(prev => ({ ...prev, isPublic: checked }))}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="team" className="text-sm font-medium">
              Add to Team
            </label>
            <Select
              value={newPrompt.teamId}
              onValueChange={(value) => setNewPrompt(prev => ({ ...prev, teamId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="group" className="text-sm font-medium">
              Add to Group
            </label>
            <Select
              value={newPrompt.groupId}
              onValueChange={(value) => setNewPrompt(prev => ({ ...prev, groupId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                {groups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            {initialData ? 'Update Prompt' : 'Create Prompt'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreatePromptSheet;