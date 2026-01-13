import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  LayoutDashboard, 
  LogOut, 
  Award, 
  PieChart,
  ChevronLeft,
  ScanLine,
  Ticket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const navItems = [
    { label: 'Stats', icon: LayoutDashboard, path: '/admin' },
    { label: 'Members', icon: Users, path: '/admin/members' },
    { label: 'Verify', icon: ScanLine, path: '/admin/verify' },
    { label: 'Rewards', icon: Award, path: '/admin/rewards' },
    { label: 'Promos', icon: Ticket, path: '/admin/promos' },
  ];

  if (isMobile) {
    return (
      <div className="flex flex-col h-full w-full bg-brand-charcoal text-brand-white font-sans">
        <header className="flex items-center justify-between p-6 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-cursive text-2xl">Melba</span>
            <span className="text-[10px] bg-brand-silver/10 text-brand-silver px-2 py-0.5 rounded-full border border-brand-silver/20 font-bold uppercase tracking-tighter">Admin</span>
          </div>
          <Button 
            onClick={logout}
            variant="ghost" 
            size="icon"
            className="w-10 h-10 rounded-full shadow-neumorphic-out text-red-400 active:shadow-neumorphic-in"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </header>

        <main className="flex-grow p-4 overflow-y-auto pb-24">
          <Outlet />
        </main>

        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md h-16 bg-brand-charcoal/80 backdrop-blur-md rounded-full shadow-neumorphic-out z-50 border border-brand-white/5">
          <div className="flex justify-around h-full px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center w-full h-full transition-all duration-300",
                  isActive ? "text-brand-white scale-110" : "text-brand-silver/50"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  location.pathname === item.path ? "shadow-neumorphic-out-pressed text-brand-white" : ""
                )}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-light mt-1 uppercase tracking-tighter">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-brand-charcoal text-brand-white font-sans overflow-hidden">
      <aside className="w-64 border-r border-brand-white/5 flex flex-col h-full bg-[#1c1c1c]">
        <div className="p-8">
          <Link to="/admin" className="font-cursive text-3xl text-brand-white">Melba</Link>
          <p className="text-[10px] text-brand-silver tracking-[0.3em] uppercase mt-1">Admin Portal</p>
        </div>

        <nav className="flex-grow px-4 space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                isActive 
                  ? "shadow-neumorphic-in text-brand-white bg-brand-charcoal" 
                  : "text-brand-silver hover:text-brand-white shadow-neumorphic-out active:shadow-neumorphic-in"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-brand-white/5">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-brand-charcoal shadow-neumorphic-out border border-brand-white/5 flex items-center justify-center">
              <span className="font-bold text-brand-silver">A</span>
            </div>
            <div>
              <p className="text-xs font-medium truncate">{user?.name}</p>
              <p className="text-[9px] text-brand-silver uppercase tracking-wider">Super Admin</p>
            </div>
          </div>
          <Button 
            onClick={logout}
            variant="ghost" 
            className="w-full justify-start text-red-400 hover:text-red-300 shadow-neumorphic-out hover:shadow-neumorphic-in py-6 rounded-xl border-none"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col min-w-0">
        <header className="h-16 border-b border-brand-white/5 flex items-center justify-between px-8 bg-brand-charcoal">
          <h2 className="font-medium text-brand-white">
            {navItems.find(i => i.path === location.pathname)?.label || 'Overview'}
          </h2>
          <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold tracking-widest">
            SECURE ACCESS
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