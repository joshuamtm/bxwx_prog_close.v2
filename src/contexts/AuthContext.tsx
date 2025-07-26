import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User, UserRole, AuthContext as AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock user data for demonstration - in production this would come from your backend
const mockUsers: Record<string, User> = {
  'director@bronxworks.org': {
    id: '1',
    email: 'director@bronxworks.org',
    name: 'Sarah Johnson',
    role: 'program-director',
    department: 'Education Services',
    permissions: [
      { resource: 'program-closure', actions: ['create', 'read', 'update'] },
      { resource: 'reports', actions: ['read'] }
    ],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  'it.admin@bronxworks.org': {
    id: '2',
    email: 'it.admin@bronxworks.org',
    name: 'Michael Chen',
    role: 'it-operations',
    department: 'IT Operations',
    permissions: [
      { resource: 'program-closure', actions: ['read', 'update'] },
      { resource: 'reports', actions: ['read'] },
      { resource: 'assets', actions: ['read', 'update'] }
    ],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  'admin@bronxworks.org': {
    id: '3',
    email: 'admin@bronxworks.org',
    name: 'Administrator',
    role: 'administrator',
    department: 'IT Operations',
    permissions: [
      { resource: 'program-closure', actions: ['create', 'read', 'update', 'delete', 'approve'] },
      { resource: 'reports', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'system', actions: ['read', 'update'] }
    ],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-01-01')
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // In production, validate token with backend
          const userData = localStorage.getItem('user_data');
          if (userData) {
            setUser(JSON.parse(userData));
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock authentication - in production, call your authentication API
      const mockUser = mockUsers[email.toLowerCase()];
      
      if (!mockUser || password !== 'password123') {
        throw new Error('Invalid credentials');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user state
      setUser(mockUser);
      
      // Store session data
      const token = 'mock_jwt_token_' + Date.now();
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  };

  const checkPermission = (resource: string, action: string): boolean => {
    if (!user) return false;
    
    const permission = user.permissions.find(p => p.resource === resource);
    return permission ? permission.actions.includes(action as any) : false;
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkPermission,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};