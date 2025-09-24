import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  Activity, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Settings,
  ArrowUpRight,
  Download,
  Eye,
  Calendar,
  Zap,
  Shield,
  Database
} from 'lucide-react';

export const DashboardOverview = () => {
  const recentReports = [
    {
      id: 1,
      patient: 'John Smith',
      type: 'Health & Fitness Assessment',
      sessionId: 'session_001',
      date: '2 hours ago',
      status: 'completed' as const,
      score: 85,
      avatar: 'JS'
    },
    {
      id: 2,
      patient: 'Emma Johnson',
      type: 'Cardiac Assessment',
      sessionId: 'session_002',
      date: '5 hours ago',
      status: 'completed' as const,
      score: 72,
      avatar: 'EJ'
    },
    {
      id: 3,
      patient: 'Michael Brown',
      type: 'Health & Fitness Assessment',
      sessionId: 'session_003',
      date: '1 day ago',
      status: 'pending' as const,
      score: null,
      avatar: 'MB'
    },
    {
      id: 4,
      patient: 'Sarah Wilson',
      type: 'Cardiac Assessment',
      sessionId: 'session_004',
      date: '2 days ago',
      status: 'failed' as const,
      score: null,
      avatar: 'SW'
    }
  ];

  const assessmentTypes = [
    { name: 'Health & Fitness Assessment', count: 124, percentage: 68, color: 'bg-blue-500' },
    { name: 'Cardiac Assessment', count: 58, percentage: 32, color: 'bg-emerald-500' }
  ];

  const getStatusIcon = (status: 'completed' | 'pending' | 'failed') => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: 'completed' | 'pending' | 'failed') => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Header */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white/5 rounded-full -translate-y-16 translate-x-16 sm:-translate-y-32 sm:translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-white/5 rounded-full translate-y-12 -translate-x-12 sm:translate-y-24 sm:-translate-x-24"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">Welcome back! 👋</h1>
            <p className="text-blue-100 text-base sm:text-lg mb-4 sm:mb-6 max-w-2xl">
              Your assessment management platform is running smoothly. Here's what's happening today.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-blue-100">All Systems Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-200" />
                <span className="text-blue-100">Last updated: Just now</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 xl:w-32 xl:h-32 bg-white/10 rounded-2xl xl:rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <Activity className="h-12 w-12 xl:h-16 xl:w-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Total Reports</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">1,247</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs sm:text-sm text-emerald-600 font-medium">+12.3%</span>
                  <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">vs last month</span>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-indigo-50 rounded-xl sm:rounded-2xl group-hover:bg-indigo-100 transition-colors">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Active Sessions</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">38</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs sm:text-sm text-emerald-600 font-medium">+5.2%</span>
                  <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">vs yesterday</span>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-emerald-50 rounded-xl sm:rounded-2xl group-hover:bg-emerald-100 transition-colors">
                <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Registered Users</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">456</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs sm:text-sm text-emerald-600 font-medium">+8.1%</span>
                  <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">vs last week</span>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-purple-50 rounded-xl sm:rounded-2xl group-hover:bg-purple-100 transition-colors">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Success Rate</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">97.4%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs sm:text-sm text-emerald-600 font-medium">+0.8%</span>
                  <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">improvement</span>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-orange-50 rounded-xl sm:rounded-2xl group-hover:bg-orange-100 transition-colors">
                <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Reports */}
        <Card className="lg:col-span-2 bg-white border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <div className="p-2 bg-indigo-50 rounded-xl">
                    <Clock className="h-5 w-5 text-indigo-600" />
                  </div>
                  <span className="text-lg sm:text-xl">Recent Reports</span>
                </CardTitle>
                <CardDescription className="text-slate-600 mt-1 text-sm sm:text-base">
                  Latest assessment reports and their status
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl self-start sm:self-auto">
                <span className="text-sm">View All</span>
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all duration-200 group">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base flex-shrink-0">
                      {report.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base truncate">{report.patient}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mb-2 truncate">{report.type}</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <Badge variant="outline" className="text-xs bg-white border-slate-300 rounded-lg px-2 py-1">
                          {report.sessionId}
                        </Badge>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.date}
                        </span>
                        {report.score && (
                          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                            Score: {report.score}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-3">
                    <Badge className={`${getStatusColor(report.status)} px-3 py-2 rounded-xl border flex-shrink-0`}>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(report.status)}
                        <span className="capitalize font-medium text-xs">{report.status}</span>
                      </div>
                    </Badge>
                    
                    <div className="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Types & Quick Actions */}
        <div className="space-y-6">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl">
                  <BarChart3 className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="text-lg sm:text-xl">Assessment Types</span>
              </CardTitle>
              <CardDescription className="text-slate-600 text-sm sm:text-base">
                Distribution of assessment types
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {assessmentTypes.map((type, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900 truncate pr-2">{type.name}</span>
                    <span className="text-sm font-bold text-indigo-600 flex-shrink-0">{type.count}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 sm:h-3 overflow-hidden">
                        <div 
                          className={`h-full ${type.color} rounded-full transition-all duration-500`}
                          style={{ width: `${type.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-600 flex-shrink-0">{type.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Quick Actions */}
              <div className="pt-4 sm:pt-6 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-3 sm:mb-4">Quick Actions</h4>
                <div className="space-y-2 sm:space-y-3">
                  <Button className="w-full justify-start bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-0 rounded-xl p-3 sm:p-4 h-auto">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <FileText className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-sm sm:text-base">Generate New Report</div>
                        <div className="text-xs text-indigo-600">Create assessment report</div>
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-slate-200 hover:bg-slate-50 rounded-xl p-3 sm:p-4 h-auto">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <Settings className="h-4 w-4 text-slate-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-slate-900 text-sm sm:text-base">Configure Assessment</div>
                        <div className="text-xs text-slate-500">Manage settings</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Status */}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-3 text-slate-900">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <Shield className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-lg sm:text-xl">System Health & Status</span>
          </CardTitle>
          <CardDescription className="text-slate-600 text-sm sm:text-base">
            Current system health and configuration status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-emerald-50 rounded-xl sm:rounded-2xl border border-emerald-100">
              <div className="p-2 sm:p-3 bg-emerald-100 rounded-xl sm:rounded-2xl flex-shrink-0">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-emerald-800 mb-1 text-sm sm:text-base">API Endpoints</p>
                <p className="text-xs sm:text-sm text-emerald-600 mb-1">All systems operational</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-emerald-600">99.9% uptime</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-indigo-50 rounded-xl sm:rounded-2xl border border-indigo-100">
              <div className="p-2 sm:p-3 bg-indigo-100 rounded-xl sm:rounded-2xl flex-shrink-0">
                <Database className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-indigo-800 mb-1 text-sm sm:text-base">Configuration System</p>
                <p className="text-xs sm:text-sm text-indigo-600 mb-1">Ready for new assessment types</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-xs text-indigo-600">2 configs active</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-purple-50 rounded-xl sm:rounded-2xl border border-purple-100 sm:col-span-2 lg:col-span-1">
              <div className="p-2 sm:p-3 bg-purple-100 rounded-xl sm:rounded-2xl flex-shrink-0">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-purple-800 mb-1 text-sm sm:text-base">PDF Generation</p>
                <p className="text-xs sm:text-sm text-purple-600 mb-1">Puppeteer service active</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-purple-600">24 reports today</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};