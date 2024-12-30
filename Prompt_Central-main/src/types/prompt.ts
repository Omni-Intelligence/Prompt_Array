export interface PromptVersion {
  id: string;
  version: number;
  content: string;
  title: string;
  description: string;
  tags: string[];
  isPublic: boolean;
  teamId: string;
  groupId: string;
  createdAt: Date;
  createdBy: string;
  changeDescription?: string;
}

export interface Prompt {
  id: string;
  currentVersion: number;
  versions: PromptVersion[];
  lastUsed: string;
}