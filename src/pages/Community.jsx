import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Search, Star, BookOpen, Save, ThumbsUp, Share2, MessageSquare, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Mock data - would come from backend in real app
  const communityPrompts = [
    {
      id: 1,
      title: "Advanced Blog Post Structure",
      description: "A comprehensive prompt for creating well-structured blog posts",
      content: "Create a detailed blog post outline that includes...",
      author: "Sarah Chen",
      likes: 234,
      comments: 12,
      tags: ["writing", "blogging", "content"],
      isPublic: true,
      isFavorited: false,
    },
    {
      id: 2,
      title: "E-commerce Product Description",
      description: "Convert product features into compelling benefits",
      content: "Write a persuasive product description that...",
      author: "Mike Johnson",
      likes: 156,
      comments: 8,
      tags: ["marketing", "ecommerce"],
      isPublic: true,
      isFavorited: true,
    }
  ];

  const handleSaveToLibrary = (promptId) => {
    toast.success("Prompt saved to your library!");
  };

  const handleToggleFavorite = (promptId) => {
    toast.success("Added to favorites!");
  };

  const handleLike = (promptId) => {
    toast.success("Prompt liked!");
  };

  const handleShare = (promptId) => {
    // In a real app, this would copy a sharing link
    toast.success("Sharing link copied to clipboard!");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Community Prompts</h1>
            <p className="text-muted-foreground">
              Discover and share prompts with the community. Save your favorites or add them to your library.
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
          <Button>
            <Share2 className="mr-2 h-4 w-4" />
            Share Your Prompt
          </Button>
        </div>

        <Tabs defaultValue="trending" className="w-full">
          <TabsList>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="favorites">My Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-6">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityPrompts.map((prompt) => (
                  <Card key={prompt.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="line-clamp-1">{prompt.title}</CardTitle>
                          <CardDescription>by {prompt.author}</CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleFavorite(prompt.id)}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              prompt.isFavorited ? "fill-yellow-400 text-yellow-400" : ""
                            }`}
                          />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {prompt.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {prompt.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {prompt.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {prompt.comments}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="mt-auto pt-6">
                      <div className="flex gap-2 w-full">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleSaveToLibrary(prompt.id)}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleShare(prompt.id)}
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="recent">
            {/* Similar content structure as trending */}
          </TabsContent>

          <TabsContent value="favorites">
            {/* Similar content structure as trending */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
