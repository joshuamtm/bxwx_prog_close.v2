import React from 'react';
import { Plus, FileText, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

interface StatCard {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface RecentActivity {
  id: string;
  action: string;
  program: string;
  user: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'in-progress';
}

export const Dashboard: React.FC = () => {
  const { user, hasRole } = useAuth();

  // Mock data - in production this would come from your API
  const stats: StatCard[] = [
    {
      title: 'Active Closures',
      value: 12,
      change: '+2 this week',
      changeType: 'positive',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Pending Review',
      value: 5,
      change: '-1 from last week',
      changeType: 'positive',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Completed This Month',
      value: 18,
      change: '+15%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Overdue Items',
      value: 3,
      change: 'Needs attention',
      changeType: 'negative',
      icon: AlertCircle,
      color: 'red'
    }
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      action: 'Submitted closure request',
      program: 'After School Program - Site A',
      user: 'Sarah Johnson',
      timestamp: new Date('2025-01-25T14:30:00'),
      status: 'pending'
    },
    {
      id: '2',
      action: 'Completed equipment pickup',
      program: 'Youth Development Center',
      user: 'Michael Chen',
      timestamp: new Date('2025-01-25T11:15:00'),
      status: 'completed'
    },
    {
      id: '3',
      action: 'Updated timeline',
      program: 'Senior Services Hub',
      user: 'Lisa Rodriguez',
      timestamp: new Date('2025-01-24T16:45:00'),
      status: 'in-progress'
    }
  ];

  const getStatCardStyles = (color: string) => {
    const styles = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      red: 'bg-red-50 text-red-700 border-red-200'
    };
    return styles[color as keyof typeof styles] || styles.blue;
  };

  const getChangeStyles = (changeType?: string) => {
    const styles = {
      positive: 'text-green-600',
      negative: 'text-red-600',
      neutral: 'text-gray-600'
    };
    return styles[changeType as keyof typeof styles] || styles.neutral;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800'
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your program closures today.
          </p>
        </div>
        
        {hasRole(['program-director', 'administrator']) && (
          <Link to="/closures/new">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              New Closure Request
            </Button>
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.change && (
                  <p className={`text-sm ${getChangeStyles(stat.changeType)}`}>
                    {stat.change}
                  </p>
                )}
              </div>
              <div className={`p-3 rounded-lg ${getStatCardStyles(stat.color)}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Link 
                to="/closures" 
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.program}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-400">
                        by {activity.user} • {activity.timestamp.toLocaleDateString()}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(activity.status)}`}>
                        {activity.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick Links */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link 
                to="/closures" 
                className="block text-sm text-primary-600 hover:text-primary-700"
              >
                → View My Closures
              </Link>
              <Link 
                to="/reports" 
                className="block text-sm text-primary-600 hover:text-primary-700"
              >
                → Generate Reports
              </Link>
              {hasRole(['administrator', 'auditor']) && (
                <Link 
                  to="/audit" 
                  className="block text-sm text-primary-600 hover:text-primary-700"
                >
                  → Audit Trail
                </Link>
              )}
              <Link 
                to="/settings" 
                className="block text-sm text-primary-600 hover:text-primary-700"
              >
                → System Settings
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">System Health</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Backup</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Users</span>
                <span className="text-xs text-gray-500">24</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};