import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronLeft,
  ChevronRight,
  Lock,
  LogOut,
  TrendingUp,
  LayoutDashboard,
  ArrowDownToLine,
  ArrowUpRight,
  Boxes,
  RotateCcw,
  Settings,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';
import { MENU_ITEMS } from '../config/menu';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="relative flex h-screen flex-col bg-[#1A233A] shadow-[4px_0_24px_rgba(0,0,0,0.05)] z-20"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 z-50 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#1A233A] bg-[#5686bb] text-white shadow-lg hover:bg-[#669bbc] transition-colors focus:outline-none"
      >
        {isCollapsed ? <ChevronRight size={12} className="ml-0.5" /> : <ChevronLeft size={12} className="mr-0.5" />}
      </button>

      {/* Logo Area */}
      <div className="flex h-24 items-center justify-center border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gradient-to-br from-[#5686bb] to-[#003049] text-white shadow-[0_4px_15px_rgba(86,134,187,0.4)] relative">
            <TrendingUp size={28} strokeWidth={2.5} />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#f2b33d] rounded-full shadow-[0_0_8px_rgba(242,179,61,1)] animate-pulse border border-[#5686bb]"></div>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[24px] font-sans tracking-tight">
                <span className="text-white font-light">SALE</span>
                <span className="text-[#669bbc] font-black">PRO</span>
              </div>
              <span className="text-[9px] font-black text-slate-400 tracking-[0.2em] uppercase mt-0.5">
                CRM & Marketing Hub
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
        {/* Dashboard Button */}
        <div>
          {MENU_ITEMS.filter(item => item.id === 'dashboard' || item.id === 'calendar').map((item) => {
            const Icon = item.icon;
            const isActiveRoute = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => twMerge(clsx(
                  "group flex items-center rounded-xl px-4 py-3.5 text-sm font-black uppercase tracking-wider transition-all mb-1.5",
                  isActive || isActiveRoute
                    ? "bg-gradient-to-r from-[#5686bb] to-[#2e395f] text-white shadow-[0_4px_12px_rgba(86,134,187,0.3)]" 
                    : "text-[#9a9ca1] hover:bg-white/5 hover:text-white",
                  isCollapsed && "justify-center px-0"
                ))}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon size={20} className={clsx("shrink-0", isCollapsed ? "mr-0" : "mr-4")} />
                {!isCollapsed && <span>{item.name === 'Sales Dashboard' ? 'Dashboard' : item.name}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* Modules Section */}
        <div>
          {!isCollapsed && (
            <h3 className="text-[10px] font-black text-[#5686bb] uppercase tracking-[0.2em] mb-4 px-2 mt-4">
              SALE PRO MODULES
            </h3>
          )}
          <div className="space-y-1.5">
            {MENU_ITEMS.filter(item => item.id !== 'dashboard' && item.id !== 'calendar').map((item) => {
              const Icon = item.icon;
              const isActiveRoute = location.pathname.startsWith(item.path);
              
              return (
                <React.Fragment key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => twMerge(clsx(
                    "group flex items-center rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all",
                    isActive || isActiveRoute
                      ? "bg-[#5686bb]/10 text-white border border-[#5686bb]/20 shadow-inner" 
                      : "text-[#9a9ca1] hover:bg-white/5 hover:text-[#e9e4dc]",
                    isCollapsed && "justify-center px-0"
                  ))}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon size={18} className={clsx("shrink-0", isCollapsed ? "mr-0" : "mr-4")} />
                  
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 truncate">{item.name}</span>
                      <ChevronRightIcon size={14} className="text-slate-500 group-hover:text-white transition-colors" />
                    </>
                  )}

                  {item.isConfidential && (
                    <Lock 
                      size={12} 
                      className={clsx(
                        "text-red-400", 
                        isCollapsed ? "absolute top-2 right-2" : "ml-2"
                      )} 
                    />
                  )}
                </NavLink>
                
                {/* Render sub-menu items if active and have children */}
                {isActiveRoute && item.subItems && !isCollapsed && (
                  <div className="pl-10 space-y-1 mt-1 mb-2">
                    {item.subItems.map((subItem: any, subIdx: number) => (
                      <NavLink
                        key={subIdx}
                        to={subItem.path}
                        className={({ isActive: isSubActive }) => twMerge(clsx(
                          "flex items-center gap-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors",
                          isSubActive ? "text-[#f2b33d]" : "text-[#7188a2] hover:text-[#9a9ca1]"
                        ))}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Actual User Profile Area */}
      {user && (
        <div className="border-t border-white/5 p-4 bg-transparent">
          <div className={clsx("flex items-center justify-between", isCollapsed ? "justify-center" : "gap-3")}>
            <div className="flex items-center gap-3 overflow-hidden">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-10 w-10 shrink-0 rounded-lg object-cover border border-[#5686bb]/50 p-0.5"
                />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#5686bb] text-white font-bold">
                  {user.name.charAt(0)}
                </div>
              )}
              {!isCollapsed && (
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-xs font-bold text-white tracking-wide">{user.name}</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-[#849e51] rounded-full animate-pulse"></span>
                    <span className="truncate text-[10px] text-[#7188a2] font-medium tracking-wide">{user.role || 'Lead Developer'}</span>
                  </div>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <button 
                onClick={logout} 
                className="p-1.5 text-[#7188a2] hover:text-[#c1121f] transition-colors shrink-0" 
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
          {isCollapsed && (
            <button 
              onClick={logout} 
              className="mt-4 w-full flex justify-center p-2 text-[#7188a2] hover:text-[#c1121f] transition-colors" 
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      )}

    </motion.aside>
  );
}
