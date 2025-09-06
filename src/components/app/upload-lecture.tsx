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
import { Loader2, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function UploadLecture() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

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

    setIsProcessing(true);
    setError(null);
    
    // Mock processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: 'Success!',
      description: 'Lecture uploaded successfully.',
    });

    setIsProcessing(false);
    setTitle('');
    setDescription('');
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Upload Recorded Lecture</CardTitle>
        <CardDescription>
          Upload a lecture for your students to view.
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
          {error && (
             <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}
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
            {isProcessing ? 'Processing...' : 'Upload Lecture'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
