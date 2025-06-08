
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  type: 'meeting' | 'task' | 'reminder' | 'event';
  participants?: string[];
  location?: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Team Meeting',
    date: new Date(2024, 5, 8),
    time: '10:00 AM',
    type: 'meeting',
    participants: ['John Doe', 'Jane Smith'],
    location: 'Conference Room A'
  },
  {
    id: 2,
    title: 'Project Deadline',
    date: new Date(2024, 5, 12),
    time: '5:00 PM',
    type: 'task'
  },
  {
    id: 3,
    title: 'Client Presentation',
    date: new Date(2024, 5, 15),
    time: '2:00 PM',
    type: 'meeting',
    participants: ['Sarah Wilson', 'Mike Johnson'],
    location: 'Zoom Meeting'
  },
  {
    id: 4,
    title: 'Code Review',
    date: new Date(2024, 5, 10),
    time: '3:30 PM',
    type: 'task'
  },
  {
    id: 5,
    title: 'Birthday Party',
    date: new Date(2024, 5, 20),
    time: '7:00 PM',
    type: 'event',
    location: 'Office'
  }
];

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get days to fill the calendar grid (including previous/next month days)
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - monthStart.getDay());
  
  const endDate = new Date(monthEnd);
  endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));
  
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => isSameDay(event.date, date));
  };

  const getEventTypeColor = (type: Event['type']) => {
    const colors = {
      meeting: 'bg-dashboard-primary',
      task: 'bg-dashboard-warning',
      reminder: 'bg-dashboard-accent',
      event: 'bg-dashboard-success'
    };
    return colors[type];
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  // return (
  //   <div className="space-y-6">
  //     {/* Header */}
  //     <div className="flex items-center justify-between">
  //       <div>
  //         <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
  //         <p className="text-muted-foreground">Manage your schedule and events.</p>
  //       </div>
  //       <Button className="bg-dashboard-primary hover:bg-dashboard-primary/90">
  //         <Plus className="w-4 h-4 mr-2" />
  //         New Event
  //       </Button>
  //     </div>

  //     <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
  //       {/* Calendar */}
  //       <Card className="dashboard-card lg:col-span-3">
  //         <CardHeader>
  //           <div className="flex items-center justify-between">
  //             <CardTitle className="flex items-center gap-2">
  //               <CalendarIcon className="w-5 h-5 text-dashboard-primary" />
  //               {format(currentDate, 'MMMM yyyy')}
  //             </CardTitle>
  //             <div className="flex items-center gap-2">
  //               <Button
  //                 variant="outline"
  //                 size="sm"
  //                 onClick={() => navigateMonth('prev')}
  //               >
  //                 <ChevronLeft className="w-4 h-4" />
  //               </Button>
  //               <Button
  //                 variant="outline"
  //                 size="sm"
  //                 onClick={() => setCurrentDate(new Date())}
  //               >
  //                 Today
  //               </Button>
  //               <Button
  //                 variant="outline"
  //                 size="sm"
  //                 onClick={() => navigateMonth('next')}
  //               >
  //                 <ChevronRight className="w-4 h-4" />
  //               </Button>
  //             </div>
  //           </div>
  //         </CardHeader>
  //         <CardContent>
  //           {/* Calendar Grid */}
  //           <div className="grid grid-cols-7 gap-1">
  //             {/* Day Headers */}
  //             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
  //               <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
  //                 {day}
  //               </div>
  //             ))}
              
  //             {/* Calendar Days */}
  //             {calendarDays.map(day => {
  //               const dayEvents = getEventsForDate(day);
  //               const isCurrentMonth = isSameMonth(day, currentDate);
  //               const isSelected = selectedDate && isSameDay(day, selectedDate);
                
  //               return (
  //                 <div
  //                   key={day.toISOString()}
  //                   className={cn(
  //                     "min-h-[80px] p-1 border border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors",
  //                     !isCurrentMonth && "text-muted-foreground bg-muted/30",
  //                     isToday(day) && "bg-dashboard-primary/10 border-dashboard-primary",
  //                     isSelected && "bg-dashboard-accent/20 border-dashboard-accent"
  //                   )}
  //                   onClick={() => setSelectedDate(day)}
  //                 >
  //                   <div className={cn(
  //                     "text-sm font-medium mb-1",
  //                     isToday(day) && "text-dashboard-primary font-bold"
  //                   )}>
  //                     {format(day, 'd')}
  //                   </div>
                    
  //                   {/* Events */}
  //                   <div className="space-y-1">
  //                     {dayEvents.slice(0, 2).map(event => (
  //                       <div
  //                         key={event.id}
  //                         className={cn(
  //                           "text-xs p-1 rounded text-white truncate",
  //                           getEventTypeColor(event.type)
  //                         )}
  //                       >
  //                         {event.title}
  //                       </div>
  //                     ))}
  //                     {dayEvents.length > 2 && (
  //                       <div className="text-xs text-muted-foreground">
  //                         +{dayEvents.length - 2} more
  //                       </div>
  //                     )}
  //                   </div>
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         </CardContent>
  //       </Card>

  //       {/* Event Details Sidebar */}
  //       <Card className="dashboard-card">
  //         <CardHeader>
  //           <CardTitle>
  //             {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
  //           </CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           {selectedDate ? (
  //             <div className="space-y-4">
  //               {selectedDateEvents.length > 0 ? (
  //                 selectedDateEvents.map(event => (
  //                   <div key={event.id} className="p-3 rounded-lg bg-muted/50 space-y-2">
  //                     <div className="flex items-center justify-between">
  //                       <h3 className="font-medium">{event.title}</h3>
  //                       <Badge variant="outline" className={cn("text-white", getEventTypeColor(event.type))}>
  //                         {event.type}
  //                       </Badge>
  //                     </div>
                      
  //                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
  //                       <Clock className="w-4 h-4" />
  //                       {event.time}
  //                     </div>
                      
  //                     {event.location && (
  //                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
  //                         <MapPin className="w-4 h-4" />
  //                         {event.location}
  //                       </div>
  //                     )}
                      
  //                     {event.participants && (
  //                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
  //                         <Users className="w-4 h-4" />
  //                         {event.participants.join(', ')}
  //                       </div>
  //                     )}
  //                   </div>
  //                 ))
  //               ) : (
  //                 <div className="text-center py-8 text-muted-foreground">
  //                   <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
  //                   <p>No events scheduled</p>
  //                   <Button variant="outline" size="sm" className="mt-2">
  //                     <Plus className="w-4 h-4 mr-2" />
  //                     Add Event
  //                   </Button>
  //                 </div>
  //               )}
  //             </div>
  //           ) : (
  //             <div className="text-center py-8 text-muted-foreground">
  //               <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
  //               <p>Click on a date to view events</p>
  //             </div>
  //           )}
  //         </CardContent>
  //       </Card>
  //     </div>

  //     {/* Upcoming Events */}
  //     <Card className="dashboard-card">
  //       <CardHeader>
  //         <CardTitle>Upcoming Events</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  //           {mockEvents.slice(0, 4).map(event => (
  //             <div key={event.id} className="p-4 rounded-lg bg-muted/50 space-y-2">
  //               <div className="flex items-center justify-between">
  //                 <Badge variant="outline" className={cn("text-white", getEventTypeColor(event.type))}>
  //                   {event.type}
  //                 </Badge>
  //                 <span className="text-xs text-muted-foreground">
  //                   {format(event.date, 'MMM d')}
  //                 </span>
  //               </div>
  //               <h3 className="font-medium">{event.title}</h3>
  //               <div className="flex items-center gap-2 text-sm text-muted-foreground">
  //                 <Clock className="w-4 h-4" />
  //                 {event.time}
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
};
