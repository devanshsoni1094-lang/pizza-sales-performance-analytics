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
import { Calendar, Info } from 'lucide-react';
import { DailyTrendItem } from '@/types/pizza';
import { formatCurrency, formatNumber } from '@/utils/formatters';

interface DailyTrendChartProps {
  data: DailyTrendItem[];
  selectedDay: string;
  onSelectDay: (day: string) => void;
}

export const DailyTrendChart: React.FC<DailyTrendChartProps> = ({
  data,
  selectedDay,
  onSelectDay,
}) => {
  // Find peak day
  const maxOrders = Math.max(...data.map((d) => d.orders), 1);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: DailyTrendItem = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs space-y-1">
          <p className="font-bold text-amber-400 text-sm">{item.day}</p>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Total Orders:</span>
            <span className="font-semibold text-white">{formatNumber(item.orders)}</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Total Revenue:</span>
            <span className="font-semibold text-amber-400">{formatCurrency(item.revenue)}</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Pizzas Sold:</span>
            <span className="font-semibold text-emerald-400">{formatNumber(item.pizzas)}</span>
          </div>
          <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
            Click bar to filter by {item.day}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col justify-between h-full">
      
      {/* Visual Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              DAILY TREND FOR TOTAL ORDERS
            </h3>
            <p className="text-[10px] text-slate-400">Orders distribution across days of the week</p>
          </div>
        </div>
        {selectedDay !== 'All' && (
          <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
            Filtered: {selectedDay}
          </span>
        )}
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            onClick={(state) => {
              if (state && state.activePayload && state.activePayload.length) {
                const clickedDay = state.activePayload[0].payload.day;
                onSelectDay(selectedDay === clickedDay ? 'All' : clickedDay);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis
              dataKey="shortDay"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#475569' }}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="orders" radius={[4, 4, 0, 0]} cursor="pointer">
              {data.map((entry, index) => {
                const isSelected = selectedDay === entry.day;
                const isPeak = entry.orders === maxOrders;
                
                let fillColor = '#3b82f6'; // default blue
                if (isPeak) fillColor = '#f59e0b'; // amber peak
                if (isSelected) fillColor = '#10b981'; // green selected

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={fillColor}
                    fillOpacity={selectedDay === 'All' || isSelected ? 1 : 0.4}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Visual Footer Note */}
      <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between border-t border-slate-800/80 pt-2">
        <span className="flex items-center gap-1">
          <Info className="w-3 h-3 text-slate-500" />
          Highest sales on <strong className="text-amber-400">Friday & Thursday</strong> evenings
        </span>
        <span className="font-mono">7 Days</span>
      </div>

    </div>
  );
};
