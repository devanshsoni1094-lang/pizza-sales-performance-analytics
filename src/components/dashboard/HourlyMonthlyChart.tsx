'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Clock, Calendar, TrendingUp } from 'lucide-react';
import { HourlyTrendItem, MonthlyTrendItem } from '@/types/pizza';
import { formatCurrency, formatNumber } from '@/utils/formatters';

interface HourlyMonthlyChartProps {
  hourlyData: HourlyTrendItem[];
  monthlyData: MonthlyTrendItem[];
  selectedMonth: string;
  onSelectMonth: (month: string) => void;
}

export const HourlyMonthlyChart: React.FC<HourlyMonthlyChartProps> = ({
  hourlyData,
  monthlyData,
  selectedMonth,
  onSelectMonth,
}) => {
  const [viewMode, setViewMode] = useState<'hourly' | 'monthly'>('hourly');

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isHourly = viewMode === 'hourly';
      const title = isHourly ? `Hour: ${data.hourLabel}` : `Month: ${data.month}`;

      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs space-y-1">
          <p className="font-bold text-amber-400 text-sm">{title}</p>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Total Orders:</span>
            <span className="font-semibold text-white">{formatNumber(data.orders)}</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Total Revenue:</span>
            <span className="font-semibold text-amber-400">{formatCurrency(data.revenue)}</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Pizzas Sold:</span>
            <span className="font-semibold text-emerald-400">{formatNumber(data.pizzas)}</span>
          </div>
          {!isHourly && (
            <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
              Click to filter by {data.month}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col justify-between h-full">
      
      {/* Visual Header & View Switcher */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {viewMode === 'hourly' ? 'HOURLY TREND FOR TOTAL ORDERS' : 'MONTHLY TREND FOR TOTAL ORDERS'}
            </h3>
            <p className="text-[10px] text-slate-400">
              {viewMode === 'hourly' ? 'Peak operating hours (9 AM - 11 PM)' : 'Full 2015 monthly performance'}
            </p>
          </div>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={() => setViewMode('hourly')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              viewMode === 'hourly'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Hourly</span>
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              viewMode === 'monthly'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>Monthly</span>
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={viewMode === 'hourly' ? hourlyData : monthlyData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            onClick={(state) => {
              if (viewMode === 'monthly' && state && state.activePayload && state.activePayload.length) {
                const clickedMonth = state.activePayload[0].payload.month;
                onSelectMonth(selectedMonth === clickedMonth ? 'All' : clickedMonth);
              }
            }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis
              dataKey={viewMode === 'hourly' ? 'hourLabel' : 'shortMonth'}
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
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOrders)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Visual Footer Note */}
      <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between border-t border-slate-800/80 pt-2">
        <span>
          {viewMode === 'hourly' ? (
            <>Peak hour spikes: <strong className="text-amber-400">12:00 PM - 1:00 PM</strong> & <strong className="text-amber-400">6:00 PM - 7:00 PM</strong></>
          ) : (
            <>Highest revenue month: <strong className="text-amber-400">July ($72.5K)</strong></>
          )}
        </span>
        <span className="font-mono text-slate-400">
          {viewMode === 'hourly' ? '15 Hours' : '12 Months'}
        </span>
      </div>

    </div>
  );
};
