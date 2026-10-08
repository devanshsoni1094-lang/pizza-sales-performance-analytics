'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from 'recharts';
import { HourlyTrendItem } from '@/types/pizza';

interface HourlyTrendLineChartProps {
  data: HourlyTrendItem[];
}

export const HourlyTrendLineChart: React.FC<HourlyTrendLineChartProps> = ({ data }) => {
  return (
    <div className="luxury-card luxury-card-hover p-4 flex flex-col justify-between h-full shadow-lg">
      
      {/* Title */}
      <div className="mb-2 pb-2 border-b border-[#281c16]">
        <h3 className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
          HOURLY TREND FOR TOTAL ORDERS
        </h3>
      </div>

      {/* Line Chart Canvas */}
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: -25, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="2 4" stroke="#281c16" vertical={false} />
            <XAxis dataKey="hour" stroke="#9a8a82" fontSize={10} tickLine={false} axisLine={{ stroke: '#281c16' }} />
            <YAxis stroke="#9a8a82" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a120e', borderColor: '#f97316', borderRadius: '12px', fontSize: '11px' }}
              itemStyle={{ color: '#ffffff' }}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#f97316"
              strokeWidth={2.5}
              dot={{ fill: '#f97316', r: 4 }}
              activeDot={{ r: 6, fill: '#ffffff' }}
            >
              <LabelList dataKey="orders" position="top" fill="#ffffff" fontSize={10} offset={8} fontWeight="bold" />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
