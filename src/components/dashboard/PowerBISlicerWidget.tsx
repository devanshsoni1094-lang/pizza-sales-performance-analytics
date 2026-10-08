'use client';

import React from 'react';
import { Filter, RotateCcw, Calendar, Check } from 'lucide-react';
import { FilterState } from '@/types/pizza';

interface PowerBISlicerWidgetProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  categories: string[];
  sizes: string[];
}

const MONTHS_SHORT = [
  'ALL 2015', 'APR 2015 (SCREENSHOT)', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

export const PowerBISlicerWidget: React.FC<PowerBISlicerWidgetProps> = ({
  filters,
  setFilters,
  onReset,
  categories,
  sizes,
}) => {
  const handleMonthSelect = (mStr: string) => {
    if (mStr === 'ALL 2015') {
      setFilters((p) => ({ ...p, month: 'All' }));
    } else if (mStr.includes('APR')) {
      setFilters((p) => ({ ...p, month: 'April' }));
    } else {
      const monthMap: Record<string, string> = {
        JAN: 'January', FEB: 'February', MAR: 'March', APR: 'April',
        MAY: 'May', JUN: 'June', JUL: 'July', AUG: 'August',
        SEP: 'September', OCT: 'October', NOV: 'November', DEC: 'December'
      };
      setFilters((p) => ({ ...p, month: monthMap[mStr] || 'All' }));
    }
  };

  const getActiveLabel = () => {
    if (filters.month === 'April') return 'Apr 2015';
    if (filters.month === 'All') return 'All 2015';
    return filters.month;
  };

  return (
    <div className="bg-[#ffffff] text-slate-900 border border-[#7f3724] rounded p-2.5 flex flex-col justify-between h-full shadow-md font-sans">
      
      {/* Power BI Slicer Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-300 pb-1.5 mb-2">
        <div className="flex items-center space-x-1.5">
          <Calendar className="w-3.5 h-3.5 text-orange-600" />
          <span className="text-xs font-bold text-slate-800 font-mono">order_date</span>
        </div>

        <div className="flex items-center space-x-2">
          {filters.month !== 'All' && (
            <button
              onClick={onReset}
              className="text-[10px] text-red-600 hover:underline flex items-center gap-0.5 font-semibold"
              title="Clear Slicer Filter"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
          <Filter className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      {/* Selected Slicer Label */}
      <div className="mb-2">
        <span className="text-xs font-extrabold text-orange-600 block">
          {getActiveLabel()}
        </span>
        <span className="text-[9px] text-slate-500 font-mono uppercase">MONTHS</span>
      </div>

      {/* Quick Preset Buttons (Matches Power BI Slicer slider style) */}
      <div className="grid grid-cols-2 gap-1.5 mb-2">
        <button
          onClick={() => handleMonthSelect('APR 2015 (SCREENSHOT)')}
          className={`py-1 px-2 text-[10px] font-bold rounded border transition flex items-center justify-between ${
            filters.month === 'April'
              ? 'bg-orange-500 text-white border-orange-600 shadow-inner'
              : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
          }`}
        >
          <span>Apr 2015 (Screenshot)</span>
          {filters.month === 'April' && <Check className="w-3 h-3" />}
        </button>

        <button
          onClick={() => handleMonthSelect('ALL 2015')}
          className={`py-1 px-2 text-[10px] font-bold rounded border transition flex items-center justify-between ${
            filters.month === 'All'
              ? 'bg-orange-500 text-white border-orange-600 shadow-inner'
              : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
          }`}
        >
          <span>All 2015 (Full Year)</span>
          {filters.month === 'All' && <Check className="w-3 h-3" />}
        </button>
      </div>

      {/* Category & Size Filters inside Slicer Widget */}
      <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-200">
        <div>
          <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value }))}
            className="w-full bg-slate-100 border border-slate-300 text-slate-800 text-[10px] rounded px-1.5 py-1 font-medium"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Size</label>
          <select
            value={filters.size}
            onChange={(e) => setFilters((p) => ({ ...p, size: e.target.value }))}
            className="w-full bg-slate-100 border border-slate-300 text-slate-800 text-[10px] rounded px-1.5 py-1 font-medium"
          >
            <option value="All">All Sizes</option>
            {sizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

    </div>
  );
};
