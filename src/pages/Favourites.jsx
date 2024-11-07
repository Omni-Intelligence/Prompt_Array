import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Star, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Favourites = () => {
  const navigate = useNavigate();

  // Mock data - would be replaced with actual data from your state management
  const favouritesByGroup = [
    {
      groupId: 1,
      groupName: "Content Generation",
      prompts: [
        {
          id: 1,
          title: "Blog Post Generator",
          description: "Creates engaging blog post content",
          tags: ["content", "blog"],
          lastUsed: "2 days ago"
        },
        {
          id: 2,
          title: "Social Media Caption",
          description: "Generates social media captions",
          tags: ["social", "marketing"],
          lastUsed: "5 days ago"
        }
      ]
    },
    {
      groupId: 2,
      groupName: "Customer Support",
      prompts: [
        {
          id: 3,
          title: "Email Response Template",
          description: "Professional customer service email templates",
          tags: ["email", "support"],
          lastUsed: "1 day ago"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Favourites
            </h1>
            <p className="text-muted-foreground">Quick access to your favorite prompts</p>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-8">
            {favouritesByGroup.map((group) => (
              <div key={group.groupId} className="space-y-4">
                <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg backdrop-blur-sm">
                  <FolderOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">{group.groupName}</h2>
                  <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                    {group.prompts.length} prompts
                  </Badge>
                </div>

                <div className="grid gap-4">
                  {group.prompts.map((prompt) => (
                    <Card key={prompt.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {prompt.title}
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform" />
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                              {prompt.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {prompt.tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="secondary"
                              className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-3 flex items-center gap-2">
                          <span className="inline-block w-2 h-2 rounded-full bg-primary/40"></span>
                          Last used: {prompt.lastUsed}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Favourites;