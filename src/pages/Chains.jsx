import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Workflow } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Chains = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
              Prompt Chains
            </h1>
            <p className="text-muted-foreground">Create and manage prompt sequences</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Create New Chain
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Start building a new prompt chain to automate your workflow
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 transition-colors">
                Get Started
              </Button>
            </CardContent>
          </Card>

          {[
            { title: 'Content Creation', prompts: 3, status: 'Active' },
            { title: 'Customer Support', prompts: 5, status: 'Draft' },
            { title: 'Data Analysis', prompts: 4, status: 'Active' },
          ].map((chain) => (
            <Card 
              key={chain.title}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20 hover:scale-[1.02]"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-primary" />
                  {chain.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">{chain.prompts} prompts</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    chain.status === 'Active' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400'
                  }`}>
                    {chain.status}
                  </span>
                </div>
                <Button variant="outline" className="w-full hover:bg-primary/10 hover:text-primary transition-colors">
                  View Chain
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chains;