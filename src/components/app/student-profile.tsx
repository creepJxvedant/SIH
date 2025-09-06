
'use client';

import { useState } from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Save, Mail, Phone, Book } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Alex Doe');
  const [email, setEmail] = useState('alex.doe@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your information has been saved successfully.',
    });
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 mt-12 font-headline">
        Your Profile
      </h2>
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          {isEditing ? (
            <Input
              className="text-2xl font-bold text-center"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <CardTitle className="text-2xl">{name}</CardTitle>
          )}
          <CardDescription>Computer Science Student</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-muted-foreground" />
            {isEditing ? (
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            ) : (
              <p className="text-foreground">{email}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-5 h-5 text-muted-foreground" />
            {isEditing ? (
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            ) : (
              <p className="text-foreground">{phone}</p>
            )}
          </div>
           <div className="flex items-center gap-4">
            <Book className="w-5 h-5 text-muted-foreground" />
            <p className="text-foreground">Enrolled in 5 courses</p>
          </div>
        </CardContent>
        <CardFooter>
          {isEditing ? (
            <Button onClick={handleSave} className="w-full">
              <Save className="mr-2" />
              Save Changes
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="w-full"
            >
              <Edit className="mr-2" />
              Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </section>
  );
}
