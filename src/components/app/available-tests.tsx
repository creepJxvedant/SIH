
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Timer, PlayCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const liveTests = [
  {
    id: 'quiz-1',
    title: 'Algebra Midterm',
    subject: 'Mathematics',
    questions: 20,
    duration: 60, // in minutes
  },
  {
    id: 'quiz-2',
    title: 'Quantum Physics Fundamentals',
    subject: 'Physics',
    questions: 15,
    duration: 45,
  },
];

export function AvailableTests() {
  const { toast } = useToast();

  const handleStartTest = (title: string) => {
    toast({
      title: 'Starting Test',
      description: `You are about to begin the ${title} test. Good luck!`,
    });
    // In a real app, this would navigate to the test-taking interface.
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 font-headline">Available Tests</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {liveTests.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <CardTitle>{test.title}</CardTitle>
              <CardDescription>{test.subject}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <FileText className="w-4 h-4 mr-2" />
                <span>{test.questions} Questions</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Timer className="w-4 h-4 mr-2" />
                <span>{test.duration} Minutes</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleStartTest(test.title)}
              >
                <PlayCircle className="mr-2" />
                Start Test
              </Button>
            </CardFooter>
          </Card>
        ))}
        {liveTests.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>No live tests are available at the moment.</p>
                <p>Please check back later.</p>
            </div>
        )}
      </div>
    </section>
  );
}
