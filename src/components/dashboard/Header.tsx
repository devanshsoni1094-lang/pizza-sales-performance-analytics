'use client';

import React from 'react';
import { Search, RotateCcw, Calendar, Check, Bell, Moon } from 'lucide-react';
import { FilterState } from '@/types/pizza';

interface HeaderProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onResetFilters: () => void;
  recordCount: number;
  totalRecords: number;
}

export const Header: React.FC<HeaderProps> = ({
  filters,
  setFilters,
  onResetFilters,
  recordCount,
  totalRecords,
}) => {
  const isAprSelected = filters.month === 'April';

  return (
    <header className="bg-[#130d0a]/90 border-b border-[#281c16] text-white px-4 lg:px-6 py-3.5 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Search Bar (Image 1 Style) */}
        <div className="flex items-center space-x-3 flex-1 max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => setFilters((p) => ({ ...p, searchTerm: e.target.value }))}
              placeholder="Search pizza, category, order ID..."
              className="w-full bg-[#1a120e] border border-[#2e1f17] text-slate-200 text-xs rounded-2xl pl-10 pr-12 py-2 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition shadow-inner font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <span className="absolute right-3 top-2 px-1.5 py-0.5 rounded bg-[#281c16] text-[10px] text-slate-400 font-mono">
              ⌘Space
            </span>
          </div>
        </div>

        {/* Center: Date Slicer Preset Selector (Apr 2015 vs All 2015) */}
        <div className="flex items-center bg-[#1a120e] p-1 rounded-2xl border border-[#2e1f17]">
          <button
            onClick={() => setFilters((p) => ({ ...p, month: 'April' }))}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isAprSelected
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Apr 2015 ($68,737 Match)</span>
            {isAprSelected && <Check className="w-3 h-3 ml-1" />}
          </button>

          <button
            onClick={() => setFilters((p) => ({ ...p, month: 'All' }))}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              !isAprSelected
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>All 2015 ($817,860 Full Year)</span>
            {!isAprSelected && <Check className="w-3 h-3 ml-1" />}
          </button>
        </div>

        {/* Right: Quick Reset & User Profile */}
        <div className="flex items-center space-x-3 justify-end">
          <div className="px-3 py-1 bg-[#1a120e] rounded-xl border border-[#2e1f17] text-xs font-mono text-slate-300">
            <span className="text-orange-400 font-bold">{recordCount.toLocaleString()}</span> / {totalRecords.toLocaleString()} rows
          </div>

          <button
            onClick={onResetFilters}
            className="p-2 rounded-xl bg-[#1a120e] text-slate-400 hover:text-white border border-[#2e1f17] hover:border-orange-500/40 transition"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2 pl-2 border-l border-[#281c16]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-slate-950 font-bold text-xs">
              DS
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-white leading-none">Devansh Soni</span>
              <span className="text-[10px] text-orange-400 font-mono">@executive_analyst</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
