import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const QuickAccessGroup = ({ group }) => (
  <Link 
    to={`/groups/${group.id}`}
    className="group"
  >
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 card-hover">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-200">{group.name}</h3>
        <p className="text-sm text-muted-foreground">{group.count} prompts</p>
      </CardContent>
    </Card>
  </Link>
);

const QuickAccessGroups = ({ groups }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map((group) => (
        <QuickAccessGroup key={group.id} group={group} />
      ))}
    </div>
  );
};

export default QuickAccessGroups;