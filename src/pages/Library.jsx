import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Star, ArrowLeft, Plus, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import PromptsList from "@/components/dashboard/PromptsList";
import CreatePromptSheet from "@/components/CreatePromptSheet";
import CreateGroupSheet from "@/components/CreateGroupSheet";

const Library = () => {
  const navigate = useNavigate();
  const [isCreatePromptOpen, setIsCreatePromptOpen] = React.useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = React.useState(false);
  const [selectedPrompt, setSelectedPrompt] = React.useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Library
                </h1>
                <p className="text-muted-foreground">Your personal prompt collection</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold">Quick Actions</h2>
                <p className="text-muted-foreground">Create and manage your content</p>
              </div>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  className="hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => setIsCreateGroupOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Group
                </Button>
                <Button 
                  onClick={() => setIsCreatePromptOpen(true)} 
                  className="bg-primary hover:bg-primary/90 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Prompt
                </Button>
              </div>
            </div>
          </section>

          <section>
            <PromptsList onPromptClick={setSelectedPrompt} />
          </section>
        </div>
      </main>

      <CreatePromptSheet
        isOpen={isCreatePromptOpen}
        onOpenChange={setIsCreatePromptOpen}
        initialData={selectedPrompt}
      />

      <CreateGroupSheet
        isOpen={isCreateGroupOpen}
        onOpenChange={setIsCreateGroupOpen}
      />
    </div>
  );
};

export default Library;