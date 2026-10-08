'use client';

import React from 'react';
import { Clock, Layers, Trophy, Sparkles, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export const KeyInsights: React.FC = () => {
  const insights = [
    {
      id: 'insight-1',
      title: 'BUSIEST DAYS & TIMES',
      icon: Clock,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      details: [
        { label: 'DAYS', text: 'Orders are highest on weekends, Friday/Saturday evenings.' },
        { label: 'TIMES', text: 'There are maximum orders from 12-01pm & after 4 - 8pm.' }
      ]
    },
    {
      id: 'insight-2',
      title: 'SALES BY CATEGORY & SIZE',
      icon: Layers,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      details: [
        { label: 'CATEGORY', text: 'Classic Category contributes to maximum sales & total orders.' },
        { label: 'SIZE', text: 'Large size pizza contribute to maximum sales.' }
      ]
    },
    {
      id: 'insight-3',
      title: 'BEST & WORST SELLERS',
      icon: Trophy,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      details: [
        { label: 'BEST', text: 'Classic Deluxe & Chicken pizzas are the sellers and revenue generators.' },
        { label: 'WORST', text: 'The Brie Carre is at the bottom in both orders and revenue.' }
      ]
    }
  ];

  return (
    <div className="intel-card rounded-2xl p-5 mb-6">
      
      {/* Header */}
      <div className="flex items-center space-x-2.5 pb-3 mb-4 border-b border-slate-800/80">
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
            EXECUTIVE INSIGHTS & ANALYTICAL SUMMARY
          </h2>
          <p className="text-[11px] text-slate-400 font-normal">
            Key operational findings and revenue observations from the dataset
          </p>
        </div>
      </div>

      {/* Grid of 3 Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {insights.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="bg-[#0b101d] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition"
            >
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-800/80">
                <div className={`p-1.5 rounded-lg ${card.bgColor} ${card.color} border ${card.borderColor}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${card.color}`}>
                  {card.title}
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                {card.details.map((d, i) => (
                  <div key={i}>
                    <span className="inline-block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                      {d.label}
                    </span>
                    <p className="text-slate-200 text-xs leading-relaxed font-normal bg-[#111728] p-2.5 rounded-xl border border-slate-800/60">
                      {d.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
