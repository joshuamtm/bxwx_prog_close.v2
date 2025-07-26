import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { LoginPage } from './components/auth/LoginPage';
import { Dashboard } from './pages/Dashboard';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// App Routes Component
const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
        } 
      />
      
      <Route 
        path="/*" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* Placeholder routes - will be implemented in next phases */}
        <Route path="closures" element={<div className="p-6"><h1 className="text-2xl font-bold">My Closures</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
        <Route path="closures/new" element={<div className="p-6"><h1 className="text-2xl font-bold">New Closure Request</h1><p className="text-gray-600 mt-2">Form implementation in progress...</p></div>} />
        <Route path="closures/all" element={<div className="p-6"><h1 className="text-2xl font-bold">All Closures</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
        <Route path="reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
        <Route path="audit" element={<div className="p-6"><h1 className="text-2xl font-bold">Audit Trail</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
        <Route path="workflows" element={<div className="p-6"><h1 className="text-2xl font-bold">Workflows</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
        <Route path="users" element={<div className="p-6"><h1 className="text-2xl font-bold">User Management</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
        <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;