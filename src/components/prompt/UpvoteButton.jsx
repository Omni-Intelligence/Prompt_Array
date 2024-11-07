import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp } from 'lucide-react';
import { toast } from "sonner";

const UpvoteButton = ({ initialCount = 0, promptId }) => {
  const [upvotes, setUpvotes] = useState(initialCount);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes(prev => prev - 1);
      setHasUpvoted(false);
      toast.info("Upvote removed");
    } else {
      setUpvotes(prev => prev + 1);
      setHasUpvoted(true);
      toast.success("Prompt upvoted!");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleUpvote}
      className={`flex items-center gap-1 ${
        hasUpvoted ? 'text-primary' : 'text-muted-foreground'
      } hover:text-primary transition-colors`}
    >
      <ThumbsUp className={`h-4 w-4 ${hasUpvoted ? 'fill-primary' : ''}`} />
      <span>{upvotes}</span>
    </Button>
  );
};

export default UpvoteButton;