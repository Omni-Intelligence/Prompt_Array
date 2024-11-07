import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Search } from 'lucide-react';

const Groups = () => {
  const groups = [
    {
      id: 1,
      title: 'Content Generation',
      description: 'Prompts for generating various types of content',
      promptCount: 10,
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      title: 'Customer Support',
      description: 'Templates for customer service responses',
      promptCount: 8,
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      title: 'Social Media',
      description: 'Prompts for social media content and engagement',
      promptCount: 15,
      lastUpdated: '3 days ago'
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Groups</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Group
        </Button>
      </div>

      <div className="mb-6 w-full max-w-md">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search groups..." className="pl-8" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>{group.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{group.promptCount} prompts</span>
                <span>Updated {group.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Groups;