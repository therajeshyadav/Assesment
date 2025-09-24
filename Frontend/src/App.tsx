import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { ReportGenerator } from "@/components/dashboard/ReportGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AuthenticatedApp = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Assessment Management System
              </h1>
              <p className="text-sm text-gray-600">
                PDF Report Generation System
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.username || user?.email}
              </span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <ReportGenerator />
      </main>
    </div>
  );
};

const UnauthenticatedApp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Assessment Management System
          </h1>
          <p className="mt-2 text-gray-600">
            User Authentication & PDF Report Generation
          </p>
        </div>

        {isLogin ? (
          <LoginForm 
            onLogin={login} 
            onSwitchToSignup={() => setIsLogin(false)} 
          />
        ) : (
          <SignupForm 
            onSignup={signup} 
            onSwitchToLogin={() => setIsLogin(true)} 
          />
        )}

        {isLogin && (
          <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: test@example.com</p>
            <p>Password: password</p>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AuthContent />
      <Toaster />
    </AuthProvider>
  );
};

const AuthContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;