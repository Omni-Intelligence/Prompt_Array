import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { ArrowLeft, Star, BookOpen, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const navigate = useNavigate();

  const templates = [
    {
      id: 1,
      title: "Creative Story Generator",
      description: "Generate engaging stories with detailed character development and plot twists",
      content: "Create a story about [protagonist] who discovers [magical item] and must [quest/challenge]. Include detailed descriptions of the setting, character emotions, and at least one unexpected plot twist.",
      category: "Creative Writing",
    },
    {
      id: 2,
      title: "Product Description Writer",
      description: "Create compelling product descriptions that highlight key features and benefits",
      content: "Write a persuasive product description for [product name] that highlights its [key features]. Include sensory details, practical benefits, and a clear call-to-action.",
      category: "Marketing",
    },
    {
      id: 3,
      title: "Blog Post Outline",
      description: "Structure your blog posts with clear sections and engaging hooks",
      content: "Create a detailed blog post outline about [topic] with an attention-grabbing introduction, [number] main sections, relevant examples, and a compelling conclusion.",
      category: "Content Creation",
    },
    {
      id: 4,
      title: "Social Media Caption Generator",
      description: "Generate engaging social media captions with relevant hashtags",
      content: "Write an engaging social media caption for [platform] about [topic/product]. Include emotional hooks, relevant emojis, and [number] trending hashtags.",
      category: "Social Media",
    },
    {
      id: 5,
      title: "Email Newsletter Template",
      description: "Create professional email newsletters that drive engagement",
      content: "Design an email newsletter about [topic/update] with a captivating subject line, [number] main sections, and a clear call-to-action.",
      category: "Email Marketing",
    },
    {
      id: 6,
      title: "SEO Meta Description",
      description: "Write optimized meta descriptions for better search visibility",
      content: "Create an SEO-optimized meta description for [page/content] that includes [primary keyword] and compelling reasons to click, within 155-160 characters.",
      category: "SEO",
    }
  ];

  const handleSaveTemplate = (templateId) => {
    // In a real app, this would save to a backend
    toast.success("Template saved to your library!");
  };

  const handleFavoriteTemplate = (templateId) => {
    // In a real app, this would toggle favorite status
    toast.success("Template added to favorites!");
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
          Browse our collection of high-quality prompt templates. Save your favorites or add them to your library for quick access.
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
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
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleSaveTemplate(template.id)}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleFavoriteTemplate(template.id)}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Favorite
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Templates;