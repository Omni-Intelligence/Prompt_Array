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
    <div className="p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Favourites</h1>
          <p className="text-muted-foreground">Quick access to your favorite prompts</p>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-8">
          {favouritesByGroup.map((group) => (
            <div key={group.groupId} className="space-y-4">
              <div className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">{group.groupName}</h2>
                <Badge variant="secondary">{group.prompts.length} prompts</Badge>
              </div>

              <div className="grid gap-4">
                {group.prompts.map((prompt) => (
                  <Card key={prompt.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {prompt.title}
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </CardTitle>
                          <CardDescription>{prompt.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        {prompt.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
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
  );
};

export default Favourites;