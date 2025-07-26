import React, { useState } from 'react';

const SimpleApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'login' | 'dashboard'>('login');
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (email: string) => {
    setUser(email);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  if (currentView === 'login') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <div style={{ 
          maxWidth: '400px', 
          width: '100%', 
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              backgroundColor: '#2563eb', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              BW
            </div>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', color: '#111827' }}>
              Sign in to your account
            </h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
              BronxWorks Program Closure System
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <button
              onClick={() => handleLogin('director@bronxworks.org')}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                marginBottom: '0.5rem'
              }}
            >
              Login as Program Director
            </button>
            <button
              onClick={() => handleLogin('it.admin@bronxworks.org')}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                marginBottom: '0.5rem'
              }}
            >
              Login as IT Operations
            </button>
            <button
              onClick={() => handleLogin('admin@bronxworks.org')}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Login as Administrator
            </button>
          </div>

          <p style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280', 
            textAlign: 'center',
            margin: 0 
          }}>
            Demo version - click any button to continue
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              backgroundColor: '#2563eb', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '1rem',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              BW
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.25rem', color: '#111827' }}>
                Program Closure System
              </h1>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
                Enterprise Edition
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#374151' }}>
              Welcome, {user}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', color: '#111827' }}>
            Welcome to BronxWorks Enterprise
          </h2>
          <p style={{ margin: 0, color: '#6b7280' }}>
            Program Closure Coordination System - Streamlining closures across all departments
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {[
            { title: 'Active Closures', value: '12', color: '#2563eb' },
            { title: 'Pending Review', value: '5', color: '#d97706' },
            { title: 'Completed This Month', value: '18', color: '#059669' },
            { title: 'Overdue Items', value: '3', color: '#dc2626' }
          ].map((stat, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                margin: '0 0 0.5rem', 
                fontSize: '0.875rem', 
                color: '#6b7280',
                fontWeight: '500'
              }}>
                {stat.title}
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: stat.color 
              }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.125rem', color: '#111827' }}>
            System Features
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {[
              '✅ Role-based Access Control',
              '✅ Multi-step Closure Forms',
              '✅ Automated Notifications',
              '✅ Audit Trail & Compliance',
              '✅ Stakeholder Reports',
              '✅ Asset Management'
            ].map((feature, index) => (
              <div key={index} style={{
                padding: '0.75rem',
                backgroundColor: '#f8fafc',
                borderRadius: '4px',
                fontSize: '0.875rem',
                color: '#374151'
              }}>
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div style={{ 
          marginTop: '2rem', 
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: '#eff6ff',
          borderRadius: '8px',
          border: '1px solid #dbeafe'
        }}>
          <p style={{ 
            margin: 0, 
            fontSize: '0.875rem', 
            color: '#1e40af',
            fontWeight: '500'
          }}>
            🎉 Enterprise Edition v2.0.0 - Now Live!
          </p>
          <p style={{ 
            margin: '0.5rem 0 0', 
            fontSize: '0.75rem', 
            color: '#3730a3'
          }}>
            Built with React 19, TypeScript, and enterprise-grade security
          </p>
        </div>
      </main>
    </div>
  );
};

export default SimpleApp;