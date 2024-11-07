import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Copy, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const PromptDetail = () => {
  const { promptId } = useParams();
  const navigate = useNavigate();

  // Mock data - would come from API in real app
  const prompt = {
    id: promptId,
    title: "Blog Post Generator",
    description: "Creates engaging blog post content with proper structure and SEO optimization",
    content: "Write a comprehensive blog post about [topic] that includes:\n\n1. An attention-grabbing introduction\n2. [number] main sections with detailed explanations\n3. Relevant examples and case studies\n4. A strong conclusion\n5. Meta description and SEO keywords",
    author: "Sarah Chen",
    tags: ["writing", "blogging", "content"],
    likes: 234,
    isFavorited: false,
    lastUsed: "2 days ago"
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt.content);
    toast.success("Prompt copied to clipboard!");
  };

  const handleToggleFavorite = () => {
    toast.success("Added to favorites!");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">{prompt.title}</h1>
            <p className="text-muted-foreground">by {prompt.author}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <CardTitle>Prompt Content</CardTitle>
                <CardDescription>{prompt.description}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleFavorite}
              >
                <Star className={`h-4 w-4 ${prompt.isFavorited ? "fill-yellow-400 text-yellow-400" : ""}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-sm">{prompt.content}</pre>
            </div>
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button className="w-full" onClick={handleCopyPrompt}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Prompt
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PromptDetail;