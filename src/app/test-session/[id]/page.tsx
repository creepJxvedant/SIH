
'use client';

import { TestTaker } from '@/components/app/test-taker';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

const tests = {
    'quiz-1': {
        id: 'quiz-1',
        title: 'Algebra Midterm',
        questions: [
            { id: 1, text: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' },
            { id: 2, text: 'What is the square root of 16?', options: ['2', '4', '8', '16'], answer: '4' },
            { id: 3, text: 'Solve for x: 2x - 5 = 15', options: ['5', '10', '15', '20'], answer: '10' },
        ],
    },
    'quiz-2': {
        id: 'quiz-2',
        title: 'Quantum Physics Fundamentals',
        questions: [
            { id: 1, text: 'Who proposed the principle of wave-particle duality?', options: ['Einstein', 'Planck', 'de Broglie', 'Bohr'], answer: 'de Broglie' },
            { id: 2, text: 'What is the charge of an electron?', options: ['Positive', 'Negative', 'Neutral', 'Variable'], answer: 'Negative' },
        ],
    },
};


export default function TestSessionPage() {
    const params = useParams();
    const testId = params.id as keyof typeof tests;
    const testData = testId ? tests[testId] : null;
    
    if (!testData) {
         return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="text-center text-muted-foreground">
                    <p className='text-xl'>Test not found or invalid ID.</p>
                    <p>This window can be closed.</p>
                </div>
            </div>
        );
    }
    
    return <TestTaker testData={testData} />;
}
