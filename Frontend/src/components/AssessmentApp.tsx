import { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ReportGenerator } from '@/components/dashboard/ReportGenerator';

type AuthView = 'login' | 'signup';
type DashboardView = 'overview' | 'reports' | 'settings';

const AuthenticatedApp = () => {
  const { user, login, signup, logout } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('login');
  const [dashboardView, setDashboardView] = useState<DashboardView>('overview');

  if (!user) {
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
  }

  const renderDashboardContent = () => {
    switch (dashboardView) {
      case 'reports':
        return <ReportGenerator />;
      case 'overview':
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout 
      user={user} 
      onLogout={logout}
      currentView={dashboardView}
      onViewChange={setDashboardView}
    >
      {renderDashboardContent()}
    </DashboardLayout>
  );
};

export const AssessmentApp = () => {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
};