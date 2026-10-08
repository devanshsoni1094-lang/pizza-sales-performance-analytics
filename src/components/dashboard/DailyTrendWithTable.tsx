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
import { DailyTrendItem } from '@/types/pizza';
import { formatNumber } from '@/utils/formatters';

interface DailyTrendWithTableProps {
  data: DailyTrendItem[];
  selectedDay: string;
  onSelectDay: (day: string) => void;
}

export const DailyTrendWithTable: React.FC<DailyTrendWithTableProps> = ({
  data,
  selectedDay,
  onSelectDay,
}) => {
  return (
    <div className="bg-[#562316] border border-[#7f3724] rounded p-3 flex flex-col justify-between h-full shadow-md">
      
      {/* Title */}
      <div className="mb-2">
        <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
          DAILY TREND FOR TOTAL ORDERS
        </h3>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            onClick={(state) => {
              if (state && state.activePayload && state.activePayload.length) {
                const clickedDay = state.activePayload[0].payload.day;
                onSelectDay(selectedDay === clickedDay ? 'All' : clickedDay);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#7f3724" vertical={false} opacity={0.5} />
            <XAxis dataKey="shortDay" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={{ stroke: '#7f3724' }} />
            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#3a170e', borderColor: '#7f3724', borderRadius: '4px', fontSize: '11px' }}
              itemStyle={{ color: '#ffffff' }}
            />
            <Bar dataKey="orders" radius={[2, 2, 0, 0]} cursor="pointer">
              {data.map((entry, index) => {
                const isSelected = selectedDay === entry.day;
                return (
                  <Cell
                    key={`daily-cell-${index}`}
                    fill="#d9531e"
                    fillOpacity={selectedDay === 'All' || isSelected ? 1 : 0.4}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Embedded Data Matrix Table (Exact Power BI look) */}
      <div className="mt-2 overflow-x-auto">
        <table className="pbi-matrix-table">
          <thead>
            <tr>
              <th className="w-12 bg-[#6d2d1d]"></th>
              {data.map((d) => (
                <th key={d.day}>{d.day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-bold bg-[#6d2d1d] text-amber-300">Total</td>
              {data.map((d) => (
                <td key={`val-${d.day}`} className="font-mono">
                  {formatNumber(d.orders)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};
