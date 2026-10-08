'use client';

import React, { useState } from 'react';
import { Trophy, DollarSign, Package, ShoppingCart, Award, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { PizzaPerformanceItem } from '@/types/pizza';
import { formatCurrency, formatNumber, formatPercent } from '@/utils/formatters';

interface BestWorstSellersProps {
  data: PizzaPerformanceItem[];
}

export const BestWorstSellers: React.FC<BestWorstSellersProps> = ({ data }) => {
  const [metric, setMetric] = useState<'revenue' | 'quantity' | 'orders'>('revenue');

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

  const topMax = Math.max(...top5.map((i) => i[metric]), 1);
  const bottomMax = Math.max(...bottom5.map((i) => i[metric]), 1);

  return (
    <div className="space-y-6">
      
      {/* Selector Ribbon */}
      <div className="intel-card rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              MENU INTELLIGENCE: STAR PERFORMERS VS BOTTLENECK PRODUCTS
            </h2>
            <p className="text-[11px] text-slate-400 font-normal">
              Identify top performing SKUs and menu bottlenecks based on actual sales records
            </p>
          </div>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex items-center bg-[#111728] p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setMetric('revenue')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              metric === 'revenue'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>By Revenue</span>
          </button>
          <button
            onClick={() => setMetric('quantity')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              metric === 'quantity'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>By Quantity</span>
          </button>
          <button
            onClick={() => setMetric('orders')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              metric === 'orders'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
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
        <div className="intel-card rounded-2xl p-5">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                TOP 5 BEST SELLER PIZZAS
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">{getMetricLabel()}</span>
          </div>

          <div className="space-y-4">
            {top5.map((item, idx) => {
              const pct = (item[metric] / topMax) * 100;
              return (
                <div key={item.name} className="space-y-1.5 group">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold font-mono">
                        #{idx + 1}
                      </span>
                      <span className="font-semibold text-white group-hover:text-emerald-300 transition">
                        {item.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#111728] text-slate-400 border border-slate-800 font-mono">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-bold text-emerald-400 font-numeric">
                      {getFormattedValue(item)}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-[#111728] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                    <span>Revenue: {formatCurrency(item.revenue)} ({formatPercent(item.revenueShare, 1)})</span>
                    <span>Qty: {formatNumber(item.quantity)} | Orders: {formatNumber(item.orders)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM 5 WORST SELLERS */}
        <div className="intel-card rounded-2xl p-5">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                BOTTOM 5 WORST SELLER PIZZAS
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">{getMetricLabel()}</span>
          </div>

          <div className="space-y-4">
            {bottom5.map((item, idx) => {
              const pct = (item[metric] / bottomMax) * 100;
              return (
                <div key={item.name} className="space-y-1.5 group">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold font-mono">
                        #{idx + 1}
                      </span>
                      <span className="font-semibold text-white group-hover:text-red-300 transition">
                        {item.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#111728] text-slate-400 border border-slate-800 font-mono">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-bold text-red-400 font-numeric">
                      {getFormattedValue(item)}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-[#111728] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                    <span>Revenue: {formatCurrency(item.revenue)} ({formatPercent(item.revenueShare, 1)})</span>
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
