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
  LabelList,
} from 'recharts';
import { CategoryDistributionItem } from '@/types/pizza';

interface CategoryVolumeBarChartProps {
  data: CategoryDistributionItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryVolumeBarChart: React.FC<CategoryVolumeBarChartProps> = ({
  data,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="bg-[#562316] border border-[#7f3724] rounded p-3 flex flex-col justify-between h-full shadow-md">
      
      {/* Title */}
      <div className="mb-2">
        <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
          TOTAL PIZZA SOLD BY PIZZA CATEGORY
        </h3>
      </div>

      {/* Horizontal Bar Canvas */}
      <div className="w-full h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 15, bottom: 5 }}
            onClick={(state) => {
              if (state && state.activePayload && state.activePayload.length) {
                const clickedCat = state.activePayload[0].payload.category;
                onSelectCategory(selectedCategory === clickedCat ? 'All' : clickedCat);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#7f3724" horizontal={false} opacity={0.5} />
            <XAxis type="number" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
            <YAxis
              dataKey="category"
              type="category"
              stroke="#ffffff"
              fontSize={11}
              axisLine={false}
              tickLine={false}
              width={65}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#3a170e', borderColor: '#7f3724', borderRadius: '4px', fontSize: '11px' }}
              itemStyle={{ color: '#ffffff' }}
            />
            <Bar dataKey="quantity" fill="#0080a8" radius={[0, 2, 2, 0]} cursor="pointer">
              <LabelList dataKey="quantity" position="right" fill="#ffffff" fontSize={11} fontWeight="bold" />
              {data.map((entry) => {
                const isSelected = selectedCategory === entry.category;
                return (
                  <Cell
                    key={`bar-cat-${entry.category}`}
                    fill="#0080a8"
                    fillOpacity={selectedCategory === 'All' || isSelected ? 1 : 0.4}
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
