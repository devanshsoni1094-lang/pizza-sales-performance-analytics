'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { SidebarInsights } from '@/components/dashboard/SidebarInsights';
import { TopKPIRow } from '@/components/dashboard/TopKPIRow';
import { DailyTrendWithTable } from '@/components/dashboard/DailyTrendWithTable';
import { HourlyTrendLineChart } from '@/components/dashboard/HourlyTrendLineChart';
import { CategoryDonutChart } from '@/components/dashboard/CategoryDonutChart';
import { SizeDonutChart } from '@/components/dashboard/SizeDonutChart';
import { CategoryVolumeBarChart } from '@/components/dashboard/CategoryVolumeBarChart';
import { Top5BestSellersChart } from '@/components/dashboard/Top5BestSellersChart';
import { Bottom5WorstSellersChart } from '@/components/dashboard/Bottom5WorstSellersChart';
import { PowerBISlicerWidget } from '@/components/dashboard/PowerBISlicerWidget';
import { DataTable } from '@/components/dashboard/DataTable';
import { Table, LayoutDashboard, RotateCcw } from 'lucide-react';
import { FilterState } from '@/types/pizza';
import {
  getAllRecords,
  filterRecords,
  computeKPIMetrics,
  computeDailyTrends,
  computeHourlyTrends,
  computeCategoryDistribution,
  computeSizeDistribution,
  computePizzaPerformance,
} from '@/utils/analyticsEngine';

// Default filters: Set to 'April' by default to MATCH THE SCREENSHOT EXACTLY ($68,737),
// while allowing 1-click toggle to All 2015 ($817,860) or any other month!
const initialFilters: FilterState = {
  category: 'All',
  size: 'All',
  day: 'All',
  month: 'April',
  startDate: '',
  endDate: '',
  searchTerm: '',
};

export default function Home() {
  const [allRecords, setAllRecords] = useState<any[]>([]);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [showDataTable, setShowDataTable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const records = getAllRecords();
    setAllRecords(records);
    setLoading(false);
  }, []);

  const filteredRecords = useMemo(() => {
    return filterRecords(allRecords, filters);
  }, [allRecords, filters]);

  const kpiMetrics = useMemo(() => computeKPIMetrics(filteredRecords), [filteredRecords]);
  const dailyTrends = useMemo(() => computeDailyTrends(filteredRecords), [filteredRecords]);
  const hourlyTrends = useMemo(() => computeHourlyTrends(filteredRecords), [filteredRecords]);
  const categoryDist = useMemo(() => computeCategoryDistribution(filteredRecords), [filteredRecords]);
  const sizeDist = useMemo(() => computeSizeDistribution(filteredRecords), [filteredRecords]);
  const pizzaPerf = useMemo(() => computePizzaPerformance(filteredRecords), [filteredRecords]);

  const categories = ['Classic', 'Veggie', 'Supreme', 'Chicken'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleResetFilters = () => {
    setFilters({
      category: 'All',
      size: 'All',
      day: 'All',
      month: 'All',
      startDate: '',
      endDate: '',
      searchTerm: '',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120907] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono text-amber-200 font-bold">Rendering Power BI Analytics Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#120907]/90 text-white font-sans p-3 sm:p-4 lg:p-5 flex flex-col space-y-3">
      
      {/* Top Banner Control Bar */}
      <div className="flex flex-wrap items-center justify-between bg-[#562316] border border-[#7f3724] rounded px-3 py-2 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-amber-400 font-mono">POWER BI DASHBOARD REPLICA</span>
          <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
            Active Filter: <strong className="text-white">{filters.month === 'April' ? 'Apr 2015 (Exact Screenshot Match)' : filters.month === 'All' ? 'All 2015 (Full Year)' : filters.month}</strong>
          </span>
        </div>

        <div className="flex items-center space-x-2 mt-1 sm:mt-0">
          <button
            onClick={() => setFilters((p) => ({ ...p, month: p.month === 'April' ? 'All' : 'April' }))}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded text-[11px] transition shadow"
          >
            Switch to {filters.month === 'April' ? 'All 2015 ($817K)' : 'Apr 2015 ($68K)'}
          </button>

          <button
            onClick={() => setShowDataTable(!showDataTable)}
            className="flex items-center space-x-1 px-2.5 py-1 bg-sky-700 hover:bg-sky-600 text-white font-bold rounded text-[11px] transition shadow"
          >
            <Table className="w-3.5 h-3.5" />
            <span>{showDataTable ? 'Hide Data Table' : 'Raw Data Table'}</span>
          </button>

          <button
            onClick={handleResetFilters}
            className="flex items-center space-x-1 px-2 py-1 bg-[#44190e] text-slate-300 hover:text-white rounded text-[11px] border border-[#7f3724]"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Dashboard Canvas (Matching 1:1 Screenshot Layout) */}
      {!showDataTable ? (
        <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3 items-stretch">
          
          {/* LEFT SIDEBAR COLUMN (22% Width) */}
          <SidebarInsights />

          {/* MAIN DASHBOARD AREA (78% Width) */}
          <div className="flex-1 flex flex-col space-y-3">
            
            {/* ROW 1: TOP KPI BANNER BAR */}
            <TopKPIRow metrics={kpiMetrics} />

            {/* ROW 2: DAILY & HOURLY TREND CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1 min-h-[260px]">
              <DailyTrendWithTable
                data={dailyTrends}
                selectedDay={filters.day}
                onSelectDay={(day) => setFilters((prev) => ({ ...prev, day }))}
              />
              <HourlyTrendLineChart data={hourlyTrends} />
            </div>

            {/* ROW 3: CATEGORY DONUT, SIZE DONUT, CATEGORY BAR */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-[220px]">
              <CategoryDonutChart
                data={categoryDist}
                selectedCategory={filters.category}
                onSelectCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
              />
              <SizeDonutChart
                data={sizeDist}
                selectedSize={filters.size}
                onSelectSize={(sz) => setFilters((prev) => ({ ...prev, size: sz }))}
              />
              <CategoryVolumeBarChart
                data={categoryDist}
                selectedCategory={filters.category}
                onSelectCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
              />
            </div>

            {/* ROW 4: TOP 5, BOTTOM 5, SLICER WIDGET */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-[220px]">
              <Top5BestSellersChart data={pizzaPerf} />
              <Bottom5WorstSellersChart data={pizzaPerf} />
              <PowerBISlicerWidget
                filters={filters}
                setFilters={setFilters}
                onReset={handleResetFilters}
                categories={categories}
                sizes={sizes}
              />
            </div>

          </div>

        </div>
      ) : (
        /* RAW DATASET EXPLORER MODAL VIEW */
        <div className="flex-1">
          <DataTable records={filteredRecords} />
        </div>
      )}

      {/* Footer */}
      <footer className="mt-4 pt-2 border-t border-[#7f3724]/40 text-center text-[10px] text-amber-200/60 font-mono">
        Pizza Sales Power BI Analytics Dashboard • Rebuilt 1:1 from original reference screenshot
      </footer>

    </div>
  );
}
