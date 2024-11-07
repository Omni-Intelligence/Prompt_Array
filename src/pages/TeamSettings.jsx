import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const TeamSettings = () => {
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Team settings updated successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Team Settings</h1>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Team Information</h2>
            <Separator />
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input id="teamName" placeholder="Enter team name" />
                </div>
                
                <div>
                  <Label htmlFor="teamDescription">Team Description</Label>
                  <Input id="teamDescription" placeholder="Enter team description" />
                </div>

                <div>
                  <Label htmlFor="teamEmail">Team Email</Label>
                  <Input id="teamEmail" type="email" placeholder="team@example.com" />
                </div>
              </div>

              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Team Members</h3>
                <div>
                  <Label htmlFor="inviteEmail">Invite Member</Label>
                  <div className="flex gap-2">
                    <Input id="inviteEmail" type="email" placeholder="Enter email address" />
                    <Button>Invite</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => navigate('/')}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSettings;