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
        className="relative hover:bg-accent cursor-pointer transition-colors"
        onClick={handleCardClick}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-semibold">{group.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild data-menu>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowEditSheet(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{group.description}</p>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              {prompts.length} {prompts.length === 1 ? 'prompt' : 'prompts'}
            </p>
          </div>
        </CardContent>
      </Card>

      <EditGroupSheet
        isOpen={showEditSheet}
        onOpenChange={setShowEditSheet}
        group={group}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the group and remove all prompts from it.
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
    </>
  );
};

export default GroupCard;