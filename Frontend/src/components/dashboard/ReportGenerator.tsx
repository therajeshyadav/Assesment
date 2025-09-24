import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ReportGenerator = () => {
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const generateReport = async () => {
    if (!sessionId.trim()) {
      setError('Please enter a session ID');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please login again.');
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

  const quickSelect = (id: string) => {
    setSessionId(id);
    setError('');
    setResult(null);
  };

  const downloadReport = (filename: string) => {
    try {
      // Use direct download endpoint
      const downloadUrl = `${API_BASE_URL}/download/${filename}`;
      
      // Create temporary link element and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', filename);
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Download initiated for:', filename);
      
    } catch (error: any) {
      console.error('Download error:', error);
      setError(`Download failed: ${error.message}`);
    }
  };



  return (
    <div className="space-y-6">
      {/* Main Report Generation Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Generate PDF Report</span>
          </CardTitle>
          <CardDescription>
            Enter a session ID to generate a comprehensive PDF assessment report
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Session ID</label>
            <Input
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              placeholder="Enter session ID (e.g., session_001)"
              className="text-base"
            />
          </div>

          <Button 
            onClick={generateReport} 
            disabled={loading || !sessionId.trim()}
            className="w-full h-12 text-base"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating Report...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Generate PDF Report</span>
              </div>
            )}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-green-800">Report Generated Successfully!</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium">File Name:</span>
                      <p className="text-gray-700">{result.fileName}</p>
                    </div>
                    <div>
                      <span className="font-medium">Session ID:</span>
                      <p className="text-gray-700">{result.sessionId}</p>
                    </div>
                    <div>
                      <span className="font-medium">Report ID:</span>
                      <p className="text-gray-700">{result.reportId}</p>
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <Badge variant="secondary" className="ml-1">
                        {result.status}
                      </Badge>
                    </div>
                  </div>

                  {result.reportData && (
                    <div className="mt-4 p-3 bg-white rounded border">
                      <h4 className="font-medium text-gray-900 mb-2">Assessment Details</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><strong>Assessment:</strong> {result.reportData.assessmentName}</p>
                        <p><strong>Sections:</strong> {result.reportData.sections.length}</p>
                        <p><strong>Generated:</strong> {new Date(result.reportData.metadata.generatedAt).toLocaleString()}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-xs text-gray-500">
                      PDF saved to: {result.reportPath}
                    </div>
                    <Button 
                      onClick={() => downloadReport(result.fileName)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Quick Select Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Assessment Data</CardTitle>
          <CardDescription>
            Click on any session to quickly select it for report generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="p-4 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
              onClick={() => quickSelect('session_001')}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">Health & Fitness Assessment</h3>
                <Badge variant="outline">session_001</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Comprehensive health and fitness evaluation with body composition analysis
              </p>
              <div className="text-xs text-gray-500">
                Assessment ID: as_hr_02 • 6 sections
              </div>
            </div>

            <div 
              className="p-4 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
              onClick={() => quickSelect('session_002')}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">Cardiac Assessment</h3>
                <Badge variant="outline">session_002</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Focused cardiac health evaluation with cardiovascular endurance testing
              </p>
              <div className="text-xs text-gray-500">
                Assessment ID: as_card_01 • 3 sections
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>Configuration-driven system</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <span>Dynamic field mapping</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
              <span>PDF generation with Puppeteer</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};