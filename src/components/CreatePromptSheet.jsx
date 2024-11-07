import React from 'react';
import PromptForm from './prompt/PromptForm';
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CreatePromptSheet = ({ trigger, isOpen, onOpenChange, initialData }) => {
  const [newPrompt, setNewPrompt] = React.useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    description: initialData?.description || '',
    tags: initialData?.tags || [],
    isPublic: initialData?.isPublic || false,
    teamId: initialData?.teamId || '',
    groupId: initialData?.groupId || '',
    changeDescription: ''
  });

  React.useEffect(() => {
    if (initialData) {
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
    }
  }, [initialData]);

  const handleCreatePrompt = (e) => {
    e.preventDefault();
    if (!newPrompt.title || !newPrompt.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real app, this would be handled by your backend
    const newVersion = {
      id: crypto.randomUUID(),
      version: initialData ? initialData.currentVersion + 1 : 1,
      ...newPrompt,
      createdAt: new Date(),
      createdBy: 'Current User', // This would come from auth context
    };

    toast.success(initialData ? "Prompt updated successfully!" : "Prompt created successfully!");
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
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[640px]">
        <SheetHeader>
          <SheetTitle>{initialData ? 'Edit Prompt' : 'Create New Prompt'}</SheetTitle>
          <SheetDescription>
            {initialData ? 'Edit your prompt details' : 'Add a new prompt to your library'}
          </SheetDescription>
        </SheetHeader>
        <PromptForm
          newPrompt={newPrompt}
          setNewPrompt={setNewPrompt}
          onSubmit={handleCreatePrompt}
          initialData={initialData}
          isEditing={!!initialData}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CreatePromptSheet;