export interface Folder {
  id: string;
  name: string;
  description?: string;
  parentId: string | null; // null means root level
  groupId: string;
  createdAt: Date;
  updatedAt: Date;
}