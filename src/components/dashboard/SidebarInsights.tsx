'use client';

import React from 'react';
import Image from 'next/image';

export const SidebarInsights: React.FC = () => {
  return (
    <div className="flex flex-col space-y-3 w-full lg:w-64 shrink-0">
      
      {/* 1. Header Card: PIZZA SALES logo */}
      <div className="bg-[#562316] border border-[#7f3724] rounded p-2.5 flex items-center justify-between shadow-md">
        <div className="flex flex-col justify-center items-center text-amber-500 font-extrabold text-sm tracking-wider uppercase leading-tight font-serif px-1">
          <span>P</span>
          <span>I</span>
          <span>Z</span>
          <span>Z</span>
          <span>A</span>
        </div>
        
        <div className="relative w-24 h-20 rounded border border-[#7f3724] overflow-hidden shadow-inner bg-black">
          <Image
            src="/pizza_logo.jpeg"
            alt="Pizza Logo"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center items-center text-amber-500 font-extrabold text-sm tracking-wider uppercase leading-tight font-serif px-1">
          <span>S</span>
          <span>A</span>
          <span>L</span>
          <span>E</span>
          <span>S</span>
        </div>
      </div>

      {/* 2. Card: BUSIEST DAYS & TIMES */}
      <div className="bg-[#562316] border border-[#7f3724] rounded p-3 flex flex-col space-y-2 shadow-md">
        <div className="bg-[#6d2d1d] text-center py-1 rounded text-[11px] font-bold tracking-wider text-amber-400 uppercase border-b border-[#7f3724]">
          BUSIEST DAYS & TIMES
        </div>
        
        <div className="space-y-2 text-center text-xs">
          <div>
            <span className="block text-[10px] font-bold text-slate-300 uppercase tracking-wide">DAYS</span>
            <p className="text-[11px] text-amber-100/90 leading-tight font-medium">
              Orders are highest on weekends, Friday/Saturday evenings.
            </p>
          </div>

          <div>
            <span className="block text-[10px] font-bold text-slate-300 uppercase tracking-wide">TIMES</span>
            <p className="text-[11px] text-amber-100/90 leading-tight font-medium">
              There are maximum orders from 12-01pm & after 4 - 8pm.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Card: SALES BY CATEGORY & SIZE */}
      <div className="bg-[#562316] border border-[#7f3724] rounded p-3 flex flex-col space-y-2 shadow-md">
        <div className="bg-[#6d2d1d] text-center py-1 rounded text-[11px] font-bold tracking-wider text-amber-400 uppercase border-b border-[#7f3724]">
          SALES BY CATEGORY & SIZE
        </div>
        
        <div className="space-y-2 text-center text-xs">
          <div>
            <span className="block text-[10px] font-bold text-slate-300 uppercase tracking-wide">CATEGORY</span>
            <p className="text-[11px] text-amber-100/90 leading-tight font-medium">
              Classic Category contributes to maximum sales & total orders.
            </p>
          </div>

          <div>
            <span className="block text-[10px] font-bold text-slate-300 uppercase tracking-wide">SIZE</span>
            <p className="text-[11px] text-amber-100/90 leading-tight font-medium">
              Large size pizza contribute to maximum sales
            </p>
          </div>
        </div>
      </div>

      {/* 4. Card: BEST & WORST SELLERS */}
      <div className="bg-[#562316] border border-[#7f3724] rounded p-3 flex flex-col space-y-2 shadow-md">
        <div className="bg-[#6d2d1d] text-center py-1 rounded text-[11px] font-bold tracking-wider text-amber-400 uppercase border-b border-[#7f3724]">
          BEST & WORST SELLERS
        </div>
        
        <div className="space-y-2 text-center text-xs">
          <div>
            <span className="block text-[10px] font-bold text-slate-300 uppercase tracking-wide">BEST</span>
            <p className="text-[11px] text-amber-100/90 leading-tight font-medium">
              Classic Deluxe & Chicken pizzas are the sellers and revenue generators.
            </p>
          </div>

          <div>
            <span className="block text-[10px] font-bold text-slate-300 uppercase tracking-wide">WORST</span>
            <p className="text-[11px] text-amber-100/90 leading-tight font-medium">
              The Brie Carre is at the bottom in both orders and revenue.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
