import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Upload, User } from "lucide-react";

// Predefined avatars from DiceBear API
const predefinedAvatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Nova",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Zephyr",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Atlas",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sage",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Cleo",
];

export function AvatarSelector({ currentAvatar, onAvatarChange }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFileUpload = async (event) => {
    try {
      setLoading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`public/${fileName}`, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(`public/${fileName}`);

      onAvatarChange(publicUrl);
      setOpen(false);
      toast.success('Avatar updated successfully');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload avatar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <User className="mr-2 h-4 w-4" />
          Change Avatar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Avatar</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="predefined">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="predefined">Predefined</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="predefined" className="mt-4">
            <div className="grid grid-cols-3 gap-4">
              {predefinedAvatars.map((avatar, index) => (
                <button
                  key={index}
                  className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    currentAvatar === avatar ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => {
                    onAvatarChange(avatar);
                    setOpen(false);
                  }}
                >
                  <img
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className="w-16 h-16 rounded-full"
                  />
                </button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="upload" className="mt-4">
            <div className="space-y-4">
              <Label htmlFor="avatar">Upload Image</Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={loading}
              />
              <p className="text-sm text-muted-foreground">
                Supported formats: JPG, PNG, GIF (max 2MB)
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
