
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Plus, 
  MoreHorizontal, 
  Calendar,
  MessageSquare,
  Paperclip,
  Flag,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  comments: number;
  attachments: number;
  labels: string[];
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-dashboard-accent',
    tasks: [
      {
        id: '1',
        title: 'Design new landing page',
        description: 'Create a modern landing page for the new product launch',
        priority: 'high',
        assignee: 'John Doe',
        dueDate: '2024-06-15',
        comments: 3,
        attachments: 2,
        labels: ['Design', 'Frontend']
      },
      {
        id: '2',
        title: 'Update documentation',
        description: 'Review and update API documentation',
        priority: 'medium',
        assignee: 'Jane Smith',
        dueDate: '2024-06-12',
        comments: 1,
        attachments: 0,
        labels: ['Documentation']
      }
    ]
  },
  {
    id: 'progress',
    title: 'In Progress',
    color: 'bg-dashboard-warning',
    tasks: [
      {
        id: '3',
        title: 'Implement user authentication',
        description: 'Add JWT-based authentication system',
        priority: 'high',
        assignee: 'Mike Johnson',
        dueDate: '2024-06-18',
        comments: 5,
        attachments: 1,
        labels: ['Backend', 'Security']
      }
    ]
  },
  {
    id: 'review',
    title: 'In Review',
    color: 'bg-dashboard-secondary',
    tasks: [
      {
        id: '4',
        title: 'Database optimization',
        description: 'Optimize queries for better performance',
        priority: 'medium',
        assignee: 'Sarah Wilson',
        dueDate: '2024-06-10',
        comments: 2,
        attachments: 3,
        labels: ['Database', 'Performance']
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-dashboard-success',
    tasks: [
      {
        id: '5',
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated deployment pipeline',
        priority: 'low',
        assignee: 'Tom Brown',
        dueDate: '2024-06-08',
        comments: 4,
        attachments: 0,
        labels: ['DevOps', 'Automation']
      }
    ]
  }
];

export const KanbanPage: React.FC = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const getPriorityColor = (priority: Task['priority']) => {
    const colors = {
      low: 'border-l-dashboard-success',
      medium: 'border-l-dashboard-warning',
      high: 'border-l-dashboard-danger'
    };
    return colors[priority];
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    const variants = {
      low: 'bg-dashboard-success/10 text-dashboard-success',
      medium: 'bg-dashboard-warning/10 text-dashboard-warning',
      high: 'bg-dashboard-danger/10 text-dashboard-danger'
    };
    return (
      <Badge variant="outline" className={variants[priority]}>
        <Flag className="w-3 h-3 mr-1" />
        {priority}
      </Badge>
    );
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedTask) return;

    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      
      // Find source column and task
      let sourceColumnIndex = -1;
      let taskIndex = -1;
      let task: Task | null = null;

      for (let i = 0; i < newColumns.length; i++) {
        const foundTaskIndex = newColumns[i].tasks.findIndex(t => t.id === draggedTask);
        if (foundTaskIndex !== -1) {
          sourceColumnIndex = i;
          taskIndex = foundTaskIndex;
          task = newColumns[i].tasks[foundTaskIndex];
          break;
        }
      }

      if (task && sourceColumnIndex !== -1) {
        // Remove task from source column
        newColumns[sourceColumnIndex].tasks.splice(taskIndex, 1);
        
        // Add task to target column
        const targetColumnIndex = newColumns.findIndex(col => col.id === targetColumnId);
        if (targetColumnIndex !== -1) {
          newColumns[targetColumnIndex].tasks.push(task);
        }
      }

      return newColumns;
    });

    setDraggedTask(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kanban Board</h1>
          <p className="text-muted-foreground">Manage your projects with drag-and-drop workflow.</p>
        </div>
        <Button className="bg-dashboard-primary hover:bg-dashboard-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(column => (
          <Card key={column.id} className="dashboard-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <div className={cn("w-3 h-3 rounded-full", column.color)} />
                  {column.title}
                  <Badge variant="secondary" className="ml-2">
                    {column.tasks.length}
                  </Badge>
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent
              className="space-y-3 min-h-[500px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {column.tasks.map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className={cn(
                    "p-4 bg-card border border-l-4 rounded-lg cursor-move hover:shadow-md transition-all duration-200",
                    getPriorityColor(task.priority),
                    draggedTask === task.id && "opacity-50"
                  )}
                >
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-sm line-clamp-2">{task.title}</h3>
                    {getPriorityBadge(task.priority)}
                  </div>

                  {/* Task Description */}
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {task.description}
                  </p>

                  {/* Labels */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {task.labels.map(label => (
                      <Badge key={label} variant="outline" className="text-xs">
                        {label}
                      </Badge>
                    ))}
                  </div>

                  {/* Task Footer */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {task.dueDate}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {task.comments > 0 && (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {task.comments}
                        </div>
                      )}
                      
                      {task.attachments > 0 && (
                        <div className="flex items-center gap-1">
                          <Paperclip className="w-3 h-3" />
                          {task.attachments}
                        </div>
                      )}
                      
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-dashboard-primary/10 text-dashboard-primary">
                          {task.assignee.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add Task Button */}
              <Button 
                variant="ghost" 
                className="w-full h-12 border-2 border-dashed border-muted-foreground/30 hover:border-muted-foreground/60 hover:bg-muted/50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Stats */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Project Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-dashboard-primary">
                {columns.reduce((acc, col) => acc + col.tasks.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dashboard-warning">
                {columns.find(col => col.id === 'progress')?.tasks.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dashboard-success">
                {columns.find(col => col.id === 'done')?.tasks.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dashboard-danger">
                {columns.reduce((acc, col) => 
                  acc + col.tasks.filter(task => task.priority === 'high').length, 0
                )}
              </div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
