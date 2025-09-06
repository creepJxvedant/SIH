
'use client';
import { Header } from '@/components/app/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Presentation, Trash2, Video } from 'lucide-react';

const downloadedItems = [
    {
        id: '1',
        title: 'Quantum Physics',
        type: 'PDF',
        icon: <FileText className="w-5 h-5" />,
        size: '2.5 MB',
        downloadedAt: '2 days ago',
    },
    {
        id: '2',
        title: 'History of Art',
        type: 'Slides',
        icon: <Presentation className="w-5 h-5" />,
        size: '10.1 MB',
        downloadedAt: '1 day ago',
    },
     {
        id: '3',
        title: 'Calculus Explained',
        type: 'Video',
        icon: <Video className="w-5 h-5" />,
        size: '50.8 MB',
        downloadedAt: '5 hours ago',
    },
];

export default function DownloadsPage() {
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
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {downloadedItems.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium flex items-center gap-2">
                                            {item.icon} {item.title}
                                        </TableCell>
                                        <TableCell>{item.type}</TableCell>
                                        <TableCell>{item.size}</TableCell>
                                        <TableCell>{item.downloadedAt}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="icon">
                                                <ExternalLink className="w-4 h-4" />
                                                <span className="sr-only">Open</span>
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
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
