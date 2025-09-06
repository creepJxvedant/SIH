
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Label } from '../ui/label';

const submissions = [
  {
    id: '1',
    student: {
      name: 'Alice Johnson',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    submittedAt: '2024-05-10',
    status: 'Graded',
    score: '85/100',
  },
  {
    id: '2',
    student: {
      name: 'Bob Williams',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    },
    submittedAt: '2024-05-11',
    status: 'Graded',
    score: '92/100',
  },
  {
    id: '3',
    student: {
      name: 'Charlie Brown',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    },
    submittedAt: '2024-05-11',
    status: 'Pending',
    score: '-',
  },
   {
    id: '4',
    student: {
      name: 'Diana Miller',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a',
    },
    submittedAt: '2024-05-12',
    status: 'Graded',
    score: '98/100',
  },
];

export function ViewSubmissions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Submissions</CardTitle>
        <CardDescription>
          View and grade student quiz and test submissions.
        </CardDescription>
         <div className='w-full space-y-2 pt-4'>
              <Label htmlFor="quiz-select">Select Quiz</Label>
              <Select defaultValue="quiz-1">
                <SelectTrigger id="quiz-select">
                  <SelectValue placeholder="Select a quiz to view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quiz-1">Quiz 1: Algebra</SelectItem>
                  <SelectItem value="quiz-2">Quiz 2: Geometry</SelectItem>
                  <SelectItem value="midterm">Algebra Midterm</SelectItem>
                </SelectContent>
              </Select>
            </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={submission.student.avatar} />
                      <AvatarFallback>
                        {submission.student.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">
                      {submission.student.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{submission.submittedAt}</TableCell>
                <TableCell>
                  <Badge
                    variant={submission.status === 'Graded' ? 'secondary' : 'default'}
                     className={submission.status === 'Graded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                  >
                    {submission.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {submission.score}
                </TableCell>
                 <TableCell className="text-center">
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
