'use client';

import React from 'react';
import { DollarSign, ShoppingCart, Pizza, Package, PieChart, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { KPIMetrics } from '@/types/pizza';
import { formatCurrency, formatNumber, formatDecimal } from '@/utils/formatters';

interface KPICardsProps {
  metrics: KPIMetrics;
}

export const KPICards: React.FC<KPICardsProps> = ({ metrics }) => {
  const cards = [
    {
      id: 'revenue',
      title: 'TOTAL REVENUE',
      value: formatCurrency(metrics.totalRevenue),
      subtext: 'DAX: SUM(total_price)',
      icon: DollarSign,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      accentGlow: 'from-amber-500/20 to-transparent',
    },
    {
      id: 'aov',
      title: 'AVERAGE ORDER VALUE',
      value: formatCurrency(metrics.averageOrderValue),
      subtext: 'DAX: Revenue / Orders',
      icon: ShoppingCart,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      accentGlow: 'from-blue-500/20 to-transparent',
    },
    {
      id: 'pizzas',
      title: 'TOTAL PIZZAS SOLD',
      value: formatNumber(metrics.totalPizzasSold),
      subtext: 'DAX: SUM(quantity)',
      icon: Pizza,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      accentGlow: 'from-emerald-500/20 to-transparent',
    },
    {
      id: 'orders',
      title: 'TOTAL ORDERS',
      value: formatNumber(metrics.totalOrders),
      subtext: 'DAX: DISTINCT(order_id)',
      icon: Package,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      accentGlow: 'from-purple-500/20 to-transparent',
    },
    {
      id: 'avg_pizzas',
      title: 'AVG PIZZAS / ORDER',
      value: formatDecimal(metrics.averagePizzasPerOrder, 2),
      subtext: 'DAX: Pizzas / Orders',
      icon: PieChart,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      accentGlow: 'from-orange-500/20 to-transparent',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className={`relative bg-slate-900 border ${card.borderColor} rounded-xl p-4 shadow-lg hover:shadow-xl hover:border-slate-700 transition-all group overflow-hidden`}
          >
            {/* Background Glow Accent */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${card.accentGlow} rounded-bl-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />

            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                {card.title}
              </span>
              <div className={`p-2 rounded-lg ${card.bgColor} ${card.color} border border-current/20`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-1">
              <div className="text-2xl font-extrabold tracking-tight text-white font-sans">
                {card.value}
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1">
                <Info className="w-3 h-3 text-slate-600" />
                {card.subtext}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
