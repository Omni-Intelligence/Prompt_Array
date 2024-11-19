import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getGroupPrompts } from '@/services/groups';

const GroupCard = ({ group }) => {
  const navigate = useNavigate();
  const { data: prompts = [] } = useQuery({
    queryKey: ['group-prompts', group.id],
    queryFn: () => getGroupPrompts(group.id)
  });
  
  return (
    <Card 
      className="card-hover backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 cursor-pointer"
      onClick={() => navigate(`/app/groups/${group.id}`)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          {group.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{prompts.length} prompts</span>
          <span>Updated {new Date(group.updated_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupCard;