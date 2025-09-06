
'use client';
import { StudentAnalytics } from '@/components/app/student-analytics';
import { Header } from '@/components/app/header';

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col w-full">
            <Header role="student" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <StudentAnalytics />
            </main>
        </div>
    );
}
