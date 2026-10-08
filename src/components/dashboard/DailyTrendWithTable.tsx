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
    <div className="luxury-card luxury-card-hover p-4 flex flex-col justify-between h-full shadow-lg">
      
      {/* Title */}
      <div className="mb-2 pb-2 border-b border-[#281c16]">
        <h3 className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
          DAILY TREND FOR TOTAL ORDERS
        </h3>
      </div>

      {/* Bar Chart Canvas */}
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
            <CartesianGrid strokeDasharray="2 4" stroke="#281c16" vertical={false} />
            <XAxis dataKey="shortDay" stroke="#9a8a82" fontSize={10} tickLine={false} axisLine={{ stroke: '#281c16' }} />
            <YAxis stroke="#9a8a82" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a120e', borderColor: '#f97316', borderRadius: '12px', fontSize: '11px' }}
              itemStyle={{ color: '#ffffff' }}
            />
            <Bar dataKey="orders" radius={[4, 4, 0, 0]} cursor="pointer">
              {data.map((entry, index) => {
                const isSelected = selectedDay === entry.day;
                return (
                  <Cell
                    key={`daily-cell-${index}`}
                    fill="#f97316"
                    fillOpacity={selectedDay === 'All' || isSelected ? 1 : 0.35}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Embedded Data Matrix Table */}
      <div className="mt-3 overflow-x-auto rounded-xl border border-[#281c16]">
        <table className="pbi-matrix-table">
          <thead>
            <tr>
              <th className="w-12 bg-[#241913] text-orange-400 font-mono"></th>
              {data.map((d) => (
                <th key={d.day}>{d.day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-bold bg-[#241913] text-amber-400 font-mono">Total</td>
              {data.map((d) => (
                <td key={`val-${d.day}`} className="font-mono text-white font-bold">
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
