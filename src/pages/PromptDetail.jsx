import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Copy, Star, History, Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PromptVersionHistory from "@/components/prompt/PromptVersionHistory";
import { useState } from "react";
import { toggleFavorite } from "@/services/favorites";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import CreatePromptSheet from "@/components/CreatePromptSheet";
import { getPrompt, getPromptVersions, updatePrompt } from '@/services/prompts';

const PromptDetail = () => {
  const { promptId } = useParams();
  const navigate = useNavigate();
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const queryClient = useQueryClient();

  // Only fetch basic prompt data initially
  const { data: prompt, isLoading } = useQuery({
    queryKey: ['prompt', promptId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const data = await getPrompt(promptId);
      if (!data) throw new Error('Prompt not found');
      
      return data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    cacheTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
  });

  // Lazy load versions only when needed
  const { data: versions, isLoading: isLoadingVersions } = useQuery({
    queryKey: ['prompt-versions', promptId],
    queryFn: () => getPromptVersions(promptId),
    enabled: !!promptId && showVersionHistory, // Only fetch when versions are shown
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

  const handleCopyPrompt = () => {
    if (!prompt?.content) return;
    navigator.clipboard.writeText(prompt.content);
    toast.success("Prompt copied to clipboard!");
  };

  const handleRestoreVersion = async (version) => {
    try {
      await updatePrompt(promptId, {
        ...version,
        changeDescription: `Restored from version ${version.version}`
      });
      toast.success('Version restored successfully!');
      queryClient.invalidateQueries({ queryKey: ['prompt', promptId] });
      queryClient.invalidateQueries({ queryKey: ['prompt-versions', promptId] });
      setShowVersionHistory(false);
    } catch (error) {
      console.error('Error restoring version:', error);
      toast.error('Failed to restore version');
    }
  };

  if (isLoading) {
    return <div className="p-8 max-w-4xl mx-auto">Loading prompt...</div>;
  }

  if (!prompt) {
    return <div className="p-8 max-w-4xl mx-auto">Prompt not found</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">{prompt.title}</h1>
            <p className="text-muted-foreground">Created {new Date(prompt.created_at).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="ml-auto relative"
              onClick={() => setShowVersionHistory(!showVersionHistory)}
            >
              <History className="mr-2 h-4 w-4" />
              Version History
              <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs bg-primary/10 text-primary">
                Coming Soon
              </Badge>
            </Button>
          </div>
        </div>

        {showVersionHistory ? (
          <PromptVersionHistory
            versions={versions || []}
            currentVersion={prompt.version}
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
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditSheetOpen(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyPrompt}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <pre className="whitespace-pre-wrap text-sm">{prompt.content}</pre>
              </div>
              <div className="flex flex-wrap gap-2">
                {prompt.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <CreatePromptSheet
        isOpen={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
        initialData={prompt}
        mode="edit"
      />
    </div>
  );
};

export default PromptDetail;