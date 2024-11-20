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
import CreatePromptSheet from "@/components/CreatePromptSheet";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");
  const [isCreatePromptOpen, setIsCreatePromptOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const navigate = useNavigate();

  const { data: prompts, isLoading, error } = useCommunityPrompts({
    filter,
    searchQuery: searchQuery.trim(),
  });

  useEffect(() => {
    if (error) {
      console.error('Community page error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
    }
  }, [error]);

  const handleShare = (promptId) => {
    const url = `${window.location.origin}/app/prompts/${promptId}`;
    navigator.clipboard.writeText(url);
    toast.success("Sharing link copied to clipboard!");
  };

  const handleFork = (prompt) => {
    setSelectedPrompt({
      ...prompt,
      title: `${prompt.title} (Fork)`,
      is_public: false
    });
    setIsCreatePromptOpen(true);
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
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Community
          </h1>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : prompts?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No prompts found</p>
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {prompts?.map((prompt) => (
              <CommunityPromptCard
                key={prompt.id}
                prompt={prompt}
                onShare={handleShare}
                onFork={() => handleFork(prompt)}
                onClick={() => navigate(`/app/prompts/${prompt.id}`)}
              />
            ))}
          </div>
        </ScrollArea>
      )}

      <CreatePromptSheet
        isOpen={isCreatePromptOpen}
        onOpenChange={(open) => {
          setIsCreatePromptOpen(open);
          if (!open) setSelectedPrompt(null);
        }}
        initialData={selectedPrompt}
      />
    </div>
  );
};

export default Community;