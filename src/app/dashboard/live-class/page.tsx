
'use client';
import { JoinClass } from '@/components/app/join-class';
import { Header } from '@/components/app/header';

export default function LiveClassPage() {
    return (
        <div className="flex flex-col w-full">
            <Header role="student" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <h2 className="text-3xl font-bold mb-6 font-headline">
                    Live Class
                </h2>
                <JoinClass />
            </main>
        </div>
    );
}
