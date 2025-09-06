
'use client';
import { StudentManagement } from '@/components/app/student-management';
import { Header } from '@/components/app/header';

export default function StudentsPage() {
    return (
        <div className="flex flex-col w-full">
            <Header role="teacher" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <h2 className="text-3xl font-bold mb-6 font-headline">
                    Students
                </h2>
                <StudentManagement />
            </main>
        </div>
    );
}
