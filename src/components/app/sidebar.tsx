'use client';

import { GraduationCap } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from '../ui/button';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Button variant="ghost" className="flex items-center justify-start gap-2 w-full px-2">
          <GraduationCap className="size-8 text-primary" />
          <span className="font-bold text-lg text-foreground group-data-[collapsible=icon]:hidden">
            EduNow
          </span>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        {/* Navigation items can be added here */}
      </SidebarContent>
    </Sidebar>
  );
}
