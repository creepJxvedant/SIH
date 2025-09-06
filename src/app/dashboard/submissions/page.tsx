
'use client';
import { ViewSubmissions } from '@/components/app/view-submissions';
import { Header } from '@/components/app/header';

export default function SubmissionsPage() {
    return (
        <div className="flex flex-col w-full">
            <Header role="teacher" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <h2 className="text-3xl font-bold mb-6 font-headline">
                    Submissions
                </h2>
                <ViewSubmissions />
            </main>
        </div>
    );
}
