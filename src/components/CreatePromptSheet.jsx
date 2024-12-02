import React from 'react';
import PromptForm from './prompt/PromptForm';
import { toast } from "sonner";
import { createPrompt, updatePrompt } from '@/services/prompts';
import { useQueryClient } from '@tanstack/react-query';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CreatePromptSheet = ({ trigger, isOpen, onOpenChange, initialData = null, mode = 'create' }) => {
  const queryClient = useQueryClient();
  const [newPrompt, setNewPrompt] = React.useState({
    title: mode === 'create' && !initialData?.title ? '' : (initialData?.title || ''),
    content: mode === 'create' && !initialData?.title ? '' : (initialData?.content || ''),
    description: mode === 'create' && !initialData?.title ? '' : (initialData?.description || ''),
    tags: mode === 'create' && !initialData?.title ? [] : (initialData?.tags || []),
    isPublic: mode === 'create' && !initialData?.title ? false : (initialData?.isPublic || false),
    teamId: initialData?.teamId || '',
    groupId: initialData?.groupId || '',
    changeDescription: ''
  });

  React.useEffect(() => {
    if (initialData?.title) {
      setNewPrompt({
        title: initialData.title || '',
        content: initialData.content || '',
        description: initialData.description || '',
        tags: initialData.tags || [],
        isPublic: initialData.isPublic || false,
        teamId: initialData.teamId || '',
        groupId: initialData.groupId || '',
        changeDescription: ''
      });
    } else {
      setNewPrompt({
        title: '',
        content: '',
        description: '',
        tags: [],
        isPublic: false,
        teamId: initialData?.teamId || '',
        groupId: initialData?.groupId || '',
        changeDescription: ''
      });
    }
  }, [initialData, isOpen]);

  const handleCreatePrompt = async (e) => {
    e.preventDefault();
    if (!newPrompt.title || !newPrompt.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      if (mode === 'edit' && initialData?.id) {
        await updatePrompt(initialData.id, newPrompt);
        toast.success("Prompt updated successfully!");
      } else {
        await createPrompt(newPrompt);
        toast.success(initialData ? "Prompt forked successfully!" : "Prompt created successfully!");
      }
      
      // Invalidate both prompts and group-prompts queries
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      if (newPrompt.groupId) {
        queryClient.invalidateQueries({ queryKey: ['group-prompts', newPrompt.groupId] });
      }
      
      onOpenChange?.(false);
      setNewPrompt({ 
        title: '', 
        content: '', 
        description: '', 
        tags: [],
        isPublic: false,
        teamId: '',
        groupId: '',
        changeDescription: ''
      });
    } catch (error) {
      console.error('Error with prompt:', error);
      toast.error(mode === 'edit' ? "Failed to update prompt. Please try again." : "Failed to create prompt. Please try again.");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>
            {mode === 'edit' ? 'Edit Prompt' : (initialData?.title ? 'Fork Prompt' : 'Create New Prompt')}
          </SheetTitle>
          <SheetDescription>
            {mode === 'edit' ? 'Update your prompt details' : (initialData?.title ? 'Fork your prompt details' : 'Add a new prompt to your library')}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <PromptForm
            newPrompt={newPrompt}
            setNewPrompt={setNewPrompt}
            onSubmit={handleCreatePrompt}
            initialData={initialData}
            isEditing={!!initialData}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreatePromptSheet;