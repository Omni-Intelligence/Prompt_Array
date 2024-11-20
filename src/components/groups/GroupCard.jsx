import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getGroupPrompts } from '@/services/groups';
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useGroups } from '@/hooks/useGroups';
import EditGroupSheet from '@/components/EditGroupSheet';

const GroupCard = ({ group }) => {
  const navigate = useNavigate();
  const { data: prompts = [] } = useQuery({
    queryKey: ['group-prompts', group.id],
    queryFn: () => getGroupPrompts(group.id)
  });
  const { deleteGroup } = useGroups();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  
  const handleCardClick = (e) => {
    // Prevent navigation when clicking on the menu or its children
    if (e.target.closest('[data-menu]') || e.target.closest('[role="menuitem"]')) {
      e.stopPropagation();
      return;
    }
    navigate(`/app/groups/${group.id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteGroup(group.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Failed to delete group:', error);
    }
  };
  
  return (
    <>
      <Card 
        className="card-hover backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 cursor-pointer relative group"
        onClick={handleCardClick}
      >
        <div 
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
          data-menu
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowEditSheet(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {group.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{prompts.length} prompts</span>
            <span>Updated {new Date(group.updated_at).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the group "{group.name}" and all its prompts.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditGroupSheet
        group={group}
        onOpenChange={setShowEditSheet}
        trigger={<></>}
      />
    </>
  );
};

export default GroupCard;