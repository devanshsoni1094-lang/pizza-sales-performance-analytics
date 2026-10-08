'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from 'recharts';
import { PizzaPerformanceItem } from '@/types/pizza';

interface Top5BestSellersChartProps {
  data: PizzaPerformanceItem[];
}

export const Top5BestSellersChart: React.FC<Top5BestSellersChartProps> = ({ data }) => {
  const top5 = [...data].sort((a, b) => b.quantity - a.quantity).slice(0, 5);

  return (
    <div className="bg-[#562316] border border-[#7f3724] rounded p-3 flex flex-col justify-between h-full shadow-md">
      
      {/* Title */}
      <div className="mb-2">
        <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
          TOP 5 BEST SELLERS
        </h3>
      </div>

      {/* Horizontal Bar Canvas */}
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={top5}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 75, bottom: 5 }}
          >
            <XAxis type="number" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
            <YAxis
              dataKey="name"
              type="category"
              stroke="#ffffff"
              fontSize={10}
              axisLine={false}
              tickLine={false}
              width={140}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#3a170e', borderColor: '#7f3724', borderRadius: '4px', fontSize: '11px' }}
              itemStyle={{ color: '#ffffff' }}
            />
            <Bar dataKey="quantity" fill="#0080a8" radius={[0, 2, 2, 0]}>
              <LabelList dataKey="quantity" position="right" fill="#ffffff" fontSize={10} fontWeight="bold" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
