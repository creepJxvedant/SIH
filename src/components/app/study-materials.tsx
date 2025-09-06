
'use client';

import { useState } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Presentation, Video, Search, Download, Play } from 'lucide-react';
import Image from 'next/image';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

const allMaterials = [
  {
    id: '1',
    title: 'Quantum Physics',
    description: 'PDF notes for the introductory chapter.',
    type: 'PDF',
    icon: <FileText className="w-8 h-8 text-white" />,
    image: 'https://picsum.photos/400/300?random=1',
    hint: 'science book',
    uploadedBy: 'Dr. Evelyn Reed',
    className: 'Physics 101',
  },
  {
    id: '2',
    title: 'History of Art',
    description: 'Presentation slides for the Renaissance period.',
    type: 'Slides',
    icon: <Presentation className="w-8 h-8 text-white" />,
    image: 'https://picsum.photos/400/300?random=2',
    hint: 'art history',
    uploadedBy: 'Prof. Anderson',
    className: 'Art History 203',
  },
  {
    id: '3',
    title: 'Calculus Explained',
    description: 'Recorded video lecture on differentiation.',
    type: 'Video',
    icon: <Video className="w-8 h-8 text-white" />,
    image: 'https://picsum.photos/400/300?random=3',
    hint: 'math blackboard',
    uploadedBy: 'Dr. Evelyn Reed',
    className: 'Math 201',
    videoUrl: '/videos/placeholder.mp4'
  },
  {
    id: '4',
    title: 'Intro to Python',
    description: 'Beginner-friendly PDF guide to Python.',
    type: 'PDF',
    icon: <FileText className="w-8 h-8 text-white" />,
    image: 'https://picsum.photos/400/300?random=4',
    hint: 'code computer',
    uploadedBy: 'Dr. Evelyn Reed',
    className: 'CS 101',
  },
  {
    id: '5',
    title: 'The Solar System',
    description: 'Slideshow of planets and celestial bodies.',
    type: 'Slides',
    icon: <Presentation className="w-8 h-8 text-white" />,
    image: 'https://picsum.photos/400/300?random=5',
    hint: 'galaxy space',
    uploadedBy: 'Prof. Anderson',
    className: 'Astronomy 101',
  },
  {
    id: '6',
    title: 'Creative Writing',
    description: 'Video on storytelling techniques.',
    type: 'Video',
    icon: <Video className="w-8 h-8 text-white" />,
    image: 'https://picsum.photos/400/300?random=6',
    hint: 'writing notebook',
    uploadedBy: 'Prof. Davis',
    className: 'English 102',
    videoUrl: '/videos/placeholder.mp4'
  },
];

export function StudyMaterials() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredMaterials = allMaterials.filter((material) =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCardClick = (material: typeof allMaterials[0]) => {
      if (material.type === 'Video') {
          router.push(`/dashboard/study-materials/${material.id}`);
      } else {
          // Handle download for other file types
          console.log(`Downloading ${material.title}`);
      }
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold font-headline">Study Materials</h2>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search materials..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMaterials.map((material) => (
          <Card
            key={material.title}
            onClick={() => handleCardClick(material)}
            className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <Image
              src={material.image}
              alt={material.title}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
              data-ai-hint={material.hint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-4 w-full">
               <CardTitle className="text-xl text-white font-bold mb-1 leading-tight drop-shadow-md">
                    {material.title}
                </CardTitle>
                 <CardDescription className="text-sm text-gray-300 drop-shadow-md">
                    {material.type}
                </CardDescription>
            </div>

            <div className="absolute inset-0 p-4 bg-black/80 flex flex-col justify-center items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-3 mb-4">
                    {material.icon}
                    <CardTitle className="text-2xl text-white font-bold leading-tight">
                        {material.title}
                    </CardTitle>
                </div>
                <p className="text-gray-200 mb-2">{material.description}</p>
                <p className="text-xs text-primary font-semibold mb-1">
                    Class: {material.className}
                </p>
                <p className="text-xs text-primary font-semibold mb-4">
                    Uploaded by: {material.uploadedBy}
                </p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click handler
                    handleCardClick(material)
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {material.type === 'Video' ? (
                      <>
                        <Play className="w-4 h-4" />
                        Play Video
                      </>
                  ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download
                      </>
                  )}
                </button>
            </div>

          </Card>
        ))}
      </div>
    </section>
  );
}
