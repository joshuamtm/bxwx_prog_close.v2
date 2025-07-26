import type { User, LoginCredentials, AuthSession } from '../types/auth';

class AuthService {
  private baseUrl = '/api/auth'; // In production, this would be your API endpoint

  async login(credentials: LoginCredentials): Promise<AuthSession> {
    // Mock implementation - replace with actual API call
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    return response.json();
  }

  async logout(): Promise<void> {
    // Mock implementation - replace with actual API call
    await fetch(`${this.baseUrl}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });
    
    this.clearToken();
  }

  async refreshToken(): Promise<AuthSession> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${this.baseUrl}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const session = await response.json();
    this.setToken(session.token);
    this.setRefreshToken(session.refreshToken);
    
    return session;
  }

  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${this.baseUrl}/me`, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get current user');
    }

    return response.json();
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return response.json();
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      throw new Error('Failed to change password');
    }
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  clearToken(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}

export const authService = new AuthService();