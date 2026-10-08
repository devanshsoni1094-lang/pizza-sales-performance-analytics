'use client';

import React from 'react';
import { Pizza, LayoutDashboard, Trophy, Table, RotateCcw, Filter, Sparkles } from 'lucide-react';

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
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
          
          {/* Brand & Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-amber-500/20 p-2.5 rounded-xl border border-amber-500/30 text-amber-400">
              <Pizza className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                  PIZZA SALES ANALYSIS DASHBOARD
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
                  Power BI Web App
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Interactive Business Intelligence & Operational Analytics
              </p>
            </div>
          </div>

          {/* Navigation Tabs & Active Filter Status */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-2">
            <nav className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700/60">
              <button
                onClick={() => setActiveTab('executive')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === 'executive'
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Home / Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('sellers')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === 'sellers'
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Best & Worst Sellers</span>
              </button>

              <button
                onClick={() => setActiveTab('explorer')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === 'explorer'
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Data Explorer</span>
              </button>
            </nav>

            {/* Live Records Count Badge & Reset */}
            <div className="flex items-center space-x-2">
              <div className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md border border-slate-700 text-xs font-mono">
                <span className="text-amber-400 font-bold">{recordCount.toLocaleString()}</span> / {totalRecords.toLocaleString()} rows
              </div>

              {hasActiveFilters && (
                <button
                  onClick={onResetFilters}
                  className="flex items-center space-x-1 px-2.5 py-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-md text-xs font-medium transition"
                  title="Clear all active slicers"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
