import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { History, RotateCcw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PromptVersionHistory = ({ versions, currentVersion, onRestoreVersion }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          Version History
        </CardTitle>
        <CardDescription>
          View and restore previous versions of this prompt
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {versions.map((version, index) => (
              <div
                key={version.id}
                className={`p-4 rounded-lg border ${
                  version.version === currentVersion
                    ? 'bg-primary/10 border-primary'
                    : 'bg-background border-border'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">Version {version.version}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(version.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  {version.version !== currentVersion && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRestoreVersion(version)}
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Restore
                    </Button>
                  )}
                </div>
                {version.changeDescription && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {version.changeDescription}
                  </p>
                )}
                <div className="text-sm bg-muted p-2 rounded">
                  <pre className="whitespace-pre-wrap font-mono">{version.content}</pre>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PromptVersionHistory;