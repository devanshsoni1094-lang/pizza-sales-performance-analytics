'use client';

import React from 'react';
import { Filter, Calendar, Search, RotateCcw, X, Layers, Tag } from 'lucide-react';
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

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, month: e.target.value }));
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, day: e.target.value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchTerm: e.target.value }));
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 mb-6 shadow-md backdrop-blur-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Slicers Header */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 border-b lg:border-b-0 lg:border-r border-slate-800 pb-2 lg:pb-0 lg:pr-4">
          <Filter className="w-4 h-4 text-amber-400" />
          <span>POWER BI SLICERS</span>
          {activeCount > 0 && (
            <span className="bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
              {activeCount} active
            </span>
          )}
        </div>

        {/* Filters Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 flex-1">
          
          {/* Category Quick Pills */}
          <div>
            <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Layers className="w-3 h-3 text-amber-400" /> Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Size Dropdown */}
          <div>
            <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Tag className="w-3 h-3 text-blue-400" /> Size
            </label>
            <select
              value={filters.size}
              onChange={(e) => handleSizeChange(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="All">All Sizes</option>
              {sizes.map((sz) => (
                <option key={sz} value={sz}>
                  {sz === 'S' ? 'Regular (S)' : sz === 'M' ? 'Medium (M)' : sz === 'L' ? 'Large (L)' : sz === 'XL' ? 'X-Large (XL)' : 'XX-Large (XXL)'}
                </option>
              ))}
            </select>
          </div>

          {/* Month Dropdown */}
          <div>
            <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-green-400" /> Month
            </label>
            <select
              value={filters.month}
              onChange={handleMonthChange}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m === 'All' ? 'All Months (2015)' : m}
                </option>
              ))}
            </select>
          </div>

          {/* Day Dropdown */}
          <div>
            <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-purple-400" /> Day of Week
            </label>
            <select
              value={filters.day}
              onChange={handleDayChange}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'All Days' : d}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Search className="w-3 h-3 text-amber-400" /> Search Pizza
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.searchTerm}
                onChange={handleSearchChange}
                placeholder="e.g. Hawaiian, Thai..."
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg pl-8 pr-2.5 py-1.5 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2" />
              {filters.searchTerm && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, searchTerm: '' }))}
                  className="absolute right-2 top-2 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Active Filter Badges */}
      {activeCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-slate-800 text-xs">
          <span className="text-[11px] text-slate-500 font-medium">Applied Slicers:</span>
          {filters.category !== 'All' && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs">
              <span>Category: {filters.category}</span>
              <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => handleCategoryChange('All')} />
            </span>
          )}
          {filters.size !== 'All' && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs">
              <span>Size: {filters.size}</span>
              <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => handleSizeChange('All')} />
            </span>
          )}
          {filters.month !== 'All' && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-green-500/10 text-green-300 border border-green-500/20 text-xs">
              <span>Month: {filters.month}</span>
              <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setFilters(p => ({ ...p, month: 'All' }))} />
            </span>
          )}
          {filters.day !== 'All' && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs">
              <span>Day: {filters.day}</span>
              <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setFilters(p => ({ ...p, day: 'All' }))} />
            </span>
          )}
          {filters.searchTerm && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs">
              <span>Search: &quot;{filters.searchTerm}&quot;</span>
              <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setFilters(p => ({ ...p, searchTerm: '' }))} />
            </span>
          )}

          <button
            onClick={onReset}
            className="text-[11px] text-amber-400 hover:underline flex items-center space-x-1 ml-auto"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        </div>
      )}
    </div>
  );
};
