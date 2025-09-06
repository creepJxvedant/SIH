
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Send, PlusCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number | null;
}

export function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, questionText: '', options: ['', '', '', ''], correctAnswerIndex: null },
  ]);
  const [postDate, setPostDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleQuestionChange = (index: number, field: 'questionText' | 'options', value: string, optionIndex?: number) => {
    const newQuestions = [...questions];
    if (field === 'options' && optionIndex !== undefined) {
      newQuestions[index].options[optionIndex] = value;
    } else if (field === 'questionText') {
      newQuestions[index].questionText = value;
    }
    setQuestions(newQuestions);
  };
  
  const handleCorrectAnswerChange = (questionIndex: number, correctIndex: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswerIndex = parseInt(correctIndex);
    setQuestions(newQuestions);
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), questionText: '', options: ['', '', '', ''], correctAnswerIndex: null },
    ]);
  };
  
  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  }

  const handleCreateQuiz = () => {
    if (!title || !postDate) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please provide a title and a post date.',
      });
      return;
    }
    for (const q of questions) {
        if (!q.questionText || q.options.some(opt => !opt) || q.correctAnswerIndex === null) {
             toast({
                variant: 'destructive',
                title: 'Incomplete Question',
                description: 'Please fill out all fields for each question and select a correct answer.',
            });
            return;
        }
    }
    toast({
      title: 'Quiz Created!',
      description: `"${title}" has been scheduled to post on ${format(postDate, 'PPP')}.`,
    });
    setTitle('');
    setQuestions([{ id: 1, questionText: '', options: ['', '', '', ''], correctAnswerIndex: null }]);
    setPostDate(new Date());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Design a New MCQ Quiz</CardTitle>
        <CardDescription>
          Create a multiple-choice quiz and schedule it for your students.
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
        
        {questions.map((q, index) => (
            <div key={q.id} className="p-4 border rounded-lg space-y-4 relative">
                 <Label className="font-semibold">Question {index + 1}</Label>
                 <Input 
                    placeholder="Enter the question text"
                    value={q.questionText}
                    onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
                 />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <RadioGroup onValueChange={(value) => handleCorrectAnswerChange(index, value)} value={q.correctAnswerIndex?.toString()}>
                        {q.options.map((opt, optIndex) => (
                           <div key={optIndex} className="flex items-center gap-2">
                               <RadioGroupItem value={optIndex.toString()} id={`q${index}-opt${optIndex}`} />
                               <Input 
                                placeholder={`Option ${optIndex + 1}`}
                                value={opt}
                                onChange={(e) => handleQuestionChange(index, 'options', e.target.value, optIndex)}
                               />
                           </div>
                        ))}
                     </RadioGroup>
                 </div>
                 {questions.length > 1 && (
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeQuestion(index)}>
                        <XCircle className="w-5 h-5 text-destructive" />
                    </Button>
                 )}
            </div>
        ))}
        
        <Button variant="outline" onClick={addQuestion}>
            <PlusCircle className="mr-2"/>
            Add Another Question
        </Button>

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
