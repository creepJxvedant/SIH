
'use client';
import { TeacherProfile } from '@/components/app/teacher-profile';
import { SecuritySettings } from '@/components/app/security-settings';
import { Header } from '@/componentsapp//header';

export default function SettingsPage() {
    return (
        <div className="flex flex-col w-full">
            <Header role="teacher" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <h2 className="text-3xl font-bold mb-6 font-headline">
                    Settings
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                    <TeacherProfile />
                    <SecuritySettings />
                </div>
            </main>
        </div>
    );
}
