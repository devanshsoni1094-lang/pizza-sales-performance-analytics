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
    <div className="bg-[#562316] border border-[#7f3724] rounded p-3 flex flex-col justify-between h-full shadow-md">
      
      {/* Title */}
      <div className="mb-2">
        <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
          HOURLY TREND FOR TOTAL ORDERS
        </h3>
      </div>

      {/* Line Chart */}
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: -25, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#7f3724" vertical={false} opacity={0.5} />
            <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={{ stroke: '#7f3724' }} />
            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#3a170e', borderColor: '#7f3724', borderRadius: '4px', fontSize: '11px' }}
              itemStyle={{ color: '#ffffff' }}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#0080a8"
              strokeWidth={2.5}
              dot={{ fill: '#0080a8', r: 4 }}
              activeDot={{ r: 6, fill: '#38bdf8' }}
            >
              <LabelList dataKey="orders" position="top" fill="#ffffff" fontSize={10} offset={8} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
