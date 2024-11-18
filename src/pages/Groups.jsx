import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import GroupCard from '@/components/groups/GroupCard';
import GroupsHeader from '@/components/groups/GroupsHeader';
import { useGroups } from '@/hooks/useGroups';
import { toast } from "sonner";

const Groups = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFolderOpen, setIsFolderOpen] = React.useState(false);
  const [newGroup, setNewGroup] = React.useState({ title: '', description: '' });
  const [newFolder, setNewFolder] = React.useState({ name: '', description: '', parentId: null });
  
  const { groups, isLoading, createGroup } = useGroups();

  const folders = [
    {
      id: '1',
      name: 'Marketing Materials',
      parentId: null,
      groupId: '1',
      children: [
        {
          id: '2',
          name: 'Social Media',
          parentId: '1',
          groupId: '1',
          children: []
        },
        {
          id: '3',
          name: 'Blog Posts',
          parentId: '1',
          groupId: '1',
          children: []
        }
      ]
    },
    {
      id: '4',
      name: 'Product Documentation',
      parentId: null,
      groupId: '1',
      children: []
    }
  ];

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroup.title || !newGroup.description) {
      toast.error("Please fill in all fields");
      return;
    }
    
    await createGroup.mutateAsync(newGroup);
    setIsOpen(false);
    setNewGroup({ title: '', description: '' });
  };

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!newFolder.name) {
      toast.error("Please enter a folder name");
      return;
    }
    toast.success("Folder created successfully!");
    setIsFolderOpen(false);
    setNewFolder({ name: '', description: '', parentId: null });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="p-8 max-w-7xl mx-auto">
        <GroupsHeader 
          onCreateGroup={() => setIsOpen(true)}
          onCreateFolder={() => setIsFolderOpen(true)}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} folders={folders} />
          ))}
        </div>

        <Sheet open={isFolderOpen} onOpenChange={setIsFolderOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create New Folder</SheetTitle>
              <SheetDescription>
                Add a new folder to organize your prompts
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleCreateFolder} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newFolder.name}
                  onChange={(e) => setNewFolder(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter folder name"
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={newFolder.description}
                  onChange={(e) => setNewFolder(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter folder description"
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 transition-colors">
                Create Folder
              </Button>
            </form>
          </SheetContent>
        </Sheet>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create New Group</SheetTitle>
              <SheetDescription>
                Add a new group to organize your prompts
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleCreateGroup} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newGroup.title}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter group title"
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter group description"
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 transition-colors">
                Create Group
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Groups;