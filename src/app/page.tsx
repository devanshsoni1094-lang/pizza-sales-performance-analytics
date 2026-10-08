'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/dashboard/Header';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { KPICards } from '@/components/dashboard/KPICards';
import { DailyTrendChart } from '@/components/dashboard/DailyTrendChart';
import { HourlyMonthlyChart } from '@/components/dashboard/HourlyMonthlyChart';
import { CategoryPieChart } from '@/components/dashboard/CategoryPieChart';
import { SizePieChart } from '@/components/dashboard/SizePieChart';
import { CategoryBarChart } from '@/components/dashboard/CategoryBarChart';
import { BestWorstSellers } from '@/components/dashboard/BestWorstSellers';
import { KeyInsights } from '@/components/dashboard/KeyInsights';
import { DataTable } from '@/components/dashboard/DataTable';
import { FilterState } from '@/types/pizza';
import {
  getAllRecords,
  filterRecords,
  computeKPIMetrics,
  computeKPICardsData,
  computeDailyTrends,
  computeHourlyTrends,
  computeMonthlyTrends,
  computeCategoryDistribution,
  computeSizeDistribution,
  computePizzaPerformance,
} from '@/utils/analyticsEngine';

// Default filters: All 2015 by default ($817,860.05),
// with 1-click toggle to Apr 2015 ($68,737) in the filter bar!
const initialFilters: FilterState = {
  category: 'All',
  size: 'All',
  day: 'All',
  month: 'All',
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
  const kpiCardsData = useMemo(() => computeKPICardsData(filteredRecords), [filteredRecords]);
  const dailyTrends = useMemo(() => computeDailyTrends(filteredRecords), [filteredRecords]);
  const hourlyTrends = useMemo(() => computeHourlyTrends(filteredRecords), [filteredRecords]);
  const monthlyTrends = useMemo(() => computeMonthlyTrends(filteredRecords), [filteredRecords]);
  const categoryDist = useMemo(() => computeCategoryDistribution(filteredRecords), [filteredRecords]);
  const sizeDist = useMemo(() => computeSizeDistribution(filteredRecords), [filteredRecords]);
  const pizzaPerf = useMemo(() => computePizzaPerformance(filteredRecords), [filteredRecords]);

  const categories = ['Classic', 'Veggie', 'Supreme', 'Chicken'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const hasActiveFilters = useMemo(() => {
    return (
      filters.category !== 'All' ||
      filters.size !== 'All' ||
      filters.day !== 'All' ||
      filters.month !== 'All' ||
      filters.startDate !== '' ||
      filters.endDate !== '' ||
      filters.searchTerm !== ''
    );
  }, [filters]);

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono text-slate-400">Loading Enterprise Dax Engine...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans pb-12">
      
      {/* Enterprise BI Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        recordCount={filteredRecords.length}
        totalRecords={allRecords.length}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={handleResetFilters}
      />

      {/* Main Container */}
      <main className="max-w-[1536px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 flex-1 space-y-6">
        
        {/* Compact Dimension Filter Slicer Bar */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onReset={handleResetFilters}
          categories={categories}
          sizes={sizes}
        />

        {/* Global Executive KPI Cards with Vector Sparklines */}
        <KPICards cards={kpiCardsData} />

        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === 'executive' && (
          <div className="space-y-6">
            
            {/* Top Grid: Daily Trend & Hourly/Monthly Trajectory */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DailyTrendChart
                data={dailyTrends}
                selectedDay={filters.day}
                onSelectDay={(day) => setFilters((prev) => ({ ...prev, day }))}
              />
              <HourlyMonthlyChart
                hourlyData={hourlyTrends}
                monthlyData={monthlyTrends}
                selectedMonth={filters.month}
                onSelectMonth={(month) => setFilters((prev) => ({ ...prev, month }))}
              />
            </div>

            {/* Middle Grid: Category %, Size %, and Category Unit Volumes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CategoryPieChart
                data={categoryDist}
                selectedCategory={filters.category}
                onSelectCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
              />
              <SizePieChart
                data={sizeDist}
                selectedSize={filters.size}
                onSelectSize={(sz) => setFilters((prev) => ({ ...prev, size: sz }))}
              />
              <CategoryBarChart
                data={categoryDist}
                selectedCategory={filters.category}
                onSelectCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
              />
            </div>

            {/* Executive Insights Matching Exact Power BI Report */}
            <KeyInsights />

          </div>
        )}

        {/* TAB 2: MENU INTELLIGENCE (BEST & WORST SELLERS) */}
        {activeTab === 'sellers' && (
          <BestWorstSellers data={pizzaPerf} />
        )}

        {/* TAB 3: DATASET EXPLORER */}
        {activeTab === 'explorer' && (
          <DataTable records={filteredRecords} />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-[#07090e] py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-[1536px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Slice Intelligence — Commercial Intelligence Platform</p>
          <div className="flex items-center space-x-3">
            <span className="bg-[#0d121f] text-slate-400 px-3 py-1 rounded-lg border border-slate-800 text-[11px]">
              Next.js 14 • React • TypeScript • Tailwind CSS • Recharts
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
