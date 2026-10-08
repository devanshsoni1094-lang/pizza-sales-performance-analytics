'use client';

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { Tag } from 'lucide-react';
import { SizeDistributionItem } from '@/types/pizza';
import { formatCurrency, formatPercent, formatNumber } from '@/utils/formatters';

interface SizePieChartProps {
  data: SizeDistributionItem[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

const SIZE_COLORS: Record<string, string> = {
  L: '#3b82f6',   // Blue
  M: '#10b981',   // Emerald
  S: '#f59e0b',   // Amber
  XL: '#ec4899',  // Pink
  XXL: '#8b5cf6', // Purple
};

export const SizePieChart: React.FC<SizePieChartProps> = ({
  data,
  selectedSize,
  onSelectSize,
}) => {
  const totalRev = data.reduce((s, i) => s + i.revenue, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: SizeDistributionItem = payload[0].payload;
      return (
        <div className="bg-[#0b101d] border border-slate-700/80 p-3 rounded-xl shadow-2xl text-xs space-y-1.5 backdrop-blur-md font-sans">
          <p className="font-bold text-amber-400 font-mono text-sm">{item.sizeLabel}</p>
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
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
              % SALES BY SIZE
            </h3>
            <p className="text-[11px] text-slate-400 font-normal">DAX % share by pizza size</p>
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
              nameKey="sizeLabel"
              cursor="pointer"
              onClick={(entry) => {
                onSelectSize(selectedSize === entry.size ? 'All' : entry.size);
              }}
            >
              {data.map((entry) => {
                const isSelected = selectedSize === entry.size;
                const baseColor = SIZE_COLORS[entry.size] || '#94a3b8';
                return (
                  <Cell
                    key={`size-cell-${entry.size}`}
                    fill={baseColor}
                    stroke="#080c14"
                    strokeWidth={isSelected ? 3 : 1}
                    fillOpacity={selectedSize === 'All' || isSelected ? 1 : 0.3}
                  />
                );
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Top Size</span>
          <span className="text-xs font-bold text-blue-400 font-mono">Large (45.9%)</span>
        </div>
      </div>

      {/* Custom Legend Grid */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 font-mono text-[11px]">
        {data.map((item) => {
          const color = SIZE_COLORS[item.size] || '#94a3b8';
          const isSelected = selectedSize === item.size;
          return (
            <div
              key={item.size}
              onClick={() => onSelectSize(isSelected ? 'All' : item.size)}
              className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer transition ${
                isSelected ? 'bg-blue-500/10 border border-blue-500/30' : 'hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-slate-300 font-medium">{item.size}</span>
              </div>
              <span className="font-bold text-white font-numeric">{formatPercent(item.percentage, 1)}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
};
