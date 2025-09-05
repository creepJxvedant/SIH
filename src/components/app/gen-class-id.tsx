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
import { Copy, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';

export function GenClassId() {
  const [classId, setClassId] = useState('');
  const { toast } = useToast();

  const generateClassId = () => {
    const newId = Math.random().toString(36).substring(2, 10).toUpperCase();
    setClassId(newId);
  };

  const copyToClipboard = () => {
    if (!classId) return;
    navigator.clipboard.writeText(classId);
    toast({
      title: 'Copied!',
      description: 'Class ID copied to clipboard.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Class ID</CardTitle>
        <CardDescription>
          Create a unique ID for your live class session.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {classId ? (
          <div className="flex items-center space-x-2">
            <Input value={classId} readOnly className="font-mono text-lg" />
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
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
      <CardFooter>
        <Button onClick={generateClassId} className="w-full">
          {classId ? 'Generate New ID' : 'Generate Class ID'}
        </Button>
      </CardFooter>
    </Card>
  );
}
