'use client';

import React from 'react';
import { DollarSign, ShoppingCart, Pizza, Package, PieChart, TrendingUp, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { KPIMetricCard } from '@/types/pizza';

interface KPICardsProps {
  cards: KPIMetricCard[];
}

export const KPICards: React.FC<KPICardsProps> = ({ cards }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'revenue':
        return <DollarSign className="w-4 h-4 text-amber-400" />;
      case 'aov':
        return <ShoppingCart className="w-4 h-4 text-blue-400" />;
      case 'pizzas':
        return <Pizza className="w-4 h-4 text-emerald-400" />;
      case 'orders':
        return <Package className="w-4 h-4 text-purple-400" />;
      default:
        return <PieChart className="w-4 h-4 text-orange-400" />;
    }
  };

  const getAccentColor = (id: string) => {
    switch (id) {
      case 'revenue':
        return 'border-amber-500/30 text-amber-400 bg-amber-500/10';
      case 'aov':
        return 'border-blue-500/30 text-blue-400 bg-blue-500/10';
      case 'pizzas':
        return 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10';
      case 'orders':
        return 'border-purple-500/30 text-purple-400 bg-purple-500/10';
      default:
        return 'border-orange-500/30 text-orange-400 bg-orange-500/10';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, idx) => {
        const minVal = Math.min(...card.sparklineData);
        const maxVal = Math.max(...card.sparklineData) || 1;

        // Normalize sparkline points into SVG path
        const points = card.sparklineData.map((val, i) => {
          const x = (i / (card.sparklineData.length - 1)) * 90 + 5;
          const y = 28 - ((val - minVal) / (maxVal - minVal || 1)) * 22;
          return `${x},${y}`;
        }).join(' ');

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.04 }}
            className="intel-card intel-card-hover rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Metric Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                {card.title}
              </span>
              <div className={`p-1.5 rounded-lg border ${getAccentColor(card.id)}`}>
                {getIcon(card.id)}
              </div>
            </div>

            {/* Dominant KPI Value */}
            <div className="my-1">
              <div className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white font-numeric">
                {card.value}
              </div>
            </div>

            {/* Comparison Signal & Sparkline */}
            <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs">
                <span className="inline-flex items-center text-emerald-400 font-bold text-[11px]">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  {card.change}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {card.comparisonText}
                </span>
              </div>

              {/* Sparkline Graphic */}
              <div className="w-16 h-7 opacity-80 group-hover:opacity-100 transition-opacity">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
                  <polyline
                    fill="none"
                    stroke={card.id === 'revenue' ? '#f59e0b' : card.id === 'aov' ? '#3b82f6' : '#10b981'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </svg>
              </div>
            </div>

            {/* DAX Context Badge */}
            <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <Info className="w-3 h-3 text-slate-400" />
              <span>{card.daxFormula}</span>
            </div>

          </motion.div>
        );
      })}
    </div>
  );
};
