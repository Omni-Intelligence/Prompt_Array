import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Copy, Star, History } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PromptVersionHistory from "@/components/prompt/PromptVersionHistory";
import { useState } from "react";

const PromptDetail = () => {
  const { promptId } = useParams();
  const navigate = useNavigate();
  const [showVersionHistory, setShowVersionHistory] = useState(false);

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
    lastUsed: "2 days ago",
    currentVersion: 3
  };

  // Mock version history data
  const versions = [
    {
      id: "v3",
      version: 3,
      content: prompt.content,
      title: prompt.title,
      description: prompt.description,
      tags: prompt.tags,
      isPublic: true,
      teamId: "team1",
      groupId: "group1",
      createdAt: new Date(),
      createdBy: "Sarah Chen",
      changeDescription: "Added SEO keywords section"
    },
    {
      id: "v2",
      version: 2,
      content: "Write a blog post about [topic] that includes:\n\n1. An introduction\n2. [number] main sections\n3. Examples\n4. Conclusion",
      title: prompt.title,
      description: "Creates blog post content with proper structure",
      tags: ["writing", "blogging"],
      isPublic: true,
      teamId: "team1",
      groupId: "group1",
      createdAt: new Date(Date.now() - 86400000),
      createdBy: "Sarah Chen",
      changeDescription: "Simplified structure"
    },
    {
      id: "v1",
      version: 1,
      content: "Write a detailed blog post about [topic]",
      title: "Simple Blog Generator",
      description: "Creates blog post content",
      tags: ["writing"],
      isPublic: true,
      teamId: "team1",
      groupId: "group1",
      createdAt: new Date(Date.now() - 172800000),
      createdBy: "Sarah Chen",
      changeDescription: "Initial version"
    }
  ];

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt.content);
    toast.success("Prompt copied to clipboard!");
  };

  const handleToggleFavorite = () => {
    toast.success("Added to favorites!");
  };

  const handleRestoreVersion = (version) => {
    toast.success(`Restored version ${version.version}`);
    setShowVersionHistory(false);
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
          <Button
            variant="outline"
            className="ml-auto"
            onClick={() => setShowVersionHistory(!showVersionHistory)}
          >
            <History className="mr-2 h-4 w-4" />
            Version History
          </Button>
        </div>

        {showVersionHistory ? (
          <PromptVersionHistory
            versions={versions}
            currentVersion={prompt.currentVersion}
            onRestoreVersion={handleRestoreVersion}
          />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default PromptDetail;