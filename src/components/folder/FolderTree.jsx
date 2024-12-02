import React from 'react';
import { ChevronRight, ChevronDown, Folder } from 'lucide-react';
import { cn } from "@/lib/utils";

export const FolderTree = ({ folders, groupId, level = 0 }) => {
  const [expandedFolders, setExpandedFolders] = React.useState(new Set());

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const renderFolder = (folder) => {
    const isExpanded = expandedFolders.has(folder.id);
    const hasChildren = folder.children && folder.children.length > 0;

    return (
      <div key={folder.id} className={cn("select-none", level > 0 && "ml-4")}>
        <div
          className="flex items-center gap-1 py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleFolder(folder.id);
          }}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )
          ) : (
            <div className="w-4" />
          )}
          <Folder className="h-4 w-4 text-blue-500" />
          <span className="text-sm">{folder.name}</span>
        </div>
        {isExpanded && hasChildren && (
          <div className="mt-1">
            {folder.children.map((child) => renderFolder(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-2">
      {folders
        .filter(folder => folder.groupId === groupId && folder.parentId === null)
        .map(renderFolder)}
    </div>
  );
};