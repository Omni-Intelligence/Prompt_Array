import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Plus, Search, Folder } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navItems } from '../nav-items';
import CreatePromptSheet from '@/components/CreatePromptSheet';
import CreateGroupSheet from '@/components/CreateGroupSheet';
import UserNav from '@/components/UserNav';

// Let's extract the QuickAccessGroups into a separate component
const QuickAccessGroup = ({ group }) => (
  <Link 
    to={`/groups/${group.id}`}
    className="group"
  >
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 card-hover">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-200">{group.name}</h3>
        <p className="text-sm text-muted-foreground">{group.count} prompts</p>
      </CardContent>
    </Card>
  </Link>
);

const Index = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(true);
  const [selectedPrompt, setSelectedPrompt] = React.useState(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt);
    setIsEditSheetOpen(true);
  };

  const quickAccessGroups = [
    { id: 1, name: 'Blog Writing', count: 12 },
    { id: 2, name: 'Social Media', count: 8 },
    { id: 3, name: 'Email Marketing', count: 15 },
    { id: 4, name: 'SEO Content', count: 6 },
    { id: 5, name: 'Technical Writing', count: 10 },
    { id: 6, name: 'Creative Stories', count: 9 }
  ];

  const dummyPrompts = {
    recent: [
      { id: 1, title: 'Blog Post Generator', icon: '✍️', time: '8 minutes ago', starred: true, content: 'Create an engaging blog post about [topic] that includes an introduction, three main points, and a conclusion. Use a conversational tone and include relevant examples.' },
      { id: 2, title: 'Social Media Caption', icon: '📱', time: '10 minutes ago', content: 'Write an engaging social media caption for [product/service] that includes a hook, value proposition, and clear call-to-action. Keep it under 280 characters.' },
      { id: 3, title: 'Email Newsletter', icon: '📧', time: '20 minutes ago', content: 'Generate a weekly newsletter template that includes a personal greeting, main story highlights, and upcoming events section.' },
    ],
    favorites: [
      { id: 4, title: 'Product Description', icon: '🛍️', time: '3 days ago', starred: true, content: 'Create a compelling product description for [product name] highlighting its key features, benefits, and unique selling points.' },
      { id: 5, title: 'SEO Meta Tags', icon: '🔍', time: '1 week ago', starred: true, content: 'Generate SEO-optimized meta title and description for [page type] that includes primary keyword and compelling call-to-action.' },
    ],
    owned: [
      { id: 6, title: 'Meeting Summary', icon: '📝', time: '2 days ago', content: 'Summarize the key points, action items, and decisions made during the [meeting topic] meeting.' },
      { id: 7, title: 'Code Documentation', icon: '💻', time: '4 days ago', content: 'Write clear and concise documentation for [function/feature] including purpose, parameters, and example usage.' },
    ],
    templates: [
      { id: 8, title: 'Customer Support Response', icon: '🎯', time: '1 day ago', content: 'Template for responding to customer inquiries about [issue type] with empathy and clear resolution steps.' },
      { id: 9, title: 'Project Proposal', icon: '📊', time: '5 days ago', content: 'Create a professional project proposal outline including objectives, scope, timeline, and budget sections.' },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="PromptHub Logo" className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              PromptHub
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <UserNav isSignedIn={isSignedIn} onSignOut={handleSignOut} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <aside className="w-64 flex-shrink-0 hidden md:block">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.title}
                to={item.to}
                className="group w-full"
              >
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start group relative overflow-hidden transition-all duration-300
                    hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 dark:hover:from-primary/20 dark:hover:to-purple-500/20`}
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-3 text-primary">{item.icon}</span>
                    <span className="font-medium">{item.title}</span>
                  </span>
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Your Library
            </h1>
            <div className="flex gap-2">
              <CreateGroupSheet 
                trigger={
                  <Button variant="outline" className="group">
                    <Folder className="mr-2 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    New Group
                  </Button>
                }
              />
              <CreatePromptSheet 
                trigger={
                  <Button className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-colors group">
                    <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    New Prompt
                  </Button>
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickAccessGroups.map((group) => (
              <QuickAccessGroup key={group.id} group={group} />
            ))}
          </div>

          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">All Prompts</h2>
              <div className="w-full sm:w-64 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  type="search" 
                  placeholder="Search prompts..." 
                  className="pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50"
                />
              </div>
            </div>
            
            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="w-full justify-start bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="owned">My Prompts</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              {Object.entries(dummyPrompts).map(([category, prompts]) => (
                <TabsContent key={category} value={category}>
                  <ScrollArea className="h-[400px]">
                    <ul className="space-y-3">
                      {prompts.map((prompt) => (
                        <li 
                          key={prompt.id} 
                          onClick={() => handlePromptClick(prompt)}
                          className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/20 transition-all duration-300 flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-2xl group-hover:scale-110 transition-transform">{prompt.icon}</span>
                            <div>
                              <h3 className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
                                {prompt.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">Last updated {prompt.time}</p>
                            </div>
                          </div>
                          {prompt.starred && (
                            <Star className="text-primary fill-primary group-hover:scale-110 transition-transform" />
                          )}
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </section>
        </main>
      </div>
      <CreatePromptSheet 
        trigger={<div />}
        isOpen={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
        initialData={selectedPrompt}
      />
    </div>
  );
};

export default Index;
