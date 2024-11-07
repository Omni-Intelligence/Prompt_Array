import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PromptTeamAndGroupFields = ({ newPrompt, setNewPrompt }) => {
  // Dummy data for teams and groups - replace with actual data
  const teams = [
    { id: '1', name: 'Marketing Team' },
    { id: '2', name: 'Content Team' },
    { id: '3', name: 'Development Team' }
  ];

  const groups = [
    { id: '1', name: 'Blog Writing' },
    { id: '2', name: 'Social Media' },
    { id: '3', name: 'Email Marketing' },
    { id: '4', name: 'SEO Content' }
  ];

  return (
    <>
      <div className="flex items-center justify-between space-x-2">
        <label htmlFor="public" className="text-sm font-medium">
          Make Public
        </label>
        <Switch
          id="public"
          checked={newPrompt.isPublic}
          onCheckedChange={(checked) => setNewPrompt(prev => ({ ...prev, isPublic: checked }))}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="team" className="text-sm font-medium">
          Add to Team
        </label>
        <Select
          value={newPrompt.teamId}
          onValueChange={(value) => setNewPrompt(prev => ({ ...prev, teamId: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="group" className="text-sm font-medium">
          Add to Group
        </label>
        <Select
          value={newPrompt.groupId}
          onValueChange={(value) => setNewPrompt(prev => ({ ...prev, groupId: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a group" />
          </SelectTrigger>
          <SelectContent>
            {groups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default PromptTeamAndGroupFields;