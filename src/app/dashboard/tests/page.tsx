
'use client';
import { AvailableTests } from '@/components/app/available-tests';
import { Header } from '@/components/app/header';

export default function TestsPage() {
    return (
        <div className="flex flex-col w-full">
            <Header role="student" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <AvailableTests />
            </main>
        </div>
    );
}
