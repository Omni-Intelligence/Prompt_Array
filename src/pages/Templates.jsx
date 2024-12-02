import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTemplates } from '@/services/prompts';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CreatePromptSheet from '@/components/CreatePromptSheet';

const Templates = () => {
  const navigate = useNavigate();
  const [isCreatePromptOpen, setIsCreatePromptOpen] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = React.useState(null);

  const { data: templates = [], isLoading, error } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      console.log('Fetching templates in Templates component...');
      try {
        const data = await getTemplates();
        console.log('Templates fetched successfully:', {
          count: data?.length,
          templates: data,
          firstTemplate: data?.[0]
        });
        return data;
      } catch (err) {
        console.error('Error fetching templates:', err);
        throw err;
      }
    },
    staleTime: 0, // Consider the data stale immediately
    refetchOnMount: true, // Refetch when the component mounts
    refetchOnWindowFocus: true // Refetch when the window regains focus
  });

  // Add console log for debugging
  React.useEffect(() => {
    console.log('Templates component state:', {
      isLoading,
      hasError: !!error,
      templatesCount: templates?.length,
      error: error?.message
    });

    if (error) {
      console.error('Error details:', error);
    } else if (templates?.length > 0) {
      console.log('Template categories:', 
        Object.keys(templates.reduce((acc, template) => {
          const category = template.template_category || 'Uncategorized';
          acc[category] = true;
          return acc;
        }, {}))
      );
    }
  }, [templates, error, isLoading]);

  // Group templates by category
  const templatesByCategory = React.useMemo(() => {
    return templates.reduce((acc, template) => {
      const category = template.template_category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(template);
      return acc;
    }, {});
  }, [templates]);

  const handleUseTemplate = (template) => {
    setSelectedTemplate({
      ...template,
      title: template.title + ' (Copy)',
      is_template: false
    });
    setIsCreatePromptOpen(true);
  };

  if (error) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold">Error loading templates</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Templates
          </h1>
        </div>
      </div>

      {Object.entries(templatesByCategory).length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No templates found</p>
        </div>
      ) : (
        Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-semibold">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleUseTemplate(template)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between">
                      <span>{template.title}</span>
                      <Copy className="h-4 w-4 text-gray-500" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {template.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}

      <CreatePromptSheet
        isOpen={isCreatePromptOpen}
        onOpenChange={setIsCreatePromptOpen}
        initialData={selectedTemplate}
      />
    </div>
  );
};

export default Templates;