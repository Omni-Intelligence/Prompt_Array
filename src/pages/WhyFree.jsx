import { Card, CardContent } from "@/components/ui/card";

export default function WhyFree() {
  return (
    <div className="container max-w-6xl py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Why is Prompt Array Free?
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We believe in democratizing AI technology and showing what's possible with
          modern prompt engineering tools.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Democratizing Section */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">
              Democratizing Prompt Engineering
            </h2>
            <p className="text-muted-foreground">
              We're passionate about making AI prompt engineering accessible to everyone. 
              Today, you can create and manage prompts 10x faster and more efficiently 
              than ever before. Prompt Array is a living example of how technology 
              should be accessible to all.
            </p>
          </CardContent>
        </Card>

        {/* Empowering Section */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">
              Empowering Through Education
            </h2>
            <p className="text-muted-foreground">
              Our mission is to help you build better AI prompts through our 
              learning content, community, and technology. We believe in empowering 
              users with the knowledge to create their own AI solutions and improve 
              their workflow.
            </p>
          </CardContent>
        </Card>

        {/* Community Section */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">
              Community First
            </h2>
            <p className="text-muted-foreground">
              We believe in giving back to our community. By making Prompt Array free, 
              we're enabling creators and businesses of all sizes to experience the 
              power of modern AI technology and prompt engineering.
            </p>
          </CardContent>
        </Card>

        {/* Enterprise DNA Section */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-muted-foreground">
              As part of our commitment to innovation, Prompt Array showcases the 
              latest in AI prompt management and organization. We demonstrate our 
              commitment to innovation and accessibility by making these tools 
              available to everyone.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
