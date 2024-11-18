import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderTree } from "@/components/folder/FolderTree";
import { useNavigate } from 'react-router-dom';

const GroupCard = ({ group, folders }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="card-hover backdrop-blur-sm bg-white/50 dark:bg-gray-800/50"
      onClick={() => navigate(`/groups/${group.id}`)}
    >
      <CardHeader>
        <CardTitle>{group.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{group.promptCount} prompts</span>
          <span>Updated {group.lastUpdated}</span>
        </div>
        <div className="mt-4">
          <FolderTree folders={folders} groupId={group.id} />
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupCard;