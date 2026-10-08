'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';
import { ShoppingBag } from 'lucide-react';
import { CategoryDistributionItem } from '@/types/pizza';
import { formatNumber, formatCurrency } from '@/utils/formatters';

interface CategoryBarChartProps {
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

export const CategoryBarChart: React.FC<CategoryBarChartProps> = ({
  data,
  selectedCategory,
  onSelectCategory,
}) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: CategoryDistributionItem = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs space-y-1">
          <p className="font-bold text-amber-400 text-sm">{item.category} Category</p>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Total Pizzas Sold:</span>
            <span className="font-semibold text-emerald-400">{formatNumber(item.quantity)}</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Total Revenue:</span>
            <span className="font-semibold text-amber-400">{formatCurrency(item.revenue)}</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Total Orders:</span>
            <span className="font-semibold text-white">{formatNumber(item.orders)}</span>
          </div>
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
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              TOTAL PIZZAS SOLD BY PIZZA CATEGORY
            </h3>
            <p className="text-[10px] text-slate-400">Volume distribution by category</p>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            onClick={(state) => {
              if (state && state.activePayload && state.activePayload.length) {
                const clickedCat = state.activePayload[0].payload.category;
                onSelectCategory(selectedCategory === clickedCat ? 'All' : clickedCat);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
            <XAxis type="number" stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} />
            <YAxis
              dataKey="category"
              type="category"
              stroke="#94a3b8"
              fontSize={11}
              axisLine={false}
              tickLine={false}
              width={65}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="quantity" radius={[0, 4, 4, 0]} cursor="pointer">
              {data.map((entry) => {
                const isSelected = selectedCategory === entry.category;
                const baseColor = CATEGORY_COLORS[entry.category] || '#10b981';
                return (
                  <Cell
                    key={`bar-cat-${entry.category}`}
                    fill={baseColor}
                    fillOpacity={selectedCategory === 'All' || isSelected ? 1 : 0.35}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
