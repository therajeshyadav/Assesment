import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SimpleReportTest } from '@/components/SimpleReportTest';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface DashboardStats {
  status: string;
  counts: {
    assessments: number;
    users: number;
    reports: number;
  };
}

export const DashboardOverview = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'reports'>('overview');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  const testBackendConnection = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      setStats(data);
      alert('✅ Backend connection successful!');
    } catch (err) {
      setError('❌ Backend connection failed');
    } finally {
      setLoading(false);
    }
  };

  if (activeTab === 'reports') {
    return (
      <div>
        <div className="mb-6">
          <div className="flex space-x-4">
            <Button 
              variant={activeTab === 'overview' ? 'default' : 'outline'}
              onClick={() => setActiveTab('overview')}
            >
              Dashboard Overview
            </Button>
            <Button 
              variant={activeTab === 'reports' ? 'default' : 'outline'}
              onClick={() => setActiveTab('reports')}
            >
              Generate Reports
            </Button>
          </div>
        </div>
        <SimpleReportTest />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex space-x-4">
          <Button 
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
          >
            Dashboard Overview
          </Button>
          <Button 
            variant={activeTab === 'reports' ? 'default' : 'outline'}
            onClick={() => setActiveTab('reports')}
          >
            Generate Reports
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backend Status</CardTitle>
            <div className={`h-3 w-3 rounded-full ${stats?.status === 'healthy' || stats?.status === 'OK' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : (stats?.status === 'healthy' || stats?.status === 'OK' ? 'Online' : 'Offline')}
            </div>
            <p className="text-xs text-muted-foreground">
              System status
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats?.counts?.users || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats?.counts?.assessments || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Available assessments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats?.counts?.reports || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              PDF reports created
            </p>
          </CardContent>
        </Card>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Current system status and configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Backend URL:</span>
              <span className="text-sm text-gray-600">{import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Data Storage:</span>
              <span className="text-sm text-gray-600">File-based (data.js)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">PDF Engine:</span>
              <span className="text-sm text-gray-600">Puppeteer + Chrome</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Configuration:</span>
              <span className="text-sm text-gray-600">Dynamic (assessmentConfig.js)</span>
            </div>
            <Button onClick={testBackendConnection} className="w-full mt-4">
              Test Backend Connection
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Assessment Types</CardTitle>
            <CardDescription>
              Configured assessment types for report generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Health & Fitness Assessment</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">as_hr_02</span>
              </div>
              <p className="text-sm text-gray-600">
                6 sections: Key Body Vitals, Heart Health, Stress Level, Fitness Levels, Posture, Body Composition
              </p>
              <p className="text-xs text-gray-500 mt-1">Session ID: session_001</p>
            </div>

            <div className="border rounded p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Cardiac Assessment</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">as_card_01</span>
              </div>
              <p className="text-sm text-gray-600">
                3 sections: Key Body Vitals, Cardiovascular Endurance, Body Composition
              </p>
              <p className="text-xs text-gray-500 mt-1">Session ID: session_002</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and system operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => setActiveTab('reports')}
              className="h-20 flex flex-col items-center justify-center"
            >
              <svg className="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generate Report
            </Button>
            
            <Button 
              variant="outline"
              onClick={testBackendConnection}
              className="h-20 flex flex-col items-center justify-center"
            >
              <svg className="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Test Connection
            </Button>

            <Button 
              variant="outline"
              onClick={fetchDashboardStats}
              className="h-20 flex flex-col items-center justify-center"
            >
              <svg className="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Stats
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};