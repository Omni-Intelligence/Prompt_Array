import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { navItems } from '../nav-items';
import CreatePromptSheet from '@/components/CreatePromptSheet';
import CreateGroupSheet from '@/components/CreateGroupSheet';
import UserNav from '@/components/UserNav';

const Index = () => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = React.useState(true);

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/placeholder.svg" alt="PromptHub Logo" className="h-8 w-auto mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">PromptHub</span>
          </div>
          <div className="flex items-center space-x-4">
            <UserNav isSignedIn={isSignedIn} onSignOut={handleSignOut} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-6">
        <aside className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.title}
                to={item.to}
                className="group w-full"
              >
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start group relative overflow-hidden transition-all duration-300
                    before:absolute before:inset-0 before:bg-gradient-to-r ${item.color} before:opacity-0 
                    before:transition-opacity hover:before:opacity-100 hover:text-white
                    dark:hover:text-white`}
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-3 transition-transform group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.title}</span>
                  </span>
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Your Library
            </h1>
            <div className="space-x-2">
              <CreateGroupSheet 
                trigger={
                  <Button variant="outline" className="hover:bg-primary/10 hover:text-primary transition-colors">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Group
                  </Button>
                }
              />
              <CreatePromptSheet 
                trigger={
                  <Button className="bg-primary hover:bg-primary/90 transition-colors">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Prompt
                  </Button>
                }
              />
            </div>
          </div>

          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Groups</h2>
              <Button variant="link" className="text-primary">See Less</Button>
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
                  className="card-hover backdrop-blur-sm bg-white/50 dark:bg-gray-800/50"
                  onClick={() => navigate(`/groups/${group.id}`)}
                >
                  <CardHeader>
                    <CardTitle>{group.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{group.prompts} prompts</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">All prompts</h2>
              <div className="w-64">
                <Input 
                  type="search" 
                  placeholder="Search" 
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                />
              </div>
            </div>
            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="w-full justify-start bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
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
                    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{prompt.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{prompt.title}</h3>
                        <p className="text-sm text-muted-foreground">Last updated {prompt.time}</p>
                      </div>
                    </div>
                    {prompt.starred && <Star className="text-primary fill-primary" />}
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