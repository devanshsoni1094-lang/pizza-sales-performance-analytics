'use client';

import React from 'react';
import { KPIMetrics } from '@/types/pizza';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { DollarSign, ShoppingCart, Pizza, Package, PieChart, TrendingUp } from 'lucide-react';

interface TopKPIRowProps {
  metrics: KPIMetrics;
}

export const TopKPIRow: React.FC<TopKPIRowProps> = ({ metrics }) => {
  const cards = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: formatCurrency(metrics.totalRevenue, false).replace('.00', ''),
      sub: '+2.92%',
      icon: DollarSign,
      glow: 'from-orange-500/20 to-transparent',
    },
    {
      id: 'aov',
      title: 'Avg order value',
      value: formatCurrency(metrics.averageOrderValue),
      sub: '+1.45%',
      icon: ShoppingCart,
      glow: 'from-amber-500/20 to-transparent',
    },
    {
      id: 'pizzas',
      title: 'Total pizza sold',
      value: formatNumber(metrics.totalPizzasSold),
      sub: '+4.12%',
      icon: Pizza,
      glow: 'from-emerald-500/20 to-transparent',
    },
    {
      id: 'orders',
      title: 'Total orders',
      value: formatNumber(metrics.totalOrders),
      sub: '+3.08%',
      icon: Package,
      glow: 'from-cyan-500/20 to-transparent',
    },
    {
      id: 'avg_pizzas',
      title: 'Avg pizza per order',
      value: metrics.averagePizzasPerOrder.toFixed(6).replace(/0+$/, '').replace(/\.$/, ''),
      sub: '+0.85%',
      icon: PieChart,
      glow: 'from-orange-500/20 to-transparent',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const IconComp = card.icon;
        return (
          <div
            key={card.id}
            className="luxury-card luxury-card-hover p-4 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Top Accent Glow */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${card.glow} rounded-bl-full pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity`} />

            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-300">
                {card.title}
              </span>
              <div className="p-1.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <IconComp className="w-4 h-4" />
              </div>
            </div>

            <div className="my-1">
              <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-numeric">
                {card.value}
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-[#281c16] flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {card.sub}
              </span>
              <span className="text-slate-400 text-[10px]">vs previous</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
