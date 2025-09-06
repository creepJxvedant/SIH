
'use client';

import {
  GraduationCap,
  LayoutDashboard,
  Clapperboard,
  BookCopy,
  BarChart2,
  User,
  LogOut,
  Users,
  Settings,
  PencilRuler,
  FileCheck,
  Download,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '../ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Role } from '@/lib/types';
import { ThemeToggle } from './theme-toggle';

const studentNav = [
  { href: '/dashboard/live-class', label: 'Live Class', icon: Clapperboard },
  { href: '/dashboard/study-materials', label: 'Study Materials', icon: BookCopy },
  { href: '/dashboard/downloads', label: 'Downloads', icon: Download },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];

const teacherNav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/create-quiz', label: 'Create Quiz', icon: PencilRuler },
  { href: '/dashboard/submissions', label: 'Submissions', icon: FileCheck },
  { href: '/dashboard/students', label: 'Students', icon: Users },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') as Role | null;
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    router.push('/');
  };

  const navItems = role === 'student' ? studentNav : teacherNav;

  const handleNav = (href: string) => {
    router.push(href);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Button
          variant="ghost"
          className="flex items-center justify-start gap-2 w-full px-2"
          onClick={() => handleNav('/dashboard')}
        >
          <GraduationCap className="size-8 text-primary" />
          <span className="font-bold text-lg text-foreground group-data-[collapsible=icon]:hidden">
            EduNow
          </span>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                onClick={() => handleNav(item.href)}
                tooltip={item.label}
                isActive={pathname === item.href}
                className="cursor-pointer"
              >
                
                  <item.icon />
                  <span>{item.label}</span>
                
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className='p-2'>
        <ThemeToggle />
        <SidebarSeparator />
        <SidebarMenu>
           <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} tooltip="Logout" className="cursor-pointer">
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
