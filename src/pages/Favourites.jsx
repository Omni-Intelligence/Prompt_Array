import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Star, FolderOpen, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/useFavorites";
import { toggleFavorite } from "@/services/favorites";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const Favourites = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: favouritesByGroup = [], isLoading, error } = useFavorites();

  const handleRemoveFavorite = async (promptId) => {
    try {
      await toggleFavorite(promptId);
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error("Failed to remove from favorites");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading favorites...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-destructive">Error loading favorites</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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

        {favouritesByGroup.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No favorites yet. Start adding prompts to your favorites!</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/app/library')}
            >
              Browse Library
            </Button>
          </div>
        ) : (
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
                      <Card 
                        key={prompt.id} 
                        className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20 cursor-pointer"
                        onClick={() => navigate(`/app/prompts/${prompt.id}`)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {prompt.title}
                              </CardTitle>
                              <CardDescription className="text-muted-foreground">
                                {prompt.description}
                              </CardDescription>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFavorite(prompt.id);
                              }}
                              className="text-yellow-400 hover:text-yellow-500 transition-colors"
                            >
                              <Star className="h-4 w-4 fill-current" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {prompt.tags?.map((tag) => (
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
                            Last updated: {new Date(prompt.updated_at).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default Favourites;