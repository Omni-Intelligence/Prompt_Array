import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, BookOpen, GitFork } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTemplates } from "@/services/templates";
import CreatePromptSheet from "@/components/CreatePromptSheet";
import { useState } from "react";

const Templates = () => {
  const navigate = useNavigate();
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const { data: templates, isLoading, error } = useQuery({
    queryKey: ['templates'],
    queryFn: getTemplates
  });

  if (error) {
    toast.error('Failed to load templates');
  }

  const handleForkTemplate = (template) => {
    setSelectedTemplate({
      ...template,
      title: `${template.title} (Fork)`,
      isPublic: false,
      tags: [],
    });
    setIsCreateSheetOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Prompt Templates</h1>
      </div>
      
      <div className="mb-6">
        <p className="text-muted-foreground">
          Browse our collection of high-quality prompt templates. Fork any template to create your own version.
        </p>
      </div>

      <CreatePromptSheet
        isOpen={isCreateSheetOpen}
        onOpenChange={setIsCreateSheetOpen}
        initialData={selectedTemplate}
      />

      <ScrollArea className="h-[calc(100vh-200px)]">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading templates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates?.map((template) => (
              <Card key={template.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {template.title}
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{template.content}</p>
                  <div className="mt-2">
                    <Badge variant="secondary">{template.category}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button
                    className="w-full"
                    onClick={() => handleForkTemplate(template)}
                  >
                    <GitFork className="h-4 w-4 mr-2" />
                    Fork Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default Templates;