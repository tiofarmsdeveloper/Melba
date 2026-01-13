import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Award, 
  PieChart,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/admin' },
    { label: 'Members', icon: Users, path: '/admin/members' },
    { label: 'Rewards Manager', icon: Award, path: '/admin/rewards' },
    { label: 'Analytics', icon: PieChart, path: '/admin/analytics' },
  ];

  return (
    <div className="flex h-screen bg-brand-charcoal text-brand-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-brand-white/5 flex flex-col h-full bg-[#1c1c1c]">
        <div className="p-8">
          <Link to="/admin" className="font-cursive text-3xl text-brand-white">Melba</Link>
          <p className="text-[10px] text-brand-silver tracking-[0.3em] uppercase mt-1">Admin Portal</p>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                location.pathname === item.path 
                  ? "bg-brand-white/5 text-brand-white shadow-neumorphic-out" 
                  : "text-brand-silver hover:text-brand-white hover:bg-brand-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", location.pathname === item.path ? "text-brand-white" : "text-brand-silver")} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-brand-white/5">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-brand-charcoal shadow-neumorphic-out border border-brand-white/5 flex items-center justify-center">
              <span className="font-bold text-brand-silver">A</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-[10px] text-brand-silver uppercase tracking-wider">Super Admin</p>
            </div>
          </div>
          <Button 
            onClick={logout}
            variant="ghost" 
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10 gap-3 px-4 py-6 rounded-xl"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0">
        <header className="h-16 border-b border-brand-white/5 flex items-center justify-between px-8 bg-brand-charcoal">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-brand-silver hover:text-brand-white"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="font-medium text-brand-white">
              {navItems.find(i => i.path === location.pathname)?.label || 'Admin Panel'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold tracking-widest">
               SYSTEM ONLINE
             </div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;