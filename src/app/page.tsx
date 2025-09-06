
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { GraduationCap, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Role } from '@/lib/types';

const TEACHER_SECRET = 'SUPER_SECRET_KEY'; // In a real app, this would be an environment variable

export default function LoginPage() {
  const [role, setRole] = useState<Role>('student');
  const [teacherSecret, setTeacherSecret] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = () => {
    if (role === 'teacher' && teacherSecret !== TEACHER_SECRET) {
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: 'The provided Teacher Secret is incorrect.',
      });
      return;
    }

    // In a real app, you would handle user authentication here.
    // We'll just store the role in localStorage for this prototype.
    localStorage.setItem('userRole', role);

    toast({
      title: 'Login Successful',
      description: `Redirecting to ${role} dashboard...`,
    });

    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-8">
        <GraduationCap className="size-12 text-primary" />
        <h1 className="text-5xl font-bold">EduNow</h1>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome Back!</CardTitle>
          <CardDescription>Select your role to sign in.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>I am a...</Label>
            <RadioGroup
              defaultValue="student"
              onValueChange={(value: Role) => setRole(value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="cursor-pointer">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="teacher" id="teacher" />
                <Label htmlFor="teacher" className="cursor-pointer">
                  Teacher
                </Label>
              </div>
            </RadioGroup>
          </div>
          {role === 'teacher' && (
            <div className="space-y-2 animate-in fade-in-0 duration-300">
              <Label htmlFor="teacher-secret">Teacher Secret</Label>
              <Input
                id="teacher-secret"
                type="password"
                placeholder="Enter your secret key"
                value={teacherSecret}
                onChange={(e) => setTeacherSecret(e.target.value)}
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} className="w-full">
            <LogIn className="mr-2" />
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
