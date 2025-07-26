import React from 'react';
import { LogOut, User, Settings, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BW</span>
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Program Closure System
              </h1>
              <p className="text-sm text-gray-500">Enterprise Edition</p>
            </div>
          </div>

          {/* Navigation and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role?.replace('-', ' ')}
                </p>
              </div>
              
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md">
                  <Settings className="h-4 w-4" />
                </button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  leftIcon={<LogOut className="h-4 w-4" />}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};