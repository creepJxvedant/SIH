
'use client';

import { useState } from 'react';
import { format } from 'date-fns';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState('');
  const [postDate, setPostDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleCreateQuiz = () => {
    if (!title || !questions || !postDate) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please fill out all fields to create a quiz.',
      });
      return;
    }
    toast({
      title: 'Quiz Created!',
      description: `"${title}" has been scheduled to post on ${format(postDate, 'PPP')}.`,
    });
    setTitle('');
    setQuestions('');
    setPostDate(new Date());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Design a New Quiz</CardTitle>
        <CardDescription>
          Create a new quiz or test and schedule it for your students.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="quiz-title">Quiz Title</Label>
          <Input
            id="quiz-title"
            placeholder="e.g., Algebra Midterm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quiz-questions">Questions</Label>
          <Textarea
            id="quiz-questions"
            placeholder="Enter each question on a new line..."
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            rows={5}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="post-date">Schedule Post Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !postDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {postDate ? format(postDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={postDate}
                onSelect={setPostDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCreateQuiz} className="w-full">
          <Send className="mr-2" />
          Create & Schedule Quiz
        </Button>
      </CardFooter>
    </Card>
  );
}
