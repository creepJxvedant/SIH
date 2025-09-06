
'use client';
import { Header } from '@/components/app/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Play, Presentation, Search, Trash2, Video } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const downloadedItems = [
    {
        id: '1',
        title: 'Quantum Physics',
        type: 'PDF',
        icon: <FileText className="w-5 h-5" />,
        size: '2.5 MB',
        downloadedAt: '2 days ago',
        teacher: 'Dr. Evelyn Reed',
        className: 'Physics 101',
        path: '/path-to-quantum-physics.pdf'
    },
    {
        id: '2',
        title: 'History of Art',
        type: 'Slides',
        icon: <Presentation className="w-5 h-5" />,
        size: '10.1 MB',
        downloadedAt: '1 day ago',
        teacher: 'Prof. Anderson',
        className: 'Art History 203',
        path: '/path-to-history-of-art.ppt'
    },
     {
        id: '3',
        title: 'Calculus Explained',
        type: 'Video',
        icon: <Video className="w-5 h-5" />,
        size: '50.8 MB',
        downloadedAt: '5 hours ago',
        teacher: 'Dr. Evelyn Reed',
        className: 'Math 201',
        path: '/dashboard/study-materials/3'
    },
    {
        id: '6',
        title: 'Creative Writing',
        description: 'Video on storytelling techniques.',
        type: 'Video',
        icon: <Video className="w-8 h-8 text-white" />,
        size: '120.4 MB',
        downloadedAt: '3 days ago',
        teacher: 'Prof. Davis',
        className: 'English 102',
        path: '/dashboard/study-materials/6'
    },
];

export default function DownloadsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const filteredItems = downloadedItems.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.className.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleActionClick = (item: typeof downloadedItems[0]) => {
        if (item.type === 'Video') {
            router.push(item.path);
        } else {
            window.open(item.path, '_blank');
        }
    }

    return (
        <div className="flex flex-col w-full">
            <Header role="student" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                 <h2 className="text-3xl font-bold mb-6 font-headline">
                    Your Downloads
                </h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Downloaded Materials</CardTitle>
                        <CardDescription>All your downloaded lectures and materials in one place.</CardDescription>
                         <div className="relative w-full max-w-md pt-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                placeholder="Search by title, teacher, or class..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Teacher</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredItems.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium flex items-center gap-2">
                                            {item.icon} {item.title}
                                        </TableCell>
                                        <TableCell>{item.teacher}</TableCell>
                                        <TableCell>{item.className}</TableCell>
                                        <TableCell>{item.size}</TableCell>
                                        <TableCell>{item.downloadedAt}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                             <Button variant="outline" size="icon" onClick={() => handleActionClick(item)}>
                                                {item.type === 'Video' ? <Play className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                                                <span className="sr-only">{item.type === 'Video' ? 'Play' : 'Open'}</span>
                                            </Button>
                                             <Button variant="destructive" size="icon">
                                                <Trash2 className="w-4 h-4" />
                                                 <span className="sr-only">Delete</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         {filteredItems.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                No downloaded materials match your search.
                            </div>
                         )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
