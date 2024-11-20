import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Search, Grid3X3, Users, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCommunityPrompts } from "@/hooks/useCommunity";
import CommunityPromptCard from "@/components/prompt/CommunityPromptCard";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();

  const { data: prompts, isLoading, error } = useCommunityPrompts({
    filter,
    searchQuery: searchQuery.trim(),
  });

  useEffect(() => {
    if (error) {
      console.error('Detailed error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
    }
  }, [error]);

  const handleShare = (promptId) => {
    const url = `${window.location.origin}/community/prompt/${promptId}`;
    navigator.clipboard.writeText(url);
    toast.success("Sharing link copied to clipboard!");
  };

  if (error) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center text-red-500">
            <p className="font-semibold">Error loading prompts</p>
            <p className="text-sm mt-2">{error.message}</p>
            {error.hint && (
              <p className="text-sm mt-1 text-gray-600">{error.hint}</p>
            )}
          </div>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Community Prompts</h1>
          <p className="text-muted-foreground mt-1">
            Discover and share prompts with the community
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <Input
              className="pl-10"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Tabs value={filter} onValueChange={setFilter} className="w-[400px]">
            <TabsList>
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="oldest">Oldest</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 size={20} />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <Users size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="h-[calc(100vh-16rem)]">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 h-48 animate-pulse bg-gray-100"
              />
            ))}
          </div>
        ) : prompts?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No prompts found</p>
            {searchQuery && (
              <p className="text-sm text-gray-400 mt-2">
                Try adjusting your search terms
              </p>
            )}
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {prompts?.map((prompt) => (
              <CommunityPromptCard
                key={prompt.id}
                prompt={prompt}
                viewMode={viewMode}
                onShare={() => handleShare(prompt.id)}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default Community;
