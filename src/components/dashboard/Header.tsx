'use client';

import React from 'react';
import { LayoutDashboard, Trophy, Table, RotateCcw, Activity } from 'lucide-react';

interface HeaderProps {
  activeTab: 'executive' | 'sellers' | 'explorer';
  setActiveTab: (tab: 'executive' | 'sellers' | 'explorer') => void;
  recordCount: number;
  totalRecords: number;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  recordCount,
  totalRecords,
  hasActiveFilters,
  onResetFilters,
}) => {
  return (
    <header className="bg-[#0b101d]/90 border-b border-slate-800/80 text-white sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-3">
          
          {/* Product Brand & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-sm font-mono shadow-inner">
              PI
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="text-base font-bold tracking-tight text-white font-sans">
                  PIZZA SALES <span className="text-amber-400 font-mono font-medium text-xs ml-1 px-1.5 py-0.5 bg-amber-500/10 rounded border border-amber-500/20">ENTERPRISE BI</span>
                </h1>
                <span className="hidden sm:inline-flex items-center space-x-1.5 px-2 py-0.5 text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-Time Dax Engine</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-normal">
                Executive Business Intelligence & Financial Operations System
              </p>
            </div>
          </div>

          {/* Navigation Tabs & Live Dataset Status */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-3">
            
            <nav className="flex items-center bg-[#111728] p-1 rounded-xl border border-slate-800/90 shadow-inner">
              <button
                onClick={() => setActiveTab('executive')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'executive'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Executive Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('sellers')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'sellers'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Menu Intelligence</span>
              </button>

              <button
                onClick={() => setActiveTab('explorer')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'explorer'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Dataset Explorer</span>
              </button>
            </nav>

            {/* Live Data Badge & Reset Button */}
            <div className="flex items-center space-x-2">
              <div className="px-3 py-1 bg-[#111728] text-slate-300 rounded-lg border border-slate-800/90 text-xs font-mono flex items-center space-x-2">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span><strong className="text-white font-bold">{recordCount.toLocaleString()}</strong> / {totalRecords.toLocaleString()} rows</span>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={onResetFilters}
                  className="flex items-center space-x-1.5 px-3 py-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-xs font-semibold transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Slicers</span>
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
