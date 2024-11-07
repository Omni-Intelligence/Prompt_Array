import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Search, Star, ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Library
              </h1>
              <p className="text-muted-foreground">Manage and organize your prompts</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 hover:text-primary transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Quick Actions</h2>
            <p className="text-muted-foreground">Create and manage your content</p>
          </div>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              className="hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Group
            </Button>
            <Button className="bg-primary hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        <Card className="mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle>No Projects... Yet!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Magic is just around the corner. Create a new project to get started.</p>
            <Button className="bg-primary hover:bg-primary/90 transition-colors">
              Start Building
            </Button>
          </CardContent>
        </Card>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All prompts</h2>
            <div className="w-64">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search prompts..." 
                  className="pl-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="owned">Owned by me</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
          </Tabs>
          <ScrollArea className="h-[400px] mt-4">
            <ul className="space-y-2">
              {[
                { title: 'Notes to blog posts', icon: '📝', time: '8 minutes ago', starred: true },
                { title: 'Vulnerability scanner - prod', icon: '🔒', time: '10 minutes ago' },
                { title: 'LinkedIn post generator', icon: '💼', time: '20 minutes ago' },
                { title: 'HTML cleaner', icon: '🧹', time: '3 days ago' },
                { title: 'TechCrunch summarizer', icon: '📰', time: '1 week ago' },
              ].map((prompt) => (
                <li 
                  key={prompt.title} 
                  className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 hover:border-primary/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">{prompt.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{prompt.title}</h3>
                        <p className="text-sm text-muted-foreground">Last updated {prompt.time}</p>
                      </div>
                    </div>
                    {prompt.starred ? (
                      <Star className="text-primary fill-primary group-hover:scale-110 transition-transform" />
                    ) : (
                      <Star className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </section>
      </main>
    </div>
  );
};

export default Library;