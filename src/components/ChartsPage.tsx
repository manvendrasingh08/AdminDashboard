
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', revenue: 4000, profit: 2400, expenses: 2000 },
  { month: 'Feb', revenue: 3000, profit: 1398, expenses: 2210 },
  { month: 'Mar', revenue: 2000, profit: 9800, expenses: 2290 },
  { month: 'Apr', revenue: 2780, profit: 3908, expenses: 2000 },
  { month: 'May', revenue: 1890, profit: 4800, expenses: 2181 },
  { month: 'Jun', revenue: 2390, profit: 3800, expenses: 2500 },
  { month: 'Jul', revenue: 3490, profit: 4300, expenses: 2100 },
];

const categoryData = [
  { name: 'Technology', value: 400, color: 'hsl(var(--dashboard-primary))' },
  { name: 'Marketing', value: 300, color: 'hsl(var(--dashboard-secondary))' },
  { name: 'Sales', value: 300, color: 'hsl(var(--dashboard-accent))' },
  { name: 'Support', value: 200, color: 'hsl(var(--dashboard-warning))' },
  { name: 'HR', value: 150, color: 'hsl(var(--dashboard-success))' },
];

const performanceData = [
  { name: 'Desktop', value: 68, fill: 'hsl(var(--dashboard-primary))' },
  { name: 'Mobile', value: 52, fill: 'hsl(var(--dashboard-secondary))' },
  { name: 'Tablet', value: 34, fill: 'hsl(var(--dashboard-accent))' },
];

const trafficData = [
  { day: 'Mon', visitors: 1200, pageViews: 3400 },
  { day: 'Tue', visitors: 1400, pageViews: 3200 },
  { day: 'Wed', visitors: 1100, pageViews: 3800 },
  { day: 'Thu', visitors: 1600, pageViews: 4200 },
  { day: 'Fri', visitors: 1800, pageViews: 4600 },
  { day: 'Sat', visitors: 1300, pageViews: 3100 },
  { day: 'Sun', visitors: 1000, pageViews: 2800 },
];

export const ChartsPage: React.FC = () => {
  return (
    // <div className="space-y-6">
    //   {/* Header */}
    //   <div>
    //     <h1 className="text-3xl font-bold text-foreground">Analytics & Charts</h1>
    //     <p className="text-muted-foreground">Visualize your data with beautiful, interactive charts.</p>
    //   </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-dashboard-primary" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
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
                  dataKey="revenue" 
                  stroke="hsl(var(--dashboard-primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--dashboard-primary))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="hsl(var(--dashboard-success))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--dashboard-success))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-dashboard-secondary" />
              Monthly Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="expenses" 
                  fill="hsl(var(--dashboard-secondary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Area Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-dashboard-accent" />
              Website Traffic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stackId="1"
                  stroke="hsl(var(--dashboard-accent))" 
                  fill="hsl(var(--dashboard-accent))"
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="pageViews" 
                  stackId="1"
                  stroke="hsl(var(--dashboard-primary))" 
                  fill="hsl(var(--dashboard-primary))"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-dashboard-warning" />
              Department Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Radial Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Device Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" data={performanceData}>
                <RadialBar 
                  minAngle={15} 
                  label={{ position: 'insideStart', fill: 'white' }} 
                  background 
                  clockWise 
                  dataKey="value" 
                />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Conversion Rate</span>
                <span className="font-medium">73%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-dashboard-success h-2 rounded-full" style={{ width: '73%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Customer Satisfaction</span>
                <span className="font-medium">89%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-dashboard-primary h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Task Completion</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-dashboard-accent h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>System Uptime</span>
                <span className="font-medium">99.9%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-dashboard-warning h-2 rounded-full" style={{ width: '99.9%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
