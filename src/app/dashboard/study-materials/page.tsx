
'use client';

import { StudyMaterials } from '@/components/app/study-materials';
import { Header } from '@/components/app/header';

export default function StudyMaterialsPage() {
  return (
    <div className="flex flex-col w-full">
      <Header role="student" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <StudyMaterials />
      </main>
    </div>
  );
}
