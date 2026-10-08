'use client';

import React from 'react';
import { SlidersHorizontal, Calendar, Search, RotateCcw, X, Layers, Tag } from 'lucide-react';
import { FilterState } from '@/types/pizza';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  categories: string[];
  sizes: string[];
}

const MONTHS = [
  'All', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['All', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  onReset,
  categories,
  sizes,
}) => {
  const activeCount = [
    filters.category !== 'All' ? 1 : 0,
    filters.size !== 'All' ? 1 : 0,
    filters.day !== 'All' ? 1 : 0,
    filters.month !== 'All' ? 1 : 0,
    filters.startDate ? 1 : 0,
    filters.endDate ? 1 : 0,
    filters.searchTerm ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const handleCategoryChange = (cat: string) => {
    setFilters((prev) => ({ ...prev, category: cat }));
  };

  const handleSizeChange = (sz: string) => {
    setFilters((prev) => ({ ...prev, size: sz }));
  };

  return (
    <div className="intel-card rounded-2xl p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Label & Indicator */}
        <div className="flex items-center space-x-2.5 text-xs font-semibold text-slate-400 border-b lg:border-b-0 lg:border-r border-slate-800/80 pb-2.5 lg:pb-0 lg:pr-5 shrink-0">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold">DIMENSION SLICERS</span>
              {activeCount > 0 && (
                <span className="bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded-md text-[10px] font-bold font-mono">
                  {activeCount} active
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 font-normal">Cross-filter all DAX metrics</p>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 flex-1">
          
          {/* Category */}
          <div>
            <label className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-amber-400" /> Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-[#111728] border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-medium cursor-pointer hover:border-slate-700 transition"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Size */}
          <div>
            <label className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3 h-3 text-blue-400" /> Size
            </label>
            <select
              value={filters.size}
              onChange={(e) => handleSizeChange(e.target.value)}
              className="w-full bg-[#111728] border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-medium cursor-pointer hover:border-slate-700 transition"
            >
              <option value="All">All Sizes</option>
              {sizes.map((sz) => (
                <option key={sz} value={sz}>
                  {sz === 'S' ? 'Regular (S)' : sz === 'M' ? 'Medium (M)' : sz === 'L' ? 'Large (L)' : sz === 'XL' ? 'X-Large (XL)' : 'XX-Large (XXL)'}
                </option>
              ))}
            </select>
          </div>

          {/* Month */}
          <div>
            <label className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-emerald-400" /> Month
            </label>
            <select
              value={filters.month}
              onChange={(e) => setFilters((p) => ({ ...p, month: e.target.value }))}
              className="w-full bg-[#111728] border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-medium cursor-pointer hover:border-slate-700 transition"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m === 'All' ? 'All Months (2015)' : m}
                </option>
              ))}
            </select>
          </div>

          {/* Day */}
          <div>
            <label className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-purple-400" /> Day of Week
            </label>
            <select
              value={filters.day}
              onChange={(e) => setFilters((p) => ({ ...p, day: e.target.value }))}
              className="w-full bg-[#111728] border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-medium cursor-pointer hover:border-slate-700 transition"
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'All Days' : d}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Search className="w-3 h-3 text-amber-400" /> Search Pizza
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.searchTerm}
                onChange={(e) => setFilters((p) => ({ ...p, searchTerm: e.target.value }))}
                placeholder="Search Hawaiian, Thai..."
                className="w-full bg-[#111728] border border-slate-800 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-medium hover:border-slate-700 transition"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              {filters.searchTerm && (
                <button
                  onClick={() => setFilters((p) => ({ ...p, searchTerm: '' }))}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Applied Slicers Badges */}
      {activeCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-800/80 text-xs">
          <span className="text-[11px] font-mono text-slate-500 font-medium">Applied Slicers:</span>
          {filters.category !== 'All' && (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-medium">
              <span>Category: <strong>{filters.category}</strong></span>
              <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => handleCategoryChange('All')} />
            </span>
          )}
          {filters.size !== 'All' && (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-medium">
              <span>Size: <strong>{filters.size}</strong></span>
              <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => handleSizeChange('All')} />
            </span>
          )}
          {filters.month !== 'All' && (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium">
              <span>Month: <strong>{filters.month}</strong></span>
              <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setFilters((p) => ({ ...p, month: 'All' }))} />
            </span>
          )}
          {filters.day !== 'All' && (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-medium">
              <span>Day: <strong>{filters.day}</strong></span>
              <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setFilters((p) => ({ ...p, day: 'All' }))} />
            </span>
          )}
          {filters.searchTerm && (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-medium">
              <span>Query: <strong>&quot;{filters.searchTerm}&quot;</strong></span>
              <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setFilters((p) => ({ ...p, searchTerm: '' }))} />
            </span>
          )}

          <button
            onClick={onReset}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1 ml-auto"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}
    </div>
  );
};
