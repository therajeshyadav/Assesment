import { ReactNode, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  Activity,
  Users,
  Home,
  ChevronRight,
  Plus,
  TrendingUp,
  Zap,
  Shield,
  MoreVertical
} from 'lucide-react';

type DashboardView = 'overview' | 'reports' | 'settings';

interface DashboardLayoutProps {
  children: ReactNode;
  user: { name: string; email: string; role?: string };
  onLogout: () => void;
  currentView?: DashboardView;
  onViewChange?: (view: DashboardView) => void;
}

export const DashboardLayout = ({ 
  children, 
  user, 
  onLogout, 
  currentView = 'overview',
  onViewChange 
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (sidebarOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen, isMobile]);

  const navigation = [
    { 
      name: 'Dashboard', 
      icon: Home, 
      view: 'overview' as DashboardView, 
      active: currentView === 'overview',
      badge: null
    },
    { 
      name: 'Generate Report', 
      icon: FileText, 
      view: 'reports' as DashboardView, 
      active: currentView === 'reports',
      badge: 'New'
    },
    { 
      name: 'Assessment Types', 
      icon: Activity, 
      view: 'settings' as DashboardView, 
      active: false,
      badge: null
    },
    { 
      name: 'User Management', 
      icon: Users, 
      view: 'settings' as DashboardView, 
      active: false,
      badge: null
    },
    { 
      name: 'Settings', 
      icon: Settings, 
      view: 'settings' as DashboardView, 
      active: currentView === 'settings',
      badge: null
    },
  ];

  const handleNavClick = (view: DashboardView) => {
    if (onViewChange) {
      onViewChange(view);
    }
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-white shadow-2xl transform transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0 lg:flex lg:flex-col border-r border-slate-200`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 shadow-lg relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          
          <div className="flex items-center gap-3 sm:gap-4 relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-white">AssessmentPro</h1>
              <p className="text-xs sm:text-sm text-blue-100">Healthcare Platform</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-white">AssessmentPro</h1>
            </div>
          </div>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all relative z-10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 sm:px-6 py-6 sm:py-8 space-y-1 sm:space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.view)}
              className={`w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4 text-left font-medium rounded-xl sm:rounded-2xl transition-all duration-200 group relative ${
                item.active
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-500/25 transform scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-md'
              }`}
            >
              <div className={`p-2 rounded-lg sm:rounded-xl ${
                item.active 
                  ? 'bg-white/20' 
                  : 'bg-slate-100 group-hover:bg-white group-hover:shadow-sm'
              }`}>
                <item.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${
                  item.active ? 'text-white' : 'text-slate-500 group-hover:text-indigo-600'
                }`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <span className="text-sm sm:text-base font-medium truncate">{item.name}</span>
              </div>
              
              {item.badge && (
                <Badge className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </Badge>
              )}
              
              {item.active && (
                <div className="ml-auto">
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Quick Stats - Hidden on small screens */}
        <div className="hidden sm:block px-4 sm:px-6 py-4">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 rounded-lg sm:rounded-xl">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Quick Stats</h3>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-slate-600">Reports Today</span>
                <span className="text-sm sm:text-lg font-bold text-indigo-600">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-slate-600">Active Sessions</span>
                <span className="text-sm sm:text-lg font-bold text-emerald-600">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-slate-600">Success Rate</span>
                <span className="text-sm sm:text-lg font-bold text-emerald-600">97.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-indigo-200 shadow-md">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold text-sm sm:text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 truncate text-sm sm:text-base">{user.name}</p>
              <p className="text-xs sm:text-sm text-slate-500 truncate">{user.role || 'Healthcare Professional'}</p>
            </div>
            
            {/* Logout Button */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="h-8 w-8 sm:h-10 sm:w-10 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all group"
                title="Logout"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200 z-40 sticky top-0">
          <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
            {/* Left Section */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-500 hover:text-slate-700 p-2 sm:p-3 rounded-xl hover:bg-slate-100 transition-all"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 truncate">
                  {currentView === 'overview' ? 'Dashboard Overview' : 
                   currentView === 'reports' ? 'Report Generator' : 'Settings'}
                </h1>
                <p className="hidden sm:block text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
                  {currentView === 'overview' ? 'Monitor your assessment activities and system performance' : 
                   currentView === 'reports' ? 'Generate PDF reports from assessment data' : 'Manage your preferences and configurations'}
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              {/* Search - Hidden on small screens */}
              <div className="hidden lg:block relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search assessments..."
                  className="pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm w-64 xl:w-80 transition-all"
                />
              </div>

              {/* Quick Action Button - Responsive */}
              <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-lg rounded-lg sm:rounded-xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-sm sm:text-base">
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">New Report</span>
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="h-10 w-10 sm:h-12 sm:w-12 p-0 relative rounded-lg sm:rounded-xl hover:bg-slate-100">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 p-0 text-xs bg-red-500 text-white border-2 border-white rounded-full">
                  3
                </Badge>
              </Button>

              {/* User Menu */}
              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-slate-200">
                <div className="hidden md:block text-right">
                  <p className="font-semibold text-slate-900 text-sm truncate max-w-32">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate max-w-32">{user.role || 'Healthcare Professional'}</p>
                </div>
                
                <div className="relative group">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-slate-200 cursor-pointer transition-all group-hover:ring-indigo-300">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold text-sm sm:text-base">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Mobile user info tooltip */}
                  <div className="md:hidden absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-slate-200 p-3 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <p className="font-semibold text-slate-900 text-sm">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.role || 'Healthcare Professional'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Mobile Search Bar */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search assessments..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};