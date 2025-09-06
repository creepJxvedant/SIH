
'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Video, Mic, MicOff, VideoOff, PhoneOff, Copy } from 'lucide-react';

interface LiveClassTeacherViewProps {
  classId: string;
  onEndClass: () => void;
}

export function LiveClassTeacherView({ classId, onEndClass }: LiveClassTeacherViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
      // Cleanup: Stop media tracks when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [toast]);

  const toggleMic = () => {
    if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getAudioTracks().forEach(track => {
            track.enabled = !isMicOn;
        });
        setIsMicOn(!isMicOn);
    }
  };

  const toggleCamera = () => {
     if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getVideoTracks().forEach(track => {
            track.enabled = !isCameraOn;
        });
        setIsCameraOn(!isCameraOn);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(classId);
    toast({
      title: 'Copied!',
      description: 'Class ID copied to clipboard.',
    });
  };

  return (
    <Card className="lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            Live Class In Session
          </CardTitle>
          <CardDescription>Your classroom is now live.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-sm font-mono bg-muted px-2 py-1 rounded-md">{classId}</span>
            <Button variant="ghost" size="icon" onClick={copyToClipboard} aria-label="Copy Class ID">
                <Copy className="w-4 h-4"/>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-black rounded-md flex items-center justify-center relative">
          <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
          {hasCameraPermission === false && (
            <Alert variant="destructive" className="w-auto absolute">
              <VideoOff className="w-4 h-4" />
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access to use this feature.
              </AlertDescription>
            </Alert>
          )}
           {!isCameraOn && (
             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
                <div className="text-center text-white">
                    <VideoOff className="w-16 h-16 mx-auto mb-4"/>
                    <p>Camera is off</p>
                </div>
            </div>
           )}
        </div>
      </CardContent>
      <CardFooter className="flex-col sm:flex-row gap-2 justify-center">
        <Button variant={isMicOn ? "outline" : "secondary"} onClick={toggleMic}>
          {isMicOn ? <Mic className="mr-2" /> : <MicOff className="mr-2" />}
          {isMicOn ? 'Mute' : 'Unmute'}
        </Button>
        <Button variant={isCameraOn ? "outline" : "secondary"} onClick={toggleCamera}>
          {isCameraOn ? <Video className="mr-2" /> : <VideoOff className="mr-2" />}
          {isCameraOn ? 'Stop Camera' : 'Start Camera'}
        </Button>
        <Button variant="destructive" onClick={onEndClass}>
          <PhoneOff className="mr-2" />
          End Class
        </Button>
      </CardFooter>
    </Card>
  );
}
