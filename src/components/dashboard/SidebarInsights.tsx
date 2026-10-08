'use client';

import React from 'react';
import { Clock, Layers, Trophy, Sparkles, Pizza } from 'lucide-react';

export const SidebarInsights: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 w-full lg:w-72 shrink-0">
      
      {/* 1. Header Card: Brand Identity */}
      <div className="intel-card rounded-2xl p-4 flex items-center space-x-3 border-amber-500/20">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-base font-mono shadow-inner">
          <Pizza className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight font-sans">
            PIZZA SALES <span className="text-amber-400 font-mono text-[10px] block">EXECUTIVE INSIGHTS</span>
          </h2>
          <p className="text-[10px] text-slate-400 font-mono">Verified DAX Observations</p>
        </div>
      </div>

      {/* 2. Insight Card 1: BUSIEST DAYS & TIMES */}
      <div className="intel-card intel-card-hover rounded-2xl p-4 space-y-3">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-800/80">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            BUSIEST DAYS & TIMES
          </h3>
        </div>

        <div className="space-y-2.5 text-xs">
          <div>
            <span className="inline-block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              DAYS
            </span>
            <p className="text-slate-200 text-xs leading-relaxed font-normal bg-[#111728] p-2.5 rounded-xl border border-slate-800/60">
              Orders are highest on weekends, Friday/Saturday evenings.
            </p>
          </div>

          <div>
            <span className="inline-block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              TIMES
            </span>
            <p className="text-slate-200 text-xs leading-relaxed font-normal bg-[#111728] p-2.5 rounded-xl border border-slate-800/60">
              There are maximum orders from 12-01pm & after 4 - 8pm.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Insight Card 2: SALES BY CATEGORY & SIZE */}
      <div className="intel-card intel-card-hover rounded-2xl p-4 space-y-3">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-800/80">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            SALES BY CATEGORY & SIZE
          </h3>
        </div>

        <div className="space-y-2.5 text-xs">
          <div>
            <span className="inline-block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              CATEGORY
            </span>
            <p className="text-slate-200 text-xs leading-relaxed font-normal bg-[#111728] p-2.5 rounded-xl border border-slate-800/60">
              Classic Category contributes to maximum sales & total orders.
            </p>
          </div>

          <div>
            <span className="inline-block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              SIZE
            </span>
            <p className="text-slate-200 text-xs leading-relaxed font-normal bg-[#111728] p-2.5 rounded-xl border border-slate-800/60">
              Large size pizza contribute to maximum sales
            </p>
          </div>
        </div>
      </div>

      {/* 4. Insight Card 3: BEST & WORST SELLERS */}
      <div className="intel-card intel-card-hover rounded-2xl p-4 space-y-3">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-800/80">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Trophy className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            BEST & WORST SELLERS
          </h3>
        </div>

        <div className="space-y-2.5 text-xs">
          <div>
            <span className="inline-block text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest mb-0.5">
              BEST
            </span>
            <p className="text-slate-200 text-xs leading-relaxed font-normal bg-[#111728] p-2.5 rounded-xl border border-slate-800/60">
              Classic Deluxe & Chicken pizzas are the sellers and revenue generators.
            </p>
          </div>

          <div>
            <span className="inline-block text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest mb-0.5">
              WORST
            </span>
            <p className="text-slate-200 text-xs leading-relaxed font-normal bg-[#111728] p-2.5 rounded-xl border border-slate-800/60">
              The Brie Carre is at the bottom in both orders and revenue.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
