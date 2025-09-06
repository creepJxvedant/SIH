
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/app/header';
import { GenClassId } from '@/components/app/gen-class-id';
import { UploadLecture } from '@/components/app/upload-lecture';
import { JoinClass } from '@/components/app/join-class';
import { StudyMaterials } from '@/components/app/study-materials';
import type { Role } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { StudentAnalytics } from '@/components/app/student-analytics';
import { StudentProfile } from '@/components/app/student-profile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentManagement } from '@/components/app/student-management';

export default function DashboardPage() {
  const [role, setRole] = useState<Role | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') as Role | null;
    if (!storedRole) {
      router.push('/');
    } else {
      setRole(storedRole);
    }
  }, [router]);

  if (!role) {
    return (
      <div className="flex flex-col w-full">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-24 ml-auto" />
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-48 rounded-lg" />
            <Skeleton className="h-48 rounded-lg" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <Header role={role} />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-12">
        {role === 'teacher' ? (
          <>
            <div id="dashboard">
               <h2 className="text-3xl font-bold mb-6 font-headline">
                Dashboard
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <GenClassId />
                <UploadLecture />
              </div>
              <div className="mt-12">
                <StudyMaterials />
              </div>
            </div>

            <div id="students">
               <h2 className="text-3xl font-bold mb-6 font-headline">
                Students
              </h2>
               <StudentManagement />
            </div>

            <div id="settings">
               <h2 className="text-3xl font-bold mb-6 font-headline">
                Settings
              </h2>
               <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Teacher account settings and preferences will be available here.</p>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <>
            <div id="live-class">
              <h2 className="text-3xl font-bold mb-6 font-headline">
                Live Class
              </h2>
              <JoinClass />
            </div>
            <div id="study-materials">
              <StudyMaterials />
            </div>
            <div id="analytics">
              <StudentAnalytics />
            </div>
            <div id="profile">
              <StudentProfile />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
