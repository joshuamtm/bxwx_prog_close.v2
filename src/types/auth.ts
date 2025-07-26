export type UserRole = 
  | 'program-director'
  | 'it-operations'
  | 'admin-operations'
  | 'administrator'
  | 'auditor'
  | 'compliance-officer'
  | 'finance'
  | 'hr'
  | 'facilities';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve')[];
}

export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkPermission: (resource: string, action: string) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthSession {
  token: string;
  refreshToken: string;
  expiresAt: Date;
  user: User;
}