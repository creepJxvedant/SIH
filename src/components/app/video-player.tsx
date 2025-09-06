
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import Image from 'next/image';

const mockComments = [
    {
        id: 1,
        user: 'Charlie Brown',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
        comment: 'This was super helpful, thanks Dr. Reed!',
        timestamp: '2 hours ago'
    },
    {
        id: 2,
        user: 'Diana Miller',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a',
        comment: 'Can you explain the last part again?',
        timestamp: '1 hour ago'
    }
];

const mockRelatedVideos = [
    {
        id: 1,
        title: 'Advanced Differentiation',
        thumbnail: 'https://picsum.photos/400/300?random=10',
        hint: 'math equations',
        uploader: 'Dr. Evelyn Reed'
    },
    {
        id: 2,
        title: 'Intro to Integration',
        thumbnail: 'https://picsum.photos/400/300?random=11',
        hint: 'calculus graph',
        uploader: 'Dr. Evelyn Reed'
    }
];

export function VideoPlayer({ videoData }: { videoData: any }) {
    if (!videoData) return <div>Video not found.</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="aspect-video bg-black">
                            {/* In a real app, you'd use a proper video player component */}
                           <video src={videoData.videoUrl} controls className="w-full h-full" autoPlay>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </CardContent>
                </Card>
                <div className="py-4">
                    <h1 className="text-2xl font-bold font-headline">{videoData.title}</h1>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                        <span>1,234 views &bull; 2 days ago</span>
                        <div className="flex items-center gap-4">
                             <Button variant="ghost" size="sm"><ThumbsUp className="mr-2"/> 123</Button>
                             <Button variant="ghost" size="sm"><Share2 className="mr-2"/> Share</Button>
                        </div>
                    </div>
                    <Separator className="my-4"/>
                    <div className="flex items-start gap-4">
                        <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704g" />
                            <AvatarFallback>ER</AvatarFallback>
                        </Avatar>
                        <div>
                             <h3 className="font-semibold">{videoData.uploadedBy}</h3>
                             <p className="text-sm text-muted-foreground">{videoData.className}</p>
                        </div>
                    </div>
                     <p className="mt-4 text-sm">{videoData.description}</p>
                </div>
                 <Separator className="my-4"/>
                {/* Comments Section */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Comments</h2>
                    <div className="flex items-center gap-4 mb-6">
                        <Avatar>
                             <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <Input placeholder="Add a comment..." />
                        <Button>Comment</Button>
                    </div>
                    <div className="space-y-4">
                        {mockComments.map(comment => (
                            <div key={comment.id} className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={comment.avatar} />
                                    <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-sm">{comment.user}</p>
                                        <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                                    </div>
                                    <p className="text-sm">{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <aside className="space-y-4">
                 <h2 className="text-xl font-bold font-headline">Up Next</h2>
                 {mockRelatedVideos.map(video => (
                    <Card key={video.id} className="overflow-hidden hover:bg-muted/50 cursor-pointer">
                        <div className="flex gap-4">
                             <div className="w-1/3">
                                <Image 
                                    src={video.thumbnail}
                                    alt={video.title}
                                    width={160}
                                    height={90}
                                    className="object-cover w-full h-full"
                                    data-ai-hint={video.hint}
                                />
                            </div>
                            <div className="w-2/3 p-2">
                                <h4 className="font-semibold text-sm leading-tight">{video.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{video.uploader}</p>
                            </div>
                        </div>
                    </Card>
                 ))}
            </aside>
        </div>
    );
}
