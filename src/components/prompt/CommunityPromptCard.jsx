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
import UpvoteButton from './UpvoteButton';

const CommunityPromptCard = ({ prompt, onFork, onShare, onClick }) => {
  return (
    <Card className="group backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20 hover:scale-[1.01]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div 
            className="space-y-1 cursor-pointer"
            onClick={onClick}
          >
            <CardTitle className="group-hover:text-primary transition-colors">
              {prompt.title}
            </CardTitle>
            <CardDescription>{prompt.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src={prompt.author.avatar} />
            <AvatarFallback>{prompt.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{prompt.author.name}</p>
            <p className="text-xs text-muted-foreground">{prompt.author.role}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <UpvoteButton initialCount={prompt.stats.likes} promptId={prompt.id} />
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            {prompt.stats.comments}
          </div>
          <span className="ml-auto">{prompt.lastUpdated}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-6">
        <div className="flex gap-2 w-full">
          <Button
            className="flex-1"
            onClick={() => onFork(prompt)}
          >
            <Copy className="mr-2 h-4 w-4" />
            Fork Prompt
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onShare(prompt.id)}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CommunityPromptCard;