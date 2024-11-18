import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQueryClient } from '@tanstack/react-query';

const CreateGroupSheet = ({ trigger }) => {
  const [isOpen, setIsOpen] = React.useState(false);
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
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to create a group");
        return;
      }

      const { data, error } = await supabase
        .from('groups')
        .insert([{
          name: newGroup.title,
          description: newGroup.description,
          user_id: user.id
        }])
        .select();

      if (error) {
        console.error('Error creating group:', error);
        toast.error(`Failed to create group: ${error.message}`);
        return;
      }

      toast.success("Group created successfully!");
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      setIsOpen(false);
      setNewGroup({ title: '', description: '' });
    } catch (error) {
      console.error('Error in handleCreateGroup:', error);
      toast.error("Failed to create group. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
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
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Group"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateGroupSheet;