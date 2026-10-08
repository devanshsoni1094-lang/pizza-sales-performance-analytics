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
import { formatCurrency, formatNumber, formatPercent } from '@/utils/formatters';

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
  const maxOrders = Math.max(...data.map((d) => d.orders), 1);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: DailyTrendItem = payload[0].payload;
      return (
        <div className="bg-[#0b101d] border border-slate-700/80 p-3.5 rounded-xl shadow-2xl text-xs space-y-1.5 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-bold text-amber-400 text-sm font-mono">{item.day}</span>
            <span className="text-[10px] text-slate-400 font-mono">{formatPercent(item.pctOfTotal || 0)} of total</span>
          </div>
          <div className="flex justify-between gap-5 text-slate-300">
            <span>Total Orders:</span>
            <span className="font-semibold text-white font-numeric">{formatNumber(item.orders)}</span>
          </div>
          <div className="flex justify-between gap-5 text-slate-300">
            <span>Total Revenue:</span>
            <span className="font-semibold text-amber-400 font-numeric">{formatCurrency(item.revenue)}</span>
          </div>
          <div className="flex justify-between gap-5 text-slate-300">
            <span>Pizzas Sold:</span>
            <span className="font-semibold text-emerald-400 font-numeric">{formatNumber(item.pizzas)}</span>
          </div>
          <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 font-mono">
            Click bar to cross-filter dashboard
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="intel-card intel-card-hover rounded-2xl p-5 flex flex-col justify-between h-full">
      
      {/* Visual Header */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="font-bold text-xs font-mono">D</span>
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
              DAILY TREND FOR TOTAL ORDERS
            </h3>
            <p className="text-[11px] text-slate-400 font-normal">Order volume distribution by day of week</p>
          </div>
        </div>
        {selectedDay !== 'All' && (
          <span className="text-[10px] bg-amber-500/20 text-amber-400 font-mono font-bold px-2.5 py-1 rounded-md border border-amber-500/30">
            Filter: {selectedDay}
          </span>
        )}
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 12, right: 10, left: -20, bottom: 0 }}
            onClick={(state) => {
              if (state && state.activePayload && state.activePayload.length) {
                const clickedDay = state.activePayload[0].payload.day;
                onSelectDay(selectedDay === clickedDay ? 'All' : clickedDay);
              }
            }}
          >
            <CartesianGrid strokeDasharray="2 4" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="shortDay"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="orders" radius={[6, 6, 0, 0]} cursor="pointer">
              {data.map((entry, index) => {
                const isSelected = selectedDay === entry.day;
                const isPeak = entry.orders === maxOrders;
                
                let fillColor = '#3b82f6'; // blue
                if (isPeak) fillColor = '#f59e0b'; // amber peak
                if (isSelected) fillColor = '#10b981'; // emerald selected

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={fillColor}
                    fillOpacity={selectedDay === 'All' || isSelected ? 1 : 0.35}
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
