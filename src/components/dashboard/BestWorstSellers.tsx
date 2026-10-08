'use client';

import React, { useState } from 'react';
import { Trophy, TrendingDown, DollarSign, Package, ShoppingCart, Award, AlertTriangle } from 'lucide-react';
import { PizzaPerformanceItem } from '@/types/pizza';
import { formatCurrency, formatNumber } from '@/utils/formatters';

interface BestWorstSellersProps {
  data: PizzaPerformanceItem[];
}

export const BestWorstSellers: React.FC<BestWorstSellersProps> = ({ data }) => {
  const [metric, setMetric] = useState<'revenue' | 'quantity' | 'orders'>('revenue');

  // Sort Top 5 & Bottom 5 based on selected metric
  const sorted = [...data].sort((a, b) => b[metric] - a[metric]);
  const top5 = sorted.slice(0, 5);
  const bottom5 = sorted.slice(-5).reverse();

  const getMetricLabel = () => {
    if (metric === 'revenue') return 'Total Revenue ($)';
    if (metric === 'quantity') return 'Pizzas Sold (Qty)';
    return 'Total Orders Count';
  };

  const getFormattedValue = (item: PizzaPerformanceItem) => {
    if (metric === 'revenue') return formatCurrency(item.revenue);
    if (metric === 'quantity') return `${formatNumber(item.quantity)} pizzas`;
    return `${formatNumber(item.orders)} orders`;
  };

  const getMaxVal = (items: PizzaPerformanceItem[]) => {
    return Math.max(...items.map((i) => i[metric]), 1);
  };

  const topMax = getMaxVal(top5);
  const bottomMax = getMaxVal(bottom5);

  return (
    <div className="space-y-6">
      
      {/* Metric Selector Ribbon */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              TOP 5 & BOTTOM 5 PIZZAS PERFORMANCE
            </h2>
            <p className="text-xs text-slate-400">
              Identify top performing pizzas and revenue bottlenecks across the menu
            </p>
          </div>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setMetric('revenue')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              metric === 'revenue'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>By Revenue</span>
          </button>
          <button
            onClick={() => setMetric('quantity')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              metric === 'quantity'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>By Quantity</span>
          </button>
          <button
            onClick={() => setMetric('orders')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              metric === 'orders'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>By Orders</span>
          </button>
        </div>
      </div>

      {/* Top 5 vs Bottom 5 Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* TOP 5 BEST SELLERS */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                TOP 5 BEST SELLER PIZZAS
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">{getMetricLabel()}</span>
          </div>

          <div className="space-y-4">
            {top5.map((item, idx) => {
              const pct = (item[metric] / topMax) * 100;
              return (
                <div key={item.name} className="space-y-1.5 group">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">
                        #{idx + 1}
                      </span>
                      <span className="font-semibold text-white group-hover:text-emerald-300 transition">
                        {item.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-bold text-emerald-400 font-mono">
                      {getFormattedValue(item)}
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 pt-0.5">
                    <span>Revenue: {formatCurrency(item.revenue)}</span>
                    <span>Qty: {formatNumber(item.quantity)} | Orders: {formatNumber(item.orders)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM 5 WORST SELLERS */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">
                BOTTOM 5 WORST SELLER PIZZAS
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">{getMetricLabel()}</span>
          </div>

          <div className="space-y-4">
            {bottom5.map((item, idx) => {
              const pct = (item[metric] / bottomMax) * 100;
              return (
                <div key={item.name} className="space-y-1.5 group">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500/20 text-red-300 text-[10px] font-bold font-mono">
                        #{idx + 1}
                      </span>
                      <span className="font-semibold text-white group-hover:text-red-300 transition">
                        {item.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-bold text-red-400 font-mono">
                      {getFormattedValue(item)}
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 pt-0.5">
                    <span>Revenue: {formatCurrency(item.revenue)}</span>
                    <span>Qty: {formatNumber(item.quantity)} | Orders: {formatNumber(item.orders)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
