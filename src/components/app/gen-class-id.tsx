
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
import { Copy, PartyPopper, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { LiveClassTeacherView } from './live-class-teacher-view';

export function GenClassId() {
  const [classId, setClassId] = useState('');
  const [isClassStarted, setIsClassStarted] = useState(false);
  const { toast } = useToast();

  const generateClassId = () => {
    const newId = Math.random().toString(36).substring(2, 10).toUpperCase();
    setClassId(newId);
    setIsClassStarted(false); // Reset class state when a new ID is generated
  };

  const copyToClipboard = () => {
    if (!classId) return;
    navigator.clipboard.writeText(classId);
    toast({
      title: 'Copied!',
      description: 'Class ID copied to clipboard.',
    });
  };

  const startClass = () => {
    if (classId) {
      setIsClassStarted(true);
    }
  };

  if (isClassStarted) {
    return <LiveClassTeacherView classId={classId} onEndClass={() => setIsClassStarted(false)} />;
  }

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Start a Live Class</CardTitle>
        <CardDescription>
          Generate a unique ID and start your live class session.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {classId ? (
          <div className="flex items-center space-x-2">
            <Input value={classId} readOnly className="font-mono text-lg" />
            <Button variant="outline" size="icon" onClick={copyToClipboard} aria-label="Copy Class ID">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 bg-muted rounded-lg">
            <PartyPopper className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Generate an ID to start a new class.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col sm:flex-row gap-2">
        <Button onClick={generateClassId} className="w-full">
          {classId ? 'Generate New ID' : 'Generate Class ID'}
        </Button>
        {classId && (
          <Button onClick={startClass} className="w-full">
            <Play className="mr-2" />
            Start Class
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
