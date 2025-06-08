
import React from 'react';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  Activity,
  Calendar,
  FileText,
  PieChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const statsData = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    icon: DollarSign,
    color: "text-dashboard-success"
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1%",
    icon: Users,
    color: "text-dashboard-primary"
  },
  {
    title: "Sales",
    value: "12,234",
    change: "+19%",
    icon: ShoppingCart,
    color: "text-dashboard-warning"
  },
  {
    title: "Growth",
    value: "+573",
    change: "+201%",
    icon: TrendingUp,
    color: "text-dashboard-accent"
  }
];

const chartData = [
  { name: 'Jan', value: 400, sales: 240 },
  { name: 'Feb', value: 300, sales: 198 },
  { name: 'Mar', value: 600, sales: 800 },
  { name: 'Apr', value: 800, sales: 508 },
  { name: 'May', value: 500, sales: 680 },
  { name: 'Jun', value: 900, sales: 800 },
];

const pieData = [
  { name: 'Desktop', value: 400, color: 'hsl(var(--dashboard-primary))' },
  { name: 'Mobile', value: 300, color: 'hsl(var(--dashboard-secondary))' },
  { name: 'Tablet', value: 200, color: 'hsl(var(--dashboard-accent))' },
  { name: 'Other', value: 100, color: 'hsl(var(--dashboard-warning))' },
];

const recentActivities = [
  { id: 1, user: 'John Doe', action: 'Created new project', time: '2 minutes ago' },
  { id: 2, user: 'Jane Smith', action: 'Updated dashboard', time: '5 minutes ago' },
  { id: 3, user: 'Mike Johnson', action: 'Completed task', time: '10 minutes ago' },
  { id: 4, user: 'Sarah Wilson', action: 'Added new user', time: '15 minutes ago' },
];

export const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="dashboard-card hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-dashboard-success">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-dashboard-primary" />
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--dashboard-primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--dashboard-primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-dashboard-secondary" />
              Sales Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="sales" 
                  fill="hsl(var(--dashboard-secondary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="dashboard-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-dashboard-accent" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-dashboard-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-dashboard-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
