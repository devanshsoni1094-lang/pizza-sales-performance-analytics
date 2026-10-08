'use client';

import React from 'react';
import { Clock, Layers, Trophy, Sparkles } from 'lucide-react';

export const SidebarInsights: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 w-full lg:w-72 shrink-0">
      
      {/* 1. Insight Card 1: BUSIEST DAYS & TIMES */}
      <div className="luxury-card luxury-card-hover p-4 space-y-3">
        <div className="flex items-center space-x-2 pb-2.5 border-b border-[#281c16]">
          <div className="p-1.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400">
            BUSIEST DAYS & TIMES
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
              DAYS
            </span>
            <p className="text-slate-200 text-xs leading-relaxed font-medium bg-[#140e0b] p-3 rounded-xl border border-[#281c16]">
              Orders are highest on weekends, Friday/Saturday evenings.
            </p>
          </div>

          <div>
            <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
              TIMES
            </span>
            <p className="text-slate-200 text-xs leading-relaxed font-medium bg-[#140e0b] p-3 rounded-xl border border-[#281c16]">
              There are maximum orders from 12-01pm & after 4 - 8pm.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Insight Card 2: SALES BY CATEGORY & SIZE */}
      <div className="luxury-card luxury-card-hover p-4 space-y-3">
        <div className="flex items-center space-x-2 pb-2.5 border-b border-[#281c16]">
          <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            SALES BY CATEGORY & SIZE
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
              CATEGORY
            </span>
            <p className="text-slate-200 text-xs leading-relaxed font-medium bg-[#140e0b] p-3 rounded-xl border border-[#281c16]">
              Classic Category contributes to maximum sales & total orders.
            </p>
          </div>

          <div>
            <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
              SIZE
            </span>
            <p className="text-slate-200 text-xs leading-relaxed font-medium bg-[#140e0b] p-3 rounded-xl border border-[#281c16]">
              Large size pizza contribute to maximum sales
            </p>
          </div>
        </div>
      </div>

      {/* 3. Insight Card 3: BEST & WORST SELLERS */}
      <div className="luxury-card luxury-card-hover p-4 space-y-3">
        <div className="flex items-center space-x-2 pb-2.5 border-b border-[#281c16]">
          <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Trophy className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            BEST & WORST SELLERS
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <span className="block text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1">
              BEST
            </span>
            <p className="text-slate-200 text-xs leading-relaxed font-medium bg-[#140e0b] p-3 rounded-xl border border-[#281c16]">
              Classic Deluxe & Chicken pizzas are the sellers and revenue generators.
            </p>
          </div>

          <div>
            <span className="block text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest mb-1">
              WORST
            </span>
            <p className="text-slate-200 text-xs leading-relaxed font-medium bg-[#140e0b] p-3 rounded-xl border border-[#281c16]">
              The Brie Carre is at the bottom in both orders and revenue.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
