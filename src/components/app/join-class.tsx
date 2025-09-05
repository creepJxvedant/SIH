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
import { LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function JoinClass() {
  const [classId, setClassId] = useState('');
  const { toast } = useToast();

  const handleJoin = () => {
    if (!classId.trim()) {
      toast({
        variant: 'destructive',
        title: 'Invalid ID',
        description: 'Please enter a valid Class ID.',
      });
      return;
    }
    toast({
      title: 'Joining Class...',
      description: `Attempting to join class with ID: ${classId}`,
    });
    // Here you would typically handle the logic to join a class,
    // e.g., redirecting to a WebRTC session.
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Join a Live Class</CardTitle>
        <CardDescription>
          Enter the Class ID provided by your teacher to join the session.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Enter Class ID"
          value={classId}
          onChange={(e) => setClassId(e.target.value.toUpperCase())}
          className="font-mono text-lg text-center"
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleJoin} className="w-full">
          <LogIn className="mr-2 h-4 w-4" />
          Join Class
        </Button>
      </CardFooter>
    </Card>
  );
}
