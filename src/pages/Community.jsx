import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Search, Grid3X3, Users, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePromptSheet from "@/components/CreatePromptSheet";
import CommunityPromptCard from "@/components/prompt/CommunityPromptCard";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();

  // Mock data - would come from backend in real app
  const communityPrompts = [
    {
      id: 1,
      title: "Advanced Blog Post Structure",
      description: "A comprehensive prompt for creating well-structured blog posts with SEO optimization and engaging content flow.",
      content: "Create a detailed blog post outline that includes...",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
        role: "Content Strategist"
      },
      stats: {
        likes: 234,
        comments: 12,
        forks: 45
      },
      tags: ["writing", "blogging", "content", "seo"],
      lastUpdated: "2 days ago",
      isPublic: true,
    },
    {
      id: 2,
      title: "E-commerce Product Description Generator",
      description: "Convert product features into compelling benefits with emotional triggers and clear CTAs.",
      content: "Write a persuasive product description that...",
      author: {
        name: "Mike Johnson",
        avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
        role: "Marketing Lead"
      },
      stats: {
        likes: 156,
        comments: 8,
        forks: 23
      },
      tags: ["marketing", "ecommerce", "copywriting"],
      lastUpdated: "5 days ago",
      isPublic: true,
    }
  ];

  const handleForkPrompt = (prompt) => {
    const initialData = {
      ...prompt,
      title: `Fork of ${prompt.title}`,
      isPublic: false,
    };
    setEditingPrompt(initialData);
    setIsPromptSheetOpen(true);
  };

  const handleShare = (promptId) => {
    toast.success("Sharing link copied to clipboard!");
  };

  const [isPromptSheetOpen, setIsPromptSheetOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Community Prompts
            </h1>
            <p className="text-muted-foreground">
              Discover and fork prompts shared by the community. Customize them for your needs.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search community prompts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-primary/10 text-primary" : ""}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-primary/10 text-primary" : ""}
            >
              <Users className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="trending" className="w-full">
          <TabsList>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-6">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {communityPrompts.map((prompt) => (
                  <CommunityPromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onFork={handleForkPrompt}
                    onShare={handleShare}
                    onClick={() => navigate(`/prompts/${prompt.id}`)}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="recent">
            {/* Similar content structure as trending */}
          </TabsContent>
        </Tabs>
      </div>

      <CreatePromptSheet
        trigger={null}
        isOpen={isPromptSheetOpen}
        onOpenChange={setIsPromptSheetOpen}
        initialData={editingPrompt}
      />
    </div>
  );
};

export default Community;
