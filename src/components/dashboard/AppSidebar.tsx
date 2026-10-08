'use client';

import React from 'react';
import { Home, LayoutGrid, BarChart3, Trophy, Table, Settings, Pizza } from 'lucide-react';

interface AppSidebarProps {
  activeTab: 'executive' | 'sellers' | 'explorer';
  setActiveTab: (tab: 'executive' | 'sellers' | 'explorer') => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-16 lg:w-20 bg-[#130d0a] border-r border-[#281c16] flex flex-col items-center py-5 justify-between shrink-0 min-h-screen">
      
      {/* Top Logo Mark (Image 1 Green/Orange Icon) */}
      <div className="flex flex-col items-center space-y-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-orange-500/20">
          <Pizza className="w-6 h-6 text-slate-950 animate-pulse" />
        </div>

        {/* Navigation Icon Buttons */}
        <nav className="flex flex-col items-center space-y-4">
          <button
            onClick={() => setActiveTab('executive')}
            title="Executive Dashboard"
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              activeTab === 'executive'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-lg shadow-orange-500/30 font-bold scale-105'
                : 'text-slate-400 hover:text-white hover:bg-[#241913]'
            }`}
          >
            <Home className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('sellers')}
            title="Best & Worst Sellers"
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              activeTab === 'sellers'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-lg shadow-orange-500/30 font-bold scale-105'
                : 'text-slate-400 hover:text-white hover:bg-[#241913]'
            }`}
          >
            <Trophy className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('explorer')}
            title="Raw Dataset Explorer"
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              activeTab === 'explorer'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-lg shadow-orange-500/30 font-bold scale-105'
                : 'text-slate-400 hover:text-white hover:bg-[#241913]'
            }`}
          >
            <Table className="w-5 h-5" />
          </button>
        </nav>
      </div>

      {/* Bottom Settings Icon */}
      <div className="flex flex-col items-center space-y-3">
        <button className="w-10 h-10 rounded-xl text-slate-500 hover:text-white hover:bg-[#241913] flex items-center justify-center transition">
          <Settings className="w-5 h-5" />
        </button>
      </div>

    </aside>
  );
};
