'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { Role } from '@/app/page';

interface HeaderProps {
  role: Role;
  setRole: Dispatch<SetStateAction<Role>>;
}

export function Header({ role, setRole }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="role-switch" className="text-sm">
          Student
        </Label>
        <Switch
          id="role-switch"
          checked={role === 'teacher'}
          onCheckedChange={(checked) => setRole(checked ? 'teacher' : 'student')}
          aria-label="Toggle between student and teacher roles"
        />
        <Label htmlFor="role-switch" className="text-sm">
          Teacher
        </Label>
      </div>
    </header>
  );
}
