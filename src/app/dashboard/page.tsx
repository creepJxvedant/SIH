
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
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {role === 'teacher' ? (
            <>
              <GenClassId />
              <UploadLecture />
            </>
          ) : (
            <JoinClass />
          )}
        </div>
        <StudyMaterials />
      </main>
    </div>
  );
}
