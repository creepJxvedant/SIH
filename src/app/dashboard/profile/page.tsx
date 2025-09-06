
'use client';
import { StudentProfile } from '@/components/app/student-profile';
import { Header } from '@/components/app/header';

export default function ProfilePage() {
    return (
        <div className="flex flex-col w-full">
            <Header role="student" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <StudentProfile />
            </main>
        </div>
    );
}
