
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileText, Presentation, Video } from 'lucide-react';
import Image from 'next/image';

const materials = [
  {
    title: 'Quantum Physics',
    description: 'PDF notes for the introductory chapter.',
    icon: <FileText className="w-6 h-6 text-primary" />,
    image: 'https://picsum.photos/400/200?random=1',
    hint: 'science book',
  },
  {
    title: 'History of Art',
    description: 'Presentation slides for the Renaissance period.',
    icon: <Presentation className="w-6 h-6 text-primary" />,
    image: 'https://picsum.photos/400/200?random=2',
    hint: 'art history',
  },
  {
    title: 'Calculus Explained',
    description: 'Recorded video lecture on differentiation.',
    icon: <Video className="w-6 h-6 text-primary" />,
    image: 'https://picsum.photos/400/200?random=3',
    hint: 'math blackboard',
  },
    {
    title: 'Intro to Python',
    description: 'Beginner-friendly PDF guide to Python.',
    icon: <FileText className="w-6 h-6 text-primary" />,
    image: 'https://picsum.photos/400/200?random=4',
    hint: 'code computer',
  },
  {
    title: 'The Solar System',
    description: 'Slideshow of planets and celestial bodies.',
    icon: <Presentation className="w-6 h-6 text-primary" />,
    image: 'https://picsum.photos/400/200?random=5',
    hint: 'galaxy space',
  },
  {
    title: 'Creative Writing',
    description: 'Video on storytelling techniques.',
    icon: <Video className="w-6 h-6 text-primary" />,
    image: 'https://picsum.photos/400/200?random=6',
    hint: 'writing notebook',
  },
];

export function StudyMaterials() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 font-headline">
        Shared Materials
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {materials.map((material) => (
          <Card key={material.title} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <Image
                src={material.image}
                alt={material.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
                data-ai-hint={material.hint}
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div>{material.icon}</div>
                <div className='flex-1'>
                  <CardTitle className="text-lg mb-1 leading-tight">
                    {material.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {material.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
