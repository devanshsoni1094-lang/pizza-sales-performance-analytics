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
    <div className="luxury-card luxury-card-hover p-4 flex flex-col justify-between h-full shadow-lg">
      
      {/* Title */}
      <div className="mb-2 pb-2 border-b border-[#281c16]">
        <h3 className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
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
            <CartesianGrid strokeDasharray="2 4" stroke="#281c16" horizontal={false} />
            <XAxis type="number" stroke="#9a8a82" fontSize={10} axisLine={false} tickLine={false} />
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
              contentStyle={{ backgroundColor: '#1a120e', borderColor: '#f97316', borderRadius: '12px', fontSize: '11px' }}
              itemStyle={{ color: '#ffffff' }}
            />
            <Bar dataKey="quantity" fill="#f97316" radius={[0, 4, 4, 0]} cursor="pointer">
              <LabelList dataKey="quantity" position="right" fill="#ffffff" fontSize={11} fontWeight="bold" />
              {data.map((entry) => {
                const isSelected = selectedCategory === entry.category;
                return (
                  <Cell
                    key={`bar-cat-${entry.category}`}
                    fill="#f97316"
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
