
'use client';

import { Header } from '@/components/app/header';
import { TestTaker } from '@/components/app/test-taker';
import { useParams } from 'next/navigation';

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


export default function TestPage() {
    const params = useParams();
    const testId = params.id as keyof typeof tests;
    const testData = testId ? tests[testId] : null;
    
    return (
        <div className="flex flex-col w-full h-screen bg-background">
            <Header role="student" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                {testData ? (
                     <TestTaker testData={testData} />
                ) : (
                    <div className="text-center text-muted-foreground">
                        Test not found.
                    </div>
                )}
            </main>
        </div>
    );
}
