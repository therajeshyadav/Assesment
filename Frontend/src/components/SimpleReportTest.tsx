import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const SimpleReportTest = () => {
  const [sessionId, setSessionId] = useState('session_001');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const generateReport = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login first');
      }

      const response = await fetch(`${API_BASE_URL}/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ session_id: sessionId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate report');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>PDF Report Generation Test</CardTitle>
          <CardDescription>
            Test the report generation system with different session IDs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Session ID</label>
            <Input
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              placeholder="Enter session ID (e.g., session_001)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Available: session_001 (Health & Fitness), session_002 (Cardiac)
            </p>
          </div>

          <Button 
            onClick={generateReport} 
            disabled={loading || !sessionId}
            className="w-full"
          >
            {loading ? 'Generating Report...' : 'Generate PDF Report'}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert>
              <AlertDescription>
                <div className="space-y-2">
                  <p><strong>✅ Report Generated Successfully!</strong></p>
                  <p><strong>File:</strong> {result.fileName}</p>
                  <p><strong>Session:</strong> {result.sessionId}</p>
                  <p><strong>Report ID:</strong> {result.reportId}</p>
                  <p><strong>Path:</strong> {result.reportPath}</p>
                  {result.reportData && (
                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <p><strong>Assessment:</strong> {result.reportData.assessmentName}</p>
                      <p><strong>Sections:</strong> {result.reportData.sections.length}</p>
                      <p><strong>Generated:</strong> {new Date(result.reportData.metadata.generatedAt).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Test Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="p-3 border rounded">
              <p><strong>session_001</strong> - Health & Fitness Assessment (as_hr_02)</p>
              <p className="text-gray-600">Sections: Key Body Vitals, Heart Health, Stress Level, Fitness Levels, Posture, Body Composition</p>
            </div>
            <div className="p-3 border rounded">
              <p><strong>session_002</strong> - Cardiac Assessment (as_card_01)</p>
              <p className="text-gray-600">Sections: Key Body Vitals, Cardiovascular Endurance, Body Composition</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};