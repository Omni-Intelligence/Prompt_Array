import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createGroup } from "@/services/groups";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQueryClient } from '@tanstack/react-query';

const CreateGroupSheet = ({ isOpen, onOpenChange, trigger }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const [newGroup, setNewGroup] = React.useState({
    title: '',
    description: ''
  });

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroup.title || !newGroup.description) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    try {
      await createGroup(newGroup);
      toast.success("Group created successfully!");
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      onOpenChange(false);
      setNewGroup({ title: '', description: '' });
    } catch (error) {
      console.error('Error in handleCreateGroup:', error);
      toast.error(error.message || "Failed to create group. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent className="w-[95vw] max-w-[800px] sm:w-[800px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create New Group</SheetTitle>
          <SheetDescription>
            Add a new group to organize your prompts
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleCreateGroup} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={newGroup.title}
              onChange={(e) => setNewGroup(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter group title"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={newGroup.description}
              onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter group description"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Group'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateGroupSheet;