'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { GenClassId } from '@/components/app/gen-class-id';
import { UploadLecture } from '@/components/app/upload-lecture';
import { JoinClass } from '@/components/app/join-class';
import { StudyMaterials } from '@/components/app/study-materials';

export type Role = 'student' | 'teacher';

export default function Home() {
  const [role, setRole] = useState<Role>('student');

  return (
    <div className="flex flex-col w-full">
      <Header role={role} setRole={setRole} />
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
