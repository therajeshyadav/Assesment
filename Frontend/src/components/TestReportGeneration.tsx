import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  TestTube,
  Play
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const TestReportGeneration = () => {
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const sampleSessions = [
    { id: 'session_001', type: 'Health & Fitness Assessment (as_hr_02)', description: 'Complete health assessment with body composition' },
    { id: 'session_002', type: 'Cardiac Assessment (as_card_01)', description: 'Focused cardiac health evaluation' }
  ];

  const testReportGeneration = async () => {
    if (!sessionId.trim()) {
      setError('Please enter a session ID');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ session_id: sessionId })
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        toast({
          title: "Report Generated Successfully! 🎉",
          description: `PDF report saved as ${data.fileName}`,
        });
      } else {
        throw new Error(data.error || 'Report generation failed');
      }
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Generation Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (result?.reportPath) {
      const link = document.createElement('a');
      link.href = `http://localhost:5000${result.reportPath}`;
      link.download = result.fileName;
      link.target = '_blank';
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Test Interface */}
      <Card className="bg-white border-0 shadow-xl">
        <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 rounded-t-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
              <TestTube className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900">Test Report Generation</CardTitle>
              <CardDescription className="text-slate-600 text-base mt-1">
                Test the PDF report generation system with sample assessment data
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Sample Sessions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Available Sample Sessions</h3>
            <div className="grid gap-3">
              {sampleSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
                  onClick={() => setSessionId(session.id)}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-white border-slate-300">
                        {session.id}
                      </Badge>
                      <span className="font-medium text-slate-900">{session.type}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{session.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSessionId(session.id);
                    }}
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  >
                    Use This
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="sessionId" className="text-sm font-semibold text-slate-900">
                Session ID
              </label>
              <Input
                id="sessionId"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                placeholder="Enter session ID (e.g., session_001)"
                className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <Button
              onClick={testReportGeneration}
              disabled={loading || !sessionId.trim()}
              className="w-full h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold shadow-xl rounded-xl"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Report...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Generate Test Report
                </div>
              )}
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Success Result */}
          {result && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <div className="space-y-3">
                  <div>
                    <strong>Report Generated Successfully!</strong>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><strong>Session ID:</strong> {result.sessionId}</p>
                    <p><strong>File Name:</strong> {result.fileName}</p>
                    <p><strong>Report Path:</strong> {result.reportPath}</p>
                  </div>
                  <Button
                    onClick={downloadReport}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* API Information */}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-900">
            <FileText className="h-5 w-5 text-blue-600" />
            API Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900">POST Endpoint</h4>
              <code className="block p-3 bg-slate-100 rounded-lg text-sm">
                POST /api/generate-report
              </code>
              <p className="text-sm text-slate-600">Body: {"{ \"session_id\": \"session_001\" }"}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900">GET Endpoint</h4>
              <code className="block p-3 bg-slate-100 rounded-lg text-sm">
                GET /api/generate-report?session_id=session_001
              </code>
              <p className="text-sm text-slate-600">Query parameter: session_id</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};