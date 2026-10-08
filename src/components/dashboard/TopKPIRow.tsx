'use client';

import React from 'react';
import { KPIMetrics } from '@/types/pizza';
import { formatCurrency, formatNumber, formatDecimal } from '@/utils/formatters';

interface TopKPIRowProps {
  metrics: KPIMetrics;
}

export const TopKPIRow: React.FC<TopKPIRowProps> = ({ metrics }) => {
  return (
    <div className="bg-[#562316] border border-[#7f3724] rounded p-3 shadow-md grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
      
      {/* 1. Total Revenue */}
      <div className="flex flex-col items-center justify-center p-1 border-r border-[#7f3724]/60 last:border-r-0">
        <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wide">
          Total Revenue
        </span>
        <span className="text-2xl lg:text-3xl font-bold text-white font-sans mt-0.5">
          {formatCurrency(metrics.totalRevenue, false).replace('.00', '')}
        </span>
      </div>

      {/* 2. Avg Order Value */}
      <div className="flex flex-col items-center justify-center p-1 border-r border-[#7f3724]/60 last:border-r-0">
        <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wide">
          Avg order value
        </span>
        <span className="text-2xl lg:text-3xl font-bold text-white font-sans mt-0.5">
          {formatCurrency(metrics.averageOrderValue)}
        </span>
      </div>

      {/* 3. Total Pizza Sold */}
      <div className="flex flex-col items-center justify-center p-1 border-r border-[#7f3724]/60 last:border-r-0">
        <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wide">
          Total pizza sold
        </span>
        <span className="text-2xl lg:text-3xl font-bold text-white font-sans mt-0.5">
          {formatNumber(metrics.totalPizzasSold)}
        </span>
      </div>

      {/* 4. Total Orders */}
      <div className="flex flex-col items-center justify-center p-1 border-r border-[#7f3724]/60 last:border-r-0">
        <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wide">
          Total orders
        </span>
        <span className="text-2xl lg:text-3xl font-bold text-white font-sans mt-0.5">
          {formatNumber(metrics.totalOrders)}
        </span>
      </div>

      {/* 5. Avg Pizza Per Order */}
      <div className="flex flex-col items-center justify-center p-1">
        <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wide">
          Avg pizza per order
        </span>
        <span className="text-2xl lg:text-3xl font-bold text-white font-sans mt-0.5">
          {metrics.averagePizzasPerOrder.toFixed(6).replace(/0+$/, '').replace(/\.$/, '')}
        </span>
      </div>

    </div>
  );
};
