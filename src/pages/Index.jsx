import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Star, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { navItems } from '../nav-items';
import CreatePromptSheet from '@/components/CreatePromptSheet';
import CreateGroupSheet from '@/components/CreateGroupSheet';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/placeholder.svg" alt="PromptHub Logo" className="h-8 w-auto mr-2" />
            <span className="text-xl font-bold">PromptHub</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Blog</Button>
            <Button variant="ghost">Log In</Button>
            <Button variant="outline">Book Demo</Button>
            <Button>Sign Up</Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>DC</AvatarFallback>
            </Avatar>
            <span>Dan Cleary</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex">
        <aside className="w-64 mr-8">
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.title}>
                  <Link to={item.to}>
                    <Button variant="ghost" className="w-full justify-start">
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Your Library</h1>
            <div className="space-x-2">
              <CreateGroupSheet 
                trigger={
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Group
                  </Button>
                }
              />
              <CreatePromptSheet 
                trigger={
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Prompt
                  </Button>
                }
              />
            </div>
          </div>

          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Groups</h2>
              <Button variant="link">See Less</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 1, title: 'Content Generation', prompts: 10 },
                { id: 2, title: 'PromptLab Prompts', prompts: 5 },
                { id: 3, title: 'Latency Newsletter', prompts: 3 },
                { id: 4, title: 'Chatbot', prompts: 2 },
                { id: 5, title: 'Prompt Engineering', prompts: 4 },
                { id: 6, title: 'Financial Prompts', prompts: 12 },
              ].map((group) => (
                <Card 
                  key={group.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/groups/${group.id}`)}
                >
                  <CardHeader>
                    <CardTitle>{group.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{group.prompts} prompts</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All prompts</h2>
              <div className="w-64">
                <Input type="search" placeholder="Search" />
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
    </div>
  );
};

export default Index;