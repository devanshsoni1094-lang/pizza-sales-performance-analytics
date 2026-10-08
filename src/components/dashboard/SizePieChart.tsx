'use client';

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
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
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: SizeDistributionItem = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs space-y-1">
          <p className="font-bold text-amber-400 text-sm">{item.sizeLabel}</p>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Revenue Share:</span>
            <span className="font-semibold text-white">{formatPercent(item.percentage)}</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Total Revenue:</span>
            <span className="font-semibold text-amber-400">{formatCurrency(item.revenue)}</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Pizzas Sold:</span>
            <span className="font-semibold text-emerald-400">{formatNumber(item.quantity)}</span>
          </div>
          <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
            Click slice to filter by Size {item.size}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col justify-between h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              % OF SALES BY PIZZA SIZE
            </h3>
            <p className="text-[10px] text-slate-400">Revenue contribution by pizza size</p>
          </div>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="w-full h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
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
                    stroke="#0f172a"
                    strokeWidth={isSelected ? 3 : 1}
                    fillOpacity={selectedSize === 'All' || isSelected ? 1 : 0.35}
                  />
                );
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value, entry: any) => {
                const item = data.find((d) => d.sizeLabel === value || d.size === value);
                return (
                  <span className="text-xs text-slate-300 font-medium">
                    {value}: <strong className="text-white">{item ? formatPercent(item.percentage, 1) : ''}</strong>
                  </span>
                );
              }}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
