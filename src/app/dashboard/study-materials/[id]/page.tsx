
'use client';

import { Header } from '@/components/app/header';
import { VideoPlayer } from '@/components/app/video-player';
import { FileText, Presentation, Video } from 'lucide-react';


const allMaterials = [
  {
    id: '1',
    title: 'Quantum Physics',
    description: 'PDF notes for the introductory chapter.',
    type: 'PDF',
    icon: <FileText className="w-8 h-8 text-white" />,
    image: 'https://picsum.photos/400/300?random=1',
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
    uploadedBy: 'Dr. Evelyn Reed',
    className: 'Math 201',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: '4',
    title: 'Intro to Python',
    description: 'Beginner-friendly PDF guide to Python.',
    type: 'PDF',
    icon: <FileText className="w-8 h-8 text-white" />,
    image: 'https://picsum.photos/400/300?random=4',
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
    uploadedBy: 'Prof. Davis',
    className: 'English 102',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
];


export default function VideoPlayerPage({ params }: { params: { id: string } }) {
    const videoData = allMaterials.find(m => m.id === params.id && m.type === 'Video');
    
    return (
        <div className="flex flex-col w-full">
            <Header role="student" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <VideoPlayer videoData={videoData} />
            </main>
        </div>
    );
}

