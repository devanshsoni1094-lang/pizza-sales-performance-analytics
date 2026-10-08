'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { Header } from '@/components/dashboard/Header';
import { TopKPIRow } from '@/components/dashboard/TopKPIRow';
import { SidebarInsights } from '@/components/dashboard/SidebarInsights';
import { DailyTrendWithTable } from '@/components/dashboard/DailyTrendWithTable';
import { HourlyTrendLineChart } from '@/components/dashboard/HourlyTrendLineChart';
import { CategoryDonutChart } from '@/components/dashboard/CategoryDonutChart';
import { SizeDonutChart } from '@/components/dashboard/SizeDonutChart';
import { CategoryVolumeBarChart } from '@/components/dashboard/CategoryVolumeBarChart';
import { Top5BestSellersChart } from '@/components/dashboard/Top5BestSellersChart';
import { Bottom5WorstSellersChart } from '@/components/dashboard/Bottom5WorstSellersChart';
import { PowerBISlicerWidget } from '@/components/dashboard/PowerBISlicerWidget';
import { DataTable } from '@/components/dashboard/DataTable';
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

// Default filters: Set to 'April' by default to MATCH IMAGE 2 SCREENSHOT ($68,737),
// with 1-click toggle to All 2015 ($817,860) in the top header bar!
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
  const [activeTab, setActiveTab] = useState<'executive' | 'sellers' | 'explorer'>('executive');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
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
      <div className="min-h-screen bg-[#0d0907] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono text-orange-400 font-bold">Initializing Luxury Intelligence Engine...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0907] text-white font-sans flex flex-row overflow-x-hidden">
      
      {/* 1. Left Vertical App Sidebar (Inspired by Image 1) */}
      <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Application Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <Header
          filters={filters}
          setFilters={setFilters}
          onResetFilters={handleResetFilters}
          recordCount={filteredRecords.length}
          totalRecords={allRecords.length}
        />

        {/* Dashboard Content Container */}
        <main className="p-4 lg:p-6 space-y-5 flex-1 max-w-[1600px] w-full mx-auto">
          
          {activeTab !== 'explorer' ? (
            <>
              {/* TOP KPI CARDS ROW (Image 2 Metrics + Image 1 Card Style) */}
              <TopKPIRow metrics={kpiMetrics} />

              {/* MAIN CONTENT GRID */}
              <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-stretch">
                
                {/* LEFT INSIGHTS SIDEBAR (The 3 Exact Insights from Image 2) */}
                <SidebarInsights />

                {/* RIGHT DASHBOARD VISUALS AREA */}
                <div className="flex-1 flex flex-col space-y-5 min-w-0">
                  
                  {/* ROW 1: DAILY & HOURLY TREND CHARTS */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1">
                    <DailyTrendWithTable
                      data={dailyTrends}
                      selectedDay={filters.day}
                      onSelectDay={(day) => setFilters((prev) => ({ ...prev, day }))}
                    />
                    <HourlyTrendLineChart data={hourlyTrends} />
                  </div>

                  {/* ROW 2: CATEGORY %, SIZE %, CATEGORY VOLUME */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
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

                  {/* ROW 3: TOP 5, BOTTOM 5, SLICER WIDGET */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
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
            </>
          ) : (
            /* RAW DATASET EXPLORER TAB */
            <DataTable records={filteredRecords} />
          )}

        </main>

        {/* Footer */}
        <footer className="py-4 border-t border-[#281c16] text-center text-xs text-slate-500 font-mono">
          Pizza Sales Luxury Intelligence Dashboard • Rebuilt from Power BI Reference
        </footer>

      </div>

    </div>
  );
}
