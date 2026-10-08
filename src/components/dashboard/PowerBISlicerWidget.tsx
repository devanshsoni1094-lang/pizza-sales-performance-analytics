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

export const PowerBISlicerWidget: React.FC<PowerBISlicerWidgetProps> = ({
  filters,
  setFilters,
  onReset,
  categories,
  sizes,
}) => {
  const handleMonthSelect = (mStr: string) => {
    if (mStr === 'ALL') {
      setFilters((p) => ({ ...p, month: 'All' }));
    } else if (mStr === 'APR') {
      setFilters((p) => ({ ...p, month: 'April' }));
    }
  };

  const isApr = filters.month === 'April';

  return (
    <div className="luxury-card luxury-card-hover p-4 flex flex-col justify-between h-full shadow-lg font-sans">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[#281c16] pb-2 mb-2">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-bold text-slate-200 font-mono">order_date</span>
        </div>

        <div className="flex items-center space-x-2">
          {filters.month !== 'All' && (
            <button
              onClick={onReset}
              className="text-[10px] text-red-400 hover:underline flex items-center gap-0.5 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
          <Filter className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      {/* Selected Slicer Label */}
      <div className="mb-2">
        <span className="text-xs font-extrabold text-orange-400 block font-mono">
          {isApr ? 'Apr 2015' : 'All 2015'}
        </span>
        <span className="text-[9px] text-slate-400 font-mono uppercase">MONTHS</span>
      </div>

      {/* Preset Buttons (Matching Slicer) */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button
          onClick={() => handleMonthSelect('APR')}
          className={`py-1.5 px-2.5 text-xs font-bold rounded-xl border transition flex items-center justify-between ${
            isApr
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 border-orange-500 shadow'
              : 'bg-[#140e0b] text-slate-300 border-[#281c16] hover:bg-[#241913]'
          }`}
        >
          <span>Apr 2015</span>
          {isApr && <Check className="w-3.5 h-3.5 ml-1" />}
        </button>

        <button
          onClick={() => handleMonthSelect('ALL')}
          className={`py-1.5 px-2.5 text-xs font-bold rounded-xl border transition flex items-center justify-between ${
            !isApr
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 border-orange-500 shadow'
              : 'bg-[#140e0b] text-slate-300 border-[#281c16] hover:bg-[#241913]'
          }`}
        >
          <span>All 2015</span>
          {!isApr && <Check className="w-3.5 h-3.5 ml-1" />}
        </button>
      </div>

      {/* Category & Size Filters */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#281c16]">
        <div>
          <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value }))}
            className="w-full bg-[#140e0b] border border-[#281c16] text-slate-200 text-xs rounded-xl px-2 py-1.5 font-medium cursor-pointer"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase mb-1">Size</label>
          <select
            value={filters.size}
            onChange={(e) => setFilters((p) => ({ ...p, size: e.target.value }))}
            className="w-full bg-[#140e0b] border border-[#281c16] text-slate-200 text-xs rounded-xl px-2 py-1.5 font-medium cursor-pointer"
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
