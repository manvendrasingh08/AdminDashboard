
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Table, 
  BarChart3, 
  Calendar, 
  Kanban, 
  Settings, 
  Menu, 
  X,
  Moon,
  Sun,
  Bell,
  Search,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Table, label: 'Tables', path: '/tables' },
  { icon: BarChart3, label: 'Charts', path: '/charts' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: Kanban, label: 'Kanban', path: '/kanban' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Sidebar */}
      <aside className={cn(
        "bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            {sidebarOpen && (
              <div className="animate-fade-in">
                <h1 className="text-lg font-bold">Admin Pro</h1>
                <p className="text-xs text-sidebar-foreground/60">Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-sidebar-accent group",
                      isActive && "bg-sidebar-primary text-sidebar-primary-foreground"
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/80"
                    )} />
                    {sidebarOpen && (
                      <span className={cn(
                        "animate-fade-in transition-colors",
                        isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground"
                      )}>
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-accent"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64 bg-muted/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="hover:bg-accent"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </Button>
              
              <Button variant="ghost" size="sm" className="hover:bg-accent">
                <Bell className="w-5 h-5" />
              </Button>
              
              <Button variant="ghost" size="sm" className="hover:bg-accent">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
