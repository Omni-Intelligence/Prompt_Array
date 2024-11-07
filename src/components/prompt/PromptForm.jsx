import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import PromptTeamAndGroupFields from './PromptTeamAndGroupFields';
import PromptTagsField from './PromptTagsField';
import { toast } from "sonner";

const PromptForm = ({ newPrompt, setNewPrompt, onSubmit, initialData }) => {
  const handleImprovePrompt = async () => {
    if (!newPrompt.content) {
      toast.error("Please enter a prompt first");
      return;
    }
    
    toast.promise(
      // This is where we'd integrate with an AI service
      new Promise((resolve) => {
        setTimeout(() => {
          const improvedPrompt = `${newPrompt.content}\n\nImproved with more specific details and clear instructions for better results.`;
          setNewPrompt(prev => ({ ...prev, content: improvedPrompt }));
          resolve();
        }, 1500);
      }),
      {
        loading: 'Improving your prompt...',
        success: 'Prompt improved successfully!',
        error: 'Failed to improve prompt'
      }
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          value={newPrompt.title}
          onChange={(e) => setNewPrompt(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter prompt title"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Input
          id="description"
          value={newPrompt.description}
          onChange={(e) => setNewPrompt(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter prompt description"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Prompt Content
        </label>
        <div className="relative">
          <Textarea
            id="content"
            value={newPrompt.content}
            onChange={(e) => setNewPrompt(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Enter your prompt content"
            className="min-h-[200px] pr-24"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="absolute right-2 top-2"
            onClick={handleImprovePrompt}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Improve
          </Button>
        </div>
      </div>

      <PromptTeamAndGroupFields newPrompt={newPrompt} setNewPrompt={setNewPrompt} />
      <PromptTagsField newPrompt={newPrompt} setNewPrompt={setNewPrompt} />

      <Button type="submit" className="w-full">
        {initialData ? 'Update Prompt' : 'Create Prompt'}
      </Button>
    </form>
  );
};

export default PromptForm;