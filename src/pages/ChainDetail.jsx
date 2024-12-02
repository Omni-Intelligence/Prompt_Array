import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, GripVertical, Plus, Save, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "sonner";

const ChainDetail = () => {
  const navigate = useNavigate();
  const { chainId } = useParams();
  
  // This would normally come from your backend
  const chainData = {
    id: chainId,
    title: "Content Creation Chain",
    description: "A sequence of prompts for creating blog content",
    prompts: [
      { id: 1, title: "Topic Research", content: "Research trending topics in [industry]" },
      { id: 2, title: "Outline Generation", content: "Create a detailed outline for [topic]" },
      { id: 3, title: "Draft Writing", content: "Write a first draft based on [outline]" }
    ]
  };

  const handleSave = () => {
    toast.success("Chain updated successfully!");
  };

  const handleAddPrompt = () => {
    toast.info("Select a prompt to add to the chain");
  };

  const handleRemovePrompt = (promptId) => {
    toast.success("Prompt removed from chain");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/chains')}
              className="hover:bg-white/20 dark:hover:bg-gray-800/20"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                Edit Chain
              </h1>
              <p className="text-muted-foreground">
                Manage your prompt sequence
              </p>
            </div>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Chain Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input 
                    defaultValue={chainData.title}
                    className="bg-white/50 dark:bg-gray-900/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input 
                    defaultValue={chainData.description}
                    className="bg-white/50 dark:bg-gray-900/50"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Prompt Sequence</CardTitle>
                <Button onClick={handleAddPrompt} size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Prompt
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {chainData.prompts.map((prompt, index) => (
                      <div 
                        key={prompt.id}
                        className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
                      >
                        <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                        <div className="flex-1">
                          <h3 className="font-medium">{prompt.title}</h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {prompt.content}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemovePrompt(prompt.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm h-fit">
            <CardHeader>
              <CardTitle>Chain Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="font-medium mb-2">Input Variables</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">[industry]</span>
                      <Input placeholder="e.g. Technology" className="flex-1" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">[topic]</span>
                      <Input placeholder="e.g. AI trends" className="flex-1" />
                    </div>
                  </div>
                </div>
                <Button className="w-full">
                  Run Chain
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChainDetail;