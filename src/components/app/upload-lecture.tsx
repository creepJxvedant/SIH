'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, UploadCloud } from 'lucide-react';
import { useFlow } from '@genkit-ai/next';
import { autoTagRecordedLecture } from '@/ai/flows/auto-tag-recorded-lectures';
import { generateSummaryAndHighlights } from '@/ai/flows/lecture-summary-and-highlights';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function UploadLecture() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { toast } = useToast();

  const {
    run: runTagging,
    data: taggingResult,
    state: taggingState,
    error: taggingError,
  } = useFlow(autoTagRecordedLecture);
  const {
    run: runSummary,
    data: summaryResult,
    state: summaryState,
    error: summaryError,
  } = useFlow(generateSummaryAndHighlights);

  const isProcessing =
    taggingState === 'running' || summaryState === 'running';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !description) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please provide a title and description.',
      });
      return;
    }

    // A mock transcript for demonstration purposes
    const mockTranscript = `This lecture covers the fundamentals of ${title}. We will explore topics such as ${description}.`;
    const mockVideoUrl = 'https://example.com/lecture.mp4';

    runTagging({
      lectureTitle: title,
      lectureDescription: description,
      transcript: mockTranscript,
    });
    runSummary({
      lectureVideoUrl: mockVideoUrl,
    });
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Upload Recorded Lecture</CardTitle>
        <CardDescription>
          Upload a lecture and get AI-powered tags and summary.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lecture-title">Lecture Title</Label>
            <Input
              id="lecture-title"
              placeholder="e.g., Introduction to Quantum Mechanics"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isProcessing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lecture-description">Description</Label>
            <Textarea
              id="lecture-description"
              placeholder="Briefly describe the lecture content..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isProcessing}
            />
          </div>
          {taggingResult && (
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle>Generated Tags</AlertTitle>
              <AlertDescription className="flex flex-wrap gap-2 pt-2">
                {taggingResult.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </AlertDescription>
            </Alert>
          )}
          {summaryResult && (
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle>Summary & Highlights</AlertTitle>
              <AlertDescription className="space-y-2 pt-2">
                <p><strong>Summary:</strong> {summaryResult.summary}</p>
                <p><strong>Highlights:</strong> {summaryResult.highlights}</p>
              </AlertDescription>
            </Alert>
          )}
          {(taggingError || summaryError) && (
             <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {taggingError?.message || summaryError?.message || "An unexpected error occurred."}
                </AlertDescription>
              </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UploadCloud className="mr-2 h-4 w-4" />
            )}
            {isProcessing ? 'Processing...' : 'Upload & Analyze'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
