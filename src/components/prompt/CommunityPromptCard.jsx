import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';
import { useForkPrompt } from '@/hooks/useCommunity';

const CommunityPromptCard = ({ prompt, onShare, onClick }) => {
  const { mutate: forkPrompt, isLoading: isForking } = useForkPrompt();

  const handleShare = () => {
    const url = `${window.location.origin}/community/prompt/${prompt.id}`;
    navigator.clipboard.writeText(url);
    onShare?.(prompt.id);
  };

  // Ensure we have valid data
  if (!prompt?.id || !prompt?.title) {
    console.warn('Invalid prompt data:', prompt);
    return null;
  }

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={prompt.author?.avatar_url} />
              <AvatarFallback>{prompt.author?.full_name?.[0] || 'A'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{prompt.author?.full_name || 'Anonymous'}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(prompt.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <CardTitle className="mb-2 line-clamp-1">{prompt.title}</CardTitle>
        <CardDescription className="line-clamp-2">{prompt.description}</CardDescription>
      </CardContent>

      <CardFooter className="flex justify-between pt-4 border-t">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              forkPrompt(prompt.id);
            }}
            disabled={isForking}
          >
            <Copy className="h-4 w-4 mr-2" />
            Fork
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {prompt.comments_count || 0}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CommunityPromptCard;