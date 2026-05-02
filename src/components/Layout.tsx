import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import SecurityGuard from './SecurityGuard';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <SecurityGuard>
      <div 
        className="flex h-screen w-full overflow-hidden text-[#2e2d2e] font-sans bg-[#f7f3ee]"
      >
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className="flex flex-1 flex-col overflow-hidden bg-transparent">
          <Header />
          <main className="flex-1 overflow-y-auto px-6 pb-2 pt-0 flex flex-col custom-scrollbar relative z-0">
            <Outlet />
          </main>
        </div>
      </div>
    </SecurityGuard>
  );
}
