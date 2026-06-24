import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, toggleTheme } from 'shared_remote/store';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  Settings, 
  LogOut, 
  Sun, 
  Moon, 
  Search, 
  Bell, 
  ChevronDown,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const theme = useSelector((state: any) => state.theme);
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, badge: null },
    { name: 'KYC Verification', icon: UserCheck, badge: '4' },
    { name: 'Accounts CS', icon: Users, badge: null },
    { name: 'Security Audit', icon: ShieldCheck, badge: 'new' },
    { name: 'System Settings', icon: Settings, badge: null },
  ];

  const handleLogout = () => {
    localStorage.removeItem('neocentra_token');
    dispatch(logout());
  };

  return (
    <div className={`min-h-screen flex font-sans relative overflow-hidden transition-colors duration-350 ${
      theme?.mode === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-950'
    }`}>
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Sidebar */}
      <aside className={`fixed top-0 bottom-0 left-0 z-20 flex flex-col border-r transition-all duration-300 ${
        theme?.mode === 'dark' 
          ? 'bg-slate-900/60 border-slate-850/80 backdrop-blur-xl' 
          : 'bg-white border-slate-200'
      } ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-inherit">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-teal-500 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-500/10">
              <span className="text-white font-black text-base tracking-tighter">N</span>
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight">NeoCentra</span>
                <span className="text-[10px] text-teal-500 font-bold tracking-wider uppercase">Backoffice</span>
              </div>
            )}
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-1.5 rounded-lg hover:bg-slate-800/30 transition-colors ${!sidebarOpen && 'mx-auto'}`}
          >
            {sidebarOpen ? <X className="w-4 h-4 text-slate-400" /> : <Menu className="w-5 h-5 text-slate-400" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-teal-400 border-l-2 border-teal-500' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/10'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'
                }`} />
                {sidebarOpen && (
                  <span className="text-sm font-medium flex-1 text-left">{item.name}</span>
                )}
                {sidebarOpen && item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    item.badge === 'new' 
                      ? 'bg-indigo-500/20 text-indigo-400' 
                      : 'bg-teal-500/20 text-teal-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-inherit flex flex-col gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-teal-400 font-bold uppercase text-xs">
              {auth?.user?.username?.substring(0, 2)}
            </div>
            {sidebarOpen && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold truncate">{auth?.user?.username}</span>
                <span className="text-[10px] text-slate-400 truncate">{auth?.user?.role}</span>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/10 transition-colors text-xs font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Navbar */}
        <header className={`h-16 flex items-center justify-between px-6 border-b z-10 sticky top-0 transition-colors duration-350 ${
          theme?.mode === 'dark' 
            ? 'bg-slate-950/80 border-slate-900/80 backdrop-blur-xl' 
            : 'bg-slate-50/80 border-slate-200 backdrop-blur-xl'
        }`}>
          {/* Search bar */}
          <div className="w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search customers, transactions..." 
              className="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
            />
          </div>

          {/* Right Header Operations */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-colors"
            >
              {theme?.mode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500" />
            </button>

            {/* Profile Info */}
            <div className="h-8 border-l border-slate-800" />
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">{auth?.user?.email}</p>
                <p className="text-[10px] text-teal-500 font-bold">Session Active</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-8 overflow-y-auto relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}

