'use client';

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';
import { CategoryDistributionItem } from '@/types/pizza';
import { formatCurrency, formatPercent, formatNumber } from '@/utils/formatters';

interface CategoryPieChartProps {
  data: CategoryDistributionItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Classic: '#f59e0b',  // Amber
  Supreme: '#3b82f6',  // Blue
  Chicken: '#10b981',  // Emerald
  Veggie: '#8b5cf6',   // Purple
};

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  data,
  selectedCategory,
  onSelectCategory,
}) => {
  const totalRev = data.reduce((s, i) => s + i.revenue, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: CategoryDistributionItem = payload[0].payload;
      return (
        <div className="bg-[#0b101d] border border-slate-700/80 p-3 rounded-xl shadow-2xl text-xs space-y-1.5 backdrop-blur-md">
          <p className="font-bold text-amber-400 font-mono text-sm">{item.category} Category</p>
          <div className="flex justify-between gap-5 text-slate-300">
            <span>Revenue Share:</span>
            <span className="font-semibold text-white font-numeric">{formatPercent(item.percentage)}</span>
          </div>
          <div className="flex justify-between gap-5 text-slate-300">
            <span>Total Revenue:</span>
            <span className="font-semibold text-amber-400 font-numeric">{formatCurrency(item.revenue)}</span>
          </div>
          <div className="flex justify-between gap-5 text-slate-300">
            <span>Pizzas Sold:</span>
            <span className="font-semibold text-emerald-400 font-numeric">{formatNumber(item.quantity)}</span>
          </div>
          <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 font-mono">
            Click slice to filter dashboard
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="intel-card intel-card-hover rounded-2xl p-5 flex flex-col justify-between h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <PieIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
              % SALES BY CATEGORY
            </h3>
            <p className="text-[11px] text-slate-400 font-normal">DAX % share of revenue</p>
          </div>
        </div>
      </div>

      {/* Donut Chart Canvas */}
      <div className="w-full h-44 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={70}
              paddingAngle={3}
              dataKey="revenue"
              nameKey="category"
              cursor="pointer"
              onClick={(entry) => {
                onSelectCategory(selectedCategory === entry.category ? 'All' : entry.category);
              }}
            >
              {data.map((entry) => {
                const isSelected = selectedCategory === entry.category;
                const baseColor = CATEGORY_COLORS[entry.category] || '#94a3b8';
                return (
                  <Cell
                    key={`cat-cell-${entry.category}`}
                    fill={baseColor}
                    stroke="#080c14"
                    strokeWidth={isSelected ? 3 : 1}
                    fillOpacity={selectedCategory === 'All' || isSelected ? 1 : 0.3}
                  />
                );
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Revenue</span>
          <span className="text-xs font-bold text-white font-numeric">{formatCurrency(totalRev, true)}</span>
        </div>
      </div>

      {/* Custom Legend Grid */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 font-mono text-[11px]">
        {data.map((item) => {
          const color = CATEGORY_COLORS[item.category] || '#94a3b8';
          const isSelected = selectedCategory === item.category;
          return (
            <div
              key={item.category}
              onClick={() => onSelectCategory(isSelected ? 'All' : item.category)}
              className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer transition ${
                isSelected ? 'bg-amber-500/10 border border-amber-500/30' : 'hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-slate-300 font-medium">{item.category}</span>
              </div>
              <span className="font-bold text-white font-numeric">{formatPercent(item.percentage, 1)}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
};
