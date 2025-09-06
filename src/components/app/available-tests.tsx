
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
import { FileText, Timer, PlayCircle, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const liveTests = [
  {
    id: 'quiz-1',
    title: 'Algebra Midterm',
    subject: 'Mathematics',
    questions: 3,
    duration: 60, // in minutes
  },
  {
    id: 'quiz-2',
    title: 'Quantum Physics Fundamentals',
    subject: 'Physics',
    questions: 2,
    duration: 45,
  },
];

export function AvailableTests() {
  const [completedTests, setCompletedTests] = useState<string[]>([]);

  useEffect(() => {
    // Initial load from localStorage
    const storedSubmissions = localStorage.getItem('submittedTests');
    if (storedSubmissions) {
      setCompletedTests(JSON.parse(storedSubmissions));
    }
    
    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
        // When the "submittedTests" item changes, update the state
        if (event.key === 'submittedTests' && event.newValue) {
            setCompletedTests(JSON.parse(event.newValue));
        }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };

  }, []);

  const handleStartTest = (testId: string) => {
    // Open the test in a new, focused window.
    // The test page itself will handle the fullscreen request.
    const testWindow = window.open(`/test-session/${testId}`, '_blank', 'noopener,noreferrer,width=1200,height=800');
    testWindow?.focus();
  };

  const isTestCompleted = (testId: string) => {
    return completedTests.includes(testId);
  }

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
                onClick={() => handleStartTest(test.id)}
                disabled={isTestCompleted(test.id)}
              >
                {isTestCompleted(test.id) ? (
                    <>
                        <CheckCircle className="mr-2"/>
                        Completed
                    </>
                ) : (
                    <>
                        <PlayCircle className="mr-2" />
                        Start Test
                    </>
                )}
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
