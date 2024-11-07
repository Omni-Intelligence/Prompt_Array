import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Search, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center">
              <img src="/placeholder.svg" alt="PromptHub Logo" className="h-8 w-auto mr-2" />
              <span className="text-xl font-bold">PromptHub</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Blog</Button>
            <Button variant="ghost">Log In</Button>
            <Button variant="outline">Book Demo</Button>
            <Button>Sign Up</Button>
            <Bell className="h-6 w-6 text-gray-500" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Library</h1>
          <div className="space-x-2">
            <Button variant="outline">Create Group</Button>
            <Button>Create Project</Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>No Projects... Yet!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Magic is just around the corner. Create a new project to get started.</p>
            <Button>Start Building</Button>
          </CardContent>
        </Card>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All prompts</h2>
            <div className="w-64">
              <Input type="search" placeholder="Search" className="pl-8" />
              <Search className="h-4 w-4 absolute top-2.5 left-2.5 text-gray-500" />
            </div>
          </div>
          <Tabs defaultValue="recent">
            <TabsList>
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
                <li key={prompt.title} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{prompt.icon}</span>
                    <div>
                      <h3 className="font-semibold">{prompt.title}</h3>
                      <p className="text-sm text-gray-500">Last updated {prompt.time}</p>
                    </div>
                  </div>
                  {prompt.starred && <Star className="text-yellow-400" />}
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