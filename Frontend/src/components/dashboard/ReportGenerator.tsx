import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Download,
  Search,
  Calendar,
  User,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Filter,
  RefreshCw,
  Eye,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Assessment {
  sessionId: string;
  assessmentId: string;
  patientName: string;
  assessmentType: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  score?: number;
}

// Mock data for demonstration
const mockAssessments: Assessment[] = [
  {
    sessionId: 'session_001',
    assessmentId: 'as_hr_02',
    patientName: 'John Smith',
    assessmentType: 'Health & Fitness Assessment',
    date: '2025-02-27',
    status: 'completed',
    score: 85
  },
  {
    sessionId: 'session_002',
    assessmentId: 'as_card_01',
    patientName: 'Emma Johnson',
    assessmentType: 'Cardiac Assessment',
    date: '2025-02-26',
    status: 'completed',
    score: 72
  },
  {
    sessionId: 'session_003',
    assessmentId: 'as_hr_02',
    patientName: 'Michael Brown',
    assessmentType: 'Health & Fitness Assessment',
    date: '2025-02-25',
    status: 'pending'
  },
  {
    sessionId: 'session_004',
    assessmentId: 'as_card_01',
    patientName: 'Sarah Wilson',
    assessmentType: 'Cardiac Assessment',
    date: '2025-02-24',
    status: 'completed',
    score: 91
  },
  {
    sessionId: 'session_005',
    assessmentId: 'as_hr_02',
    patientName: 'David Lee',
    assessmentType: 'Health & Fitness Assessment',
    date: '2025-02-23',
    status: 'failed'
  }
];

export const ReportGenerator = () => {
  const [sessionId, setSessionId] = useState('');
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  const filteredAssessments = mockAssessments.filter(assessment => {
    const matchesSearch = assessment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.sessionId.includes(searchTerm) ||
      assessment.assessmentType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleGenerateReport = async () => {
    if (!sessionId && !selectedAssessment) {
      toast({
        title: "Session Required",
        description: "Please enter a session ID or select an assessment",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    setProgress(0);

    try {
      // Simulate report generation progress
      const steps = [
        { progress: 20, message: "Reading assessment data..." },
        { progress: 40, message: "Applying configuration..." },
        { progress: 60, message: "Processing health metrics..." },
        { progress: 80, message: "Generating PDF layout..." },
        { progress: 100, message: "Finalizing report..." }
      ];

      for (const step of steps) {
        setProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Simulate API call for report generation
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId || selectedAssessment?.sessionId
        })
      });

      if (response.ok) {
        toast({
          title: "Report Generated Successfully! 🎉",
          description: "PDF report has been saved to local filesystem",
        });
      } else {
        throw new Error('Report generation failed');
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Unable to generate report. Please check session ID and try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
      setProgress(0);
    }
  };

  const getStatusIcon = (status: Assessment['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: Assessment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50';
    if (score >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Generate Report Card */}
      <Card className="bg-white border-0 shadow-xl">
        <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 rounded-t-xl sm:rounded-t-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="p-3 sm:p-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Generate Assessment Report</CardTitle>
              <CardDescription className="text-slate-600 text-sm sm:text-base lg:text-lg mt-1 sm:mt-2">
                Create professional PDF reports from existing assessment data using our flexible configuration system
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <Label htmlFor="sessionId" className="text-sm sm:text-base font-semibold text-slate-900 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Session ID
              </Label>
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                <Input
                  id="sessionId"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  className="pl-10 sm:pl-12 h-12 sm:h-14 bg-slate-50 border-slate-200 rounded-xl sm:rounded-2xl focus:bg-white transition-all text-sm sm:text-base"
                  placeholder="Enter session ID (e.g., session_001)"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-500">Enter the unique session identifier for the assessment</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Label className="text-sm sm:text-base font-semibold text-slate-900 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Assessment Type
              </Label>
              <Select>
                <SelectTrigger className="h-12 sm:h-14 bg-slate-50 border-slate-200 rounded-xl sm:rounded-2xl focus:bg-white text-sm sm:text-base">
                  <SelectValue placeholder="Auto-detect from data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="as_hr_02">Health & Fitness Assessment</SelectItem>
                  <SelectItem value="as_card_01">Cardiac Assessment</SelectItem>
                  <SelectItem value="auto">Auto-detect from session data</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs sm:text-sm text-slate-500">System will automatically detect the assessment type</p>
            </div>
          </div>

          {generating && (
            <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl sm:rounded-2xl border border-indigo-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-indigo-100 rounded-xl sm:rounded-2xl flex-shrink-0">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-indigo-900">Generating Your Report</h3>
                  <p className="text-sm sm:text-base text-indigo-700">Please wait while we process your assessment data...</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-semibold text-indigo-900">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-indigo-200 rounded-full h-3 sm:h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs sm:text-sm text-indigo-700">
                  Reading assessment data, applying configuration, and generating PDF...
                </p>
              </div>
            </div>
          )}

          <Button
            onClick={handleGenerateReport}
            disabled={generating || (!sessionId && !selectedAssessment)}
            className="w-full h-12 sm:h-14 lg:h-16 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-600 hover:from-indigo-600 hover:via-blue-600 hover:to-cyan-700 text-white font-semibold shadow-xl rounded-xl sm:rounded-2xl transition-all duration-300 text-sm sm:text-base lg:text-lg"
          >
            {generating ? (
              <div className="flex items-center gap-3">
                <RefreshCw className="w-6 h-6 animate-spin" />
                Generating Report...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Download className="w-6 h-6" />
                Generate PDF Report
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Available Assessments */}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-xl">
                  <Activity className="h-6 w-6 text-emerald-600" />
                </div>
                Available Assessments
              </CardTitle>
              <CardDescription className="text-slate-600 text-base mt-2">
                Select an assessment to generate its report or browse all available sessions
              </CardDescription>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-slate-50 border-slate-200 rounded-2xl focus:bg-white"
                placeholder="Search by patient name, session ID, or assessment type..."
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 h-12 bg-slate-50 border-slate-200 rounded-2xl">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {filteredAssessments.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-slate-100 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No assessments found</h3>
                <p className="text-slate-500">Try adjusting your search terms or filters</p>
              </div>
            ) : (
              filteredAssessments.map((assessment) => (
                <div
                  key={assessment.sessionId}
                  className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg group ${selectedAssessment?.sessionId === assessment.sessionId
                    ? 'border-blue-300 bg-blue-50 shadow-lg shadow-blue-100'
                    : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                    }`}
                  onClick={() => {
                    setSelectedAssessment(assessment);
                    setSessionId(assessment.sessionId);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {assessment.patientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-slate-900 text-xl">{assessment.patientName}</h4>
                          <Badge variant="outline" className="text-xs bg-white border-slate-300 rounded-lg px-3 py-1">
                            {assessment.sessionId}
                          </Badge>
                        </div>
                        <p className="text-slate-600 font-medium mb-3">{assessment.assessmentType}</p>
                        <div className="flex items-center gap-6 text-sm text-slate-500">
                          <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {assessment.date}
                          </span>
                          <span className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {assessment.assessmentId}
                          </span>
                          {assessment.score && (
                            <span className={`flex items-center gap-2 px-3 py-1 rounded-lg font-medium ${getScoreColor(assessment.score)}`}>
                              <BarChart3 className="h-4 w-4" />
                              Score: {assessment.score}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={`${getStatusColor(assessment.status)} px-4 py-2 rounded-xl border font-medium`}>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(assessment.status)}
                          <span className="capitalize">{assessment.status}</span>
                        </div>
                      </Badge>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-blue-100">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-blue-100">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};