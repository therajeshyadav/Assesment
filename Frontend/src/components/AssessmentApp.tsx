import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ReportGenerator } from '@/components/dashboard/ReportGenerator';
import { TestReportGeneration } from '@/components/TestReportGeneration';

type AuthView = 'login' | 'signup';
type DashboardView = 'overview' | 'reports' | 'test' | 'settings';

// Auth component for login/signup
const AuthComponent = () => {
  const { login, signup } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('login');
  const location = useLocation();
  
  // Check if we should show signup based on URL
  useEffect(() => {
    if (location.pathname === '/signup') {
      setAuthView('signup');
    } else {
      setAuthView('login');
    }
  }, [location.pathname]);

  return (
    <AuthLayout
      title={authView === 'login' ? 'Welcome Back' : 'Create Account'}
      subtitle={authView === 'login' 
        ? 'Sign in to access your assessment dashboard' 
        : 'Join the professional assessment platform'}
    >
      {authView === 'login' ? (
        <LoginForm
          onLogin={login}
          onSwitchToSignup={() => setAuthView('signup')}
        />
      ) : (
        <SignupForm
          onSignup={signup}
          onSwitchToLogin={() => setAuthView('login')}
        />
      )}
    </AuthLayout>
  );
};

// Dashboard wrapper component
const DashboardWrapper = () => {
  const { user, logout } = useAuth();
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardStats({
          totalReports: data.totalReports || 0,
          activeSessions: data.todayAssessments || 0,
          successRate: data.averageScore || 0
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const getCurrentView = (): DashboardView => {
    if (location.pathname.startsWith('/dashboard/reports')) return 'reports';
    if (location.pathname.startsWith('/dashboard/test')) return 'test';
    if (location.pathname.startsWith('/dashboard/settings')) return 'settings';
    return 'overview';
  };

  const handleViewChange = (view: DashboardView) => {
    switch (view) {
      case 'reports':
        navigate('/dashboard/reports');
        break;
      case 'test':
        navigate('/dashboard/test');
        break;
      case 'settings':
        navigate('/dashboard/settings');
        break;
      case 'overview':
      default:
        navigate('/dashboard');
        break;
    }
  };

  return (
    <DashboardLayout 
      user={user!} 
      onLogout={logout}
      currentView={getCurrentView()}
      onViewChange={handleViewChange}
      dashboardStats={dashboardStats}
    >
      <Routes>
        <Route path="/" element={<DashboardOverview onNavigateToReports={() => navigate('/dashboard/reports')} />} />
        <Route path="/reports" element={<ReportGenerator />} />
        <Route path="/test" element={<TestReportGeneration />} />
        <Route path="/settings" element={<div className="p-8 text-center text-slate-600">Settings page coming soon...</div>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

const AuthenticatedApp = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/signup" element={<AuthComponent />} />
        <Route path="*" element={<AuthComponent />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/dashboard/*" element={<DashboardWrapper />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export const AssessmentApp = () => {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
};