
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '../ui/label';

const students = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    attendance: ['present', 'present', 'absent'],
    quizzes: [
      { name: 'Quiz 1: Algebra', score: 85, total: 100 },
      { name: 'Quiz 2: Geometry', score: 92, total: 100 },
    ],
  },
  {
    id: '2',
    name: 'Bob Williams',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    attendance: ['present', 'present', 'present'],
    quizzes: [
      { name: 'Quiz 1: Algebra', score: 78, total: 100 },
      { name: 'Quiz 2: Geometry', score: 81, total: 100 },
    ],
  },
  {
    id: '3',
    name: 'Charlie Brown',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    attendance: ['absent', 'present', 'absent'],
    quizzes: [
      { name: 'Quiz 1: Algebra', score: 62, total: 100 },
      { name: 'Quiz 2: Geometry', score: 70, total: 100 },
    ],
  },
    {
    id: '4',
    name: 'Diana Miller',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a',
    attendance: ['present', 'present', 'present'],
    quizzes: [
      { name: 'Quiz 1: Algebra', score: 95, total: 100 },
      { name: 'Quiz 2: Geometry', score: 98, total: 100 },
    ],
  },
];

export function StudentManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Overview</CardTitle>
        <CardDescription>
          Track attendance and academic performance of your students.
        </CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className='w-full space-y-2'>
              <Label htmlFor="class-select">Class</Label>
              <Select defaultValue="class-1">
                <SelectTrigger id="class-select">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class-1">Class 1</SelectItem>
                  <SelectItem value="class-2">Class 2</SelectItem>
                  <SelectItem value="class-3">Class 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className='w-full space-y-2'>
              <Label htmlFor="section-select">Section</Label>
              <Select defaultValue="section-a">
                <SelectTrigger id="section-select">
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="section-a">Section A</SelectItem>
                  <SelectItem value="section-b">Section B</SelectItem>
                  <SelectItem value="section-c">Section C</SelectItem>
                </SelectContent>
              </Select>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {students.map((student) => (
            <AccordionItem key={student.id} value={`item-${student.id}`}>
              <AccordionTrigger>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{student.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pl-4">
                  <div>
                    <h4 className="font-semibold mb-2">Recent Attendance</h4>
                    <div className="flex gap-2">
                      {student.attendance.map((status, index) => (
                        <Badge
                          key={index}
                          variant={status === 'present' ? 'secondary' : 'destructive'}
                           className={status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          Lec {index + 1}: {status}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Quiz Results</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Quiz</TableHead>
                          <TableHead className="text-right">Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {student.quizzes.map((quiz) => (
                          <TableRow key={quiz.name}>
                            <TableCell>{quiz.name}</TableCell>
                            <TableCell className="text-right font-mono">
                              {quiz.score}/{quiz.total}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
