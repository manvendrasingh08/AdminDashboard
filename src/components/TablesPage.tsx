
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  MoreHorizontal,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2024-01-10' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-16' },
  { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
  { id: 6, name: 'Lisa Davis', email: 'lisa@example.com', role: 'Editor', status: 'Pending', lastLogin: '2024-01-12' },
];

type SortField = 'name' | 'email' | 'role' | 'status' | 'lastLogin';
type SortDirection = 'asc' | 'desc';

export const TablesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = mockUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Active': 'default',
      'Inactive': 'secondary',
      'Pending': 'outline'
    };
    
    return (
      <Badge variant={variants[status] || 'default'} className="capitalize">
        {status}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      'Admin': 'bg-dashboard-danger/10 text-dashboard-danger',
      'Editor': 'bg-dashboard-warning/10 text-dashboard-warning',
      'User': 'bg-dashboard-primary/10 text-dashboard-primary'
    };
    
    return (
      <Badge variant="outline" className={colors[role] || 'bg-muted'}>
        {role}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Tables</h1>
          <p className="text-muted-foreground">Manage and view your data with interactive tables.</p>
        </div>
        <Button className="bg-dashboard-primary hover:bg-dashboard-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Table Card */}
      <Card className="dashboard-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Users Management</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('name')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Name
                      <ArrowUpDown className="ml-2 w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('email')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Email
                      <ArrowUpDown className="ml-2 w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('role')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Role
                      <ArrowUpDown className="ml-2 w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('status')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Status
                      <ArrowUpDown className="ml-2 w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-dashboard-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-dashboard-primary">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover border border-border">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination Info */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAndSortedUsers.length} of {mockUsers.length} results
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
