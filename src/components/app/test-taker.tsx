
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { AlertTriangle, Check, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';


interface Question {
    id: number;
    text: string;
    options: string[];
    answer: string;
}

interface TestData {
    id: string;
    title: string;
    questions: Question[];
}

interface TestTakerProps {
    testData: TestData;
}

export function TestTaker({ testData }: TestTakerProps) {
    const { toast } = useToast();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [leaveCount, setLeaveCount] = useState(0);
    const testContainerRef = useRef<HTMLDivElement>(null);
    const [isTestStarted, setIsTestStarted] = useState(false);

    const enterFullScreen = useCallback(() => {
        const element = testContainerRef.current;
        if (element) {
            if (element.requestFullscreen) {
                element.requestFullscreen().catch(err => console.error(err));
            }
        }
    }, []);

    const exitFullScreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    };
    
    const handleStartTest = () => {
        setIsTestStarted(true);
        enterFullScreen();
    }

    const handleAnswerChange = (questionId: number, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < testData.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };
    
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    }

    const handleSubmit = () => {
        exitFullScreen();
        toast({
            title: 'Test Submitted!',
            description: `Your answers for "${testData.title}" have been submitted.`,
        });
    };

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden' && isFullScreen) {
                setLeaveCount(prev => {
                    const newCount = prev + 1;
                    if (newCount > 3) {
                        toast({
                            variant: 'destructive',
                            title: 'Cheating Flagged',
                            description: 'You have switched tabs too many times. This attempt will be flagged.',
                        });
                    } else if (newCount > 0) {
                         toast({
                            variant: 'destructive',
                            title: 'Warning: Tab Switch Detected',
                            description: `You have switched tabs ${newCount} time(s). ${3 - newCount} warning(s) left.`,
                        });
                    }
                    return newCount;
                });
            }
        };

        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
            if (!document.fullscreenElement && isTestStarted) {
                // If user exits fullscreen manually, re-enter it.
                enterFullScreen();
                 toast({
                    variant: 'destructive',
                    title: 'Full-Screen Required',
                    description: 'Please remain in full-screen mode until the test is submitted.',
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('fullscreenchange', handleFullScreenChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
            exitFullScreen();
        };
    }, [toast, isFullScreen, isTestStarted, enterFullScreen]);
    
    if (!isTestStarted) {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>{testData.title}</CardTitle>
                    <CardDescription>
                       This test must be completed in full-screen mode.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert>
                        <ShieldAlert className="h-4 w-4" />
                        <AlertTitle>Attention!</AlertTitle>
                        <AlertDescription>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>The test will start in full-screen mode.</li>
                                <li>Do not exit full-screen until you submit.</li>
                                <li>Switching tabs more than 3 times will flag your test for cheating.</li>
                            </ul>
                        </AlertDescription>
                    </Alert>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleStartTest}>
                        Start Test
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    const currentQuestion = testData.questions[currentQuestionIndex];

    return (
        <div ref={testContainerRef} className="bg-background h-full w-full flex items-center justify-center">
             <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>{testData.title}</span>
                         {leaveCount > 0 && (
                            <span className="flex items-center gap-2 text-sm text-yellow-600">
                                <AlertTriangle className="w-4 h-4"/> {leaveCount} / 3 Warnings
                            </span>
                         )}
                    </CardTitle>
                    <CardDescription>Question {currentQuestionIndex + 1} of {testData.questions.length}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="font-semibold text-lg">{currentQuestion.text}</p>
                    <RadioGroup 
                        value={answers[currentQuestion.id] || ''}
                        onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                    >
                       {currentQuestion.options.map((option, index) => (
                           <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                               <RadioGroupItem value={option} id={`q${currentQuestion.id}-opt${index}`}/>
                               <Label htmlFor={`q${currentQuestion.id}-opt${index}`} className="flex-1 cursor-pointer">{option}</Label>
                           </div>
                       ))}
                    </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                        Previous
                    </Button>
                     {currentQuestionIndex < testData.questions.length - 1 ? (
                        <Button onClick={handleNextQuestion}>
                            Next
                        </Button>
                    ) : (
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                 <Button>
                                    <Check className="mr-2"/>
                                    Submit Test
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You are about to submit your test. This action cannot be undone.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
