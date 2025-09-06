
'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import type { Role } from '@/lib/types';
import { Badge } from '../ui/badge';

interface HeaderProps {
  role: Role | null;
}

export function Header({ role }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
      </div>
      {role && (
        <div className="flex items-center space-x-2">
          <Badge variant={role === 'teacher' ? 'default' : 'secondary'}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Badge>
        </div>
      )}
    </header>
  );
}
