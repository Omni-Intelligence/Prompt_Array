import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Groups = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [newGroup, setNewGroup] = React.useState({
    title: '',
    description: ''
  });

  const groups = [
    {
      id: 1,
      title: 'Blog Writing',
      description: 'Collection of prompts for writing engaging blog content',
      promptCount: 12,
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      title: 'Social Media',
      description: 'Prompts for creating engaging social media content',
      promptCount: 8,
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      title: 'Email Marketing',
      description: 'Templates and prompts for email campaigns',
      promptCount: 15,
      lastUpdated: '3 days ago'
    },
    {
      id: 4,
      title: 'SEO Content',
      description: 'Prompts optimized for search engine visibility',
      promptCount: 6,
      lastUpdated: '5 days ago'
    },
    {
      id: 5,
      title: 'Technical Writing',
      description: 'Prompts for technical documentation and guides',
      promptCount: 10,
      lastUpdated: '1 day ago'
    },
    {
      id: 6,
      title: 'Creative Stories',
      description: 'Prompts for creative writing and storytelling',
      promptCount: 9,
      lastUpdated: '4 days ago'
    }
  ];

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroup.title || !newGroup.description) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Group created successfully!");
    setIsOpen(false);
    setNewGroup({ title: '', description: '' });
  };

  return (
    <div className="min-h-screen">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Groups
            </h1>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 transition-colors">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Group
              </Button>
            </SheetTrigger>
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

        <div className="mb-6 w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search groups..." 
              className="pl-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Card 
              key={group.id} 
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groups;