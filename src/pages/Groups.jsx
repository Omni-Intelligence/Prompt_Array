import React from 'react';
import { useGroups } from '@/hooks/useGroups';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import GroupCard from '@/components/groups/GroupCard';
import { useState } from 'react';
import CreateGroupSheet from '@/components/CreateGroupSheet';

const Groups = () => {
  const { groups, isLoading } = useGroups();
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-muted-foreground">Loading groups...</p>
      </div>
    );
  }

  // Mock folders data for demonstration
  const mockFolders = [
    {
      id: '1',
      name: 'Getting Started',
      parentId: null,
      children: []
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Groups</h1>
        <Button
          onClick={() => setIsCreateGroupOpen(true)}
          className="bg-primary hover:bg-primary/90 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Group
        </Button>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No groups yet. Create your first group to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={{
                id: group.id,
                title: group.name,
                description: group.description,
                promptCount: 0,
                lastUpdated: new Date(group.updated_at).toLocaleDateString()
              }}
              folders={mockFolders}
            />
          ))}
        </div>
      )}

      <CreateGroupSheet
        isOpen={isCreateGroupOpen}
        onOpenChange={setIsCreateGroupOpen}
      />
    </div>
  );
};

export default Groups;