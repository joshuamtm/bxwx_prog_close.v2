import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Plus, 
  FileText, 
  BarChart3, 
  Settings, 
  Users,
  Archive,
  Shield,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: string[];
  permissions?: { resource: string; action: string };
}

const navigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    name: 'New Closure',
    href: '/closures/new',
    icon: Plus,
    permissions: { resource: 'program-closure', action: 'create' }
  },
  {
    name: 'My Closures',
    href: '/closures',
    icon: FileText,
  },
  {
    name: 'All Closures',
    href: '/closures/all',
    icon: Archive,
    roles: ['administrator', 'it-operations', 'admin-operations']
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
  },
  {
    name: 'Audit Trail',
    href: '/audit',
    icon: Shield,
    roles: ['administrator', 'auditor', 'compliance-officer']
  },
  {
    name: 'Workflows',
    href: '/workflows',
    icon: Clock,
    roles: ['administrator']
  },
  {
    name: 'Users',
    href: '/users',
    icon: Users,
    roles: ['administrator']
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['administrator']
  },
];

export const Sidebar: React.FC = () => {
  const { user, hasRole, checkPermission } = useAuth();

  const isItemVisible = (item: NavigationItem): boolean => {
    if (item.roles && !hasRole(item.roles as any)) {
      return false;
    }
    
    if (item.permissions && !checkPermission(item.permissions.resource, item.permissions.action)) {
      return false;
    }
    
    return true;
  };

  return (
    <div className="flex flex-col w-64 bg-gray-800 h-full">
      <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.filter(isItemVisible).map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                )
              }
            >
              <item.icon
                className="mr-3 flex-shrink-0 h-5 w-5"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      
      {/* User info at bottom */}
      <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-gray-400 capitalize">
              {user?.role?.replace('-', ' ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};