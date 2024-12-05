import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  LayoutList, 
  LayoutGrid, 
  ArrowLeft, 
  Clock, 
  SortAsc,
  Heart,
  AlertCircle,
  Copy,
  Star,
  ListFilter,
  FolderOpen
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useFavorites } from "@/hooks/useFavorites";
import { toggleFavorite } from "@/services/favorites";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { usePromptLimits } from '@/hooks/usePromptLimits';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Favourites = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: favouritesByGroup = [], isLoading, error } = useFavorites();
  const { promptCount, promptLimit, isSubscribed } = usePromptLimits();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [recentlyUsed, setRecentlyUsed] = useState([]);

  const handleRemoveFavorite = async (promptId) => {
    try {
      await toggleFavorite(promptId);
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error("Failed to remove from favorites");
    }
  };

  const handleCopyPrompt = async (prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      // Update recently used
      setRecentlyUsed(prev => {
        const newRecent = prev.filter(p => p.id !== prompt.id);
        return [{ ...prompt, lastUsed: new Date() }, ...newRecent].slice(0, 5);
      });
      toast.success("Prompt copied to clipboard!");
    } catch (error) {
      console.error('Error copying prompt:', error);
      toast.error("Failed to copy prompt");
    }
  };

  // Get all unique tags from prompts
  const allTags = Array.from(new Set(
    favouritesByGroup.flatMap(group => 
      group.prompts.flatMap(prompt => prompt.tags || [])
    )
  ));

  // Get all unique categories from prompts
  const allCategories = Array.from(new Set(
    favouritesByGroup.flatMap(group => 
      group.prompts.map(prompt => prompt.category || 'Uncategorized')
    )
  ));

  // Filter and sort prompts
  const filteredGroups = favouritesByGroup
    .map(group => ({
      ...group,
      prompts: group.prompts
        .filter(prompt => {
          const matchesSearch = searchTerm === '' || 
            prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.content?.toLowerCase().includes(searchTerm.toLowerCase());
          
          const matchesTags = selectedTags.length === 0 || 
            selectedTags.every(tag => prompt.tags?.includes(tag));
          
          return matchesSearch && matchesTags;
        })
        .sort((a, b) => {
          if (sortBy === 'recent') {
            return new Date(b.created_at) - new Date(a.created_at);
          } else if (sortBy === 'alphabetical') {
            return a.title.localeCompare(b.title);
          } else if (sortBy === 'lastUsed') {
            const aLastUsed = recentlyUsed.find(p => p.id === a.id)?.lastUsed || new Date(0);
            const bLastUsed = recentlyUsed.find(p => p.id === b.id)?.lastUsed || new Date(0);
            return bLastUsed - aLastUsed;
          }
          return 0;
        })
    }))
    .filter(group => group.prompts.length > 0)
    .filter(group => selectedGroups.length === 0 || selectedGroups.includes(group.groupId));

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 space-y-8 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 space-y-8 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="text-center py-12">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <p className="text-xl font-semibold text-gray-600 mb-2">Error loading favorites</p>
          <p className="text-gray-500">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="hover:bg-primary/10 hover:text-primary transition-colors rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Favourites
            </h1>
            {!isSubscribed && (
              <p className="text-sm text-muted-foreground mt-1">
                {promptCount}/{promptLimit} prompts used in free tier
              </p>
            )}
            <p className="text-muted-foreground">Quick access to your favorite prompts</p>
          </div>
        </div>

        {/* Recently Used Section */}
        {recentlyUsed.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg backdrop-blur-sm mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Recently Used</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentlyUsed.map((prompt) => (
                <Card 
                  key={prompt.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20 cursor-pointer backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                          {prompt.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {prompt.description}
                        </CardDescription>
                        <div className="text-xs text-muted-foreground mt-1">
                          Last used: {new Date(prompt.lastUsed).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyPrompt(prompt);
                          }}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
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
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters Bar */}
        <div className="flex flex-wrap gap-4 mb-6 items-center bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-transparent border-gray-200/50 dark:border-gray-700/50 focus:border-primary/50 focus:ring-primary/50"
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="lastUsed">Last Used</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ListFilter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <div className="p-2">
                <h4 className="mb-2 text-sm font-medium">Categories</h4>
                {allCategories.map(category => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedTags.includes(category)}
                    onCheckedChange={(checked) => {
                      setSelectedTags(prev => 
                        checked 
                          ? [...prev, category]
                          : prev.filter(t => t !== category)
                      );
                    }}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
              <div className="p-2 border-t">
                <h4 className="mb-2 text-sm font-medium">Tags</h4>
                {allTags.map(tag => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={(checked) => {
                      setSelectedTags(prev => 
                        checked 
                          ? [...prev, tag]
                          : prev.filter(t => t !== tag)
                      );
                    }}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
            className="hover:bg-primary/10 hover:text-primary transition-colors rounded-full"
          >
            {viewMode === 'grid' ? <LayoutList className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
          </Button>
        </div>

        {filteredGroups.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm || selectedTags.length > 0
                ? "No favorites match your search criteria"
                : "No favorites yet"}
            </p>
            <p className="text-gray-500">
              {searchTerm || selectedTags.length > 0
                ? "Try adjusting your search or filters"
                : "Start adding prompts to your favorites"}
            </p>
            {!(searchTerm || selectedTags.length > 0) && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate('/app/library')}
              >
                Browse Library
              </Button>
            )}
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-24rem)]">
            <div className="space-y-8">
              {filteredGroups.map((group) => (
                <div key={group.groupId} className="space-y-4">
                  <div className="flex items-center gap-2 bg-primary p-3 rounded-lg backdrop-blur-sm">
                    <FolderOpen className="h-5 w-5 text-white" />
                    <h2 className="text-xl font-semibold text-white">{group.groupName}</h2>
                    <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                      {group.prompts.length} prompts
                    </Badge>
                  </div>

                  <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-4'}>
                    {group.prompts.map((prompt) => (
                      <Card 
                        key={prompt.id} 
                        className={`group hover:shadow-lg transition-all duration-300 hover:border-primary/20 cursor-pointer backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 ${
                          viewMode === 'list' ? 'flex' : ''
                        }`}
                        onClick={() => navigate(`/app/prompts/${prompt.id}`)}
                      >
                        <CardHeader className={viewMode === 'list' ? 'flex-1' : ''}>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                                {prompt.title}
                              </CardTitle>
                              <CardDescription className="text-muted-foreground">
                                {prompt.description}
                              </CardDescription>
                              {prompt.tags && prompt.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {prompt.tags.map(tag => (
                                    <Badge 
                                      key={tag}
                                      variant="secondary" 
                                      className="bg-primary/10 text-primary text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              {prompt.category && (
                                <Badge 
                                  className="mt-2 bg-primary/20 text-primary"
                                >
                                  {prompt.category}
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyPrompt(prompt);
                                }}
                                className="text-primary hover:text-primary/80 transition-colors"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
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
                          </div>
                        </CardHeader>
                        {viewMode === 'grid' && (
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {prompt.content}
                            </p>
                          </CardContent>
                        )}
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