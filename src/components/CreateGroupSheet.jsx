import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CreateGroupSheet = ({ trigger }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [newGroup, setNewGroup] = React.useState({
    title: '',
    description: ''
  });

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroup.title || !newGroup.description) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Here you would typically make an API call to create the group
    toast.success("Group created successfully!");
    setIsOpen(false);
    setNewGroup({ title: '', description: '' });
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
          <Button type="submit" className="w-full">
            Create Group
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateGroupSheet;