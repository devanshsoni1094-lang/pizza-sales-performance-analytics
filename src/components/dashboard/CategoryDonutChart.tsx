'use client';

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { CategoryDistributionItem } from '@/types/pizza';
import { formatPercent, formatCurrency } from '@/utils/formatters';

interface CategoryDonutChartProps {
  data: CategoryDistributionItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Chicken: '#06b6d4',  // Cyan
  Classic: '#f97316',  // Vibrant Orange
  Supreme: '#10b981',  // Mint Green
  Veggie: '#ffffff',   // White
};

export const CategoryDonutChart: React.FC<CategoryDonutChartProps> = ({
  data,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="luxury-card luxury-card-hover p-4 flex flex-col justify-between h-full shadow-lg">
      
      {/* Title */}
      <div className="mb-1 pb-2 border-b border-[#281c16]">
        <h3 className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
          % OF SALES BY PIZZA CATEGORY
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
                      stroke="#1a120e"
                      strokeWidth={2}
                      fillOpacity={selectedCategory === 'All' || isSelected ? 1 : 0.35}
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
            const color = CATEGORY_COLORS[item.category] || '#94a3b8';
            const isSelected = selectedCategory === item.category;
            return (
              <div
                key={item.category}
                onClick={() => onSelectCategory(isSelected ? 'All' : item.category)}
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
              >
                <span className="w-2.5 h-2.5 rounded-sm border border-slate-700" style={{ backgroundColor: color }} />
                <span className="text-slate-200 text-[11px] font-sans">{item.category}</span>
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
