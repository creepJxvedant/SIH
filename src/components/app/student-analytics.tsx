
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, CheckCircle2 } from 'lucide-react';

const testScoresData = [
  { test: 'Quiz 1', score: 85 },
  { test: 'Midterm', score: 78 },
  { test: 'Quiz 2', score: 92 },
  { test: 'Final', score: 88 },
];

const attendanceData = [
  { name: 'Attended', value: 28 },
  { name: 'Absent', value: 2 },
];
const COLORS = ['hsl(var(--chart-2))', 'hsl(var(--muted))'];

const chartConfig = {
  score: {
    label: 'Score',
    color: 'hsl(var(--chart-1))',
  },
};

export function StudentAnalytics() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 mt-12 font-headline">
        Your Analytics
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <CardTitle>Test Performance</CardTitle>
            </div>
            <CardDescription>Your scores across recent tests.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart data={testScoresData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="test"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="score" fill="var(--color-score)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <CardTitle>Attendance Record</CardTitle>
            </div>
            <CardDescription>Your attendance for this semester.</CardDescription>
          </CardHeader>
          <CardContent className='flex justify-center'>
            <ChartContainer config={{}} className="min-h-[200px] w-full max-w-[300px] aspect-square">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={attendanceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={60}
                  paddingAngle={5}
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
