'use client';

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { SizeDistributionItem } from '@/types/pizza';
import { formatPercent, formatCurrency } from '@/utils/formatters';

interface SizeDonutChartProps {
  data: SizeDistributionItem[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

const SIZE_COLORS: Record<string, string> = {
  L: '#06b6d4',   // Cyan
  M: '#f97316',   // Vibrant Orange
  S: '#10b981',   // Mint Green
  XL: '#ffffff',  // White
  XXL: '#8b5cf6', // Purple
};

export const SizeDonutChart: React.FC<SizeDonutChartProps> = ({
  data,
  selectedSize,
  onSelectSize,
}) => {
  return (
    <div className="luxury-card luxury-card-hover p-4 flex flex-col justify-between h-full shadow-lg">
      
      {/* Title */}
      <div className="mb-1 pb-2 border-b border-[#281c16]">
        <h3 className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
          % OF SALES BY PIZZA SIZE
        </h3>
      </div>

      {/* Donut & Legend Container */}
      <div className="flex items-center justify-between">
        
        {/* Donut Canvas */}
        <div className="w-36 h-36 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={32}
                outerRadius={52}
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
                      stroke="#1a120e"
                      strokeWidth={2}
                      fillOpacity={selectedSize === 'All' || isSelected ? 1 : 0.35}
                    />
                  );
                })}
              </Pie>
              <Tooltip
                formatter={(value: any, name: any, item: any) => [
                  `${formatCurrency(value)} (${formatPercent(item.payload.percentage)})`,
                  name,
                ]}
                contentStyle={{ backgroundColor: '#1a120e', borderColor: '#f97316', borderRadius: '12px', fontSize: '11px' }}
                itemStyle={{ color: '#ffffff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Box */}
        <div className="flex flex-col space-y-1.5 text-xs pr-2 font-mono">
          {data.map((item) => {
            const color = SIZE_COLORS[item.size] || '#94a3b8';
            const isSelected = selectedSize === item.size;
            return (
              <div
                key={item.size}
                onClick={() => onSelectSize(isSelected ? 'All' : item.size)}
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
              >
                <span className="w-2.5 h-2.5 rounded-sm border border-slate-700" style={{ backgroundColor: color }} />
                <span className="text-slate-200 text-[10px] font-sans">{item.sizeLabel}</span>
                <span className="text-orange-400 font-bold text-[10px] ml-auto font-mono">
                  {formatPercent(item.percentage)}
                </span>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
