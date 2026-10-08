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
  computeDailyTrends,
  computeHourlyTrends,
  computeMonthlyTrends,
  computeCategoryDistribution,
  computeSizeDistribution,
  computePizzaPerformance,
  generateBusinessInsights,
} from '@/utils/analyticsEngine';

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

  // Hydrate data on client side
  useEffect(() => {
    const records = getAllRecords();
    setAllRecords(records);
    setLoading(false);
  }, []);

  // Filtered dataset
  const filteredRecords = useMemo(() => {
    return filterRecords(allRecords, filters);
  }, [allRecords, filters]);

  // Calculated metrics
  const kpiMetrics = useMemo(() => computeKPIMetrics(filteredRecords), [filteredRecords]);
  const dailyTrends = useMemo(() => computeDailyTrends(filteredRecords), [filteredRecords]);
  const hourlyTrends = useMemo(() => computeHourlyTrends(filteredRecords), [filteredRecords]);
  const monthlyTrends = useMemo(() => computeMonthlyTrends(filteredRecords), [filteredRecords]);
  const categoryDist = useMemo(() => computeCategoryDistribution(filteredRecords), [filteredRecords]);
  const sizeDist = useMemo(() => computeSizeDistribution(filteredRecords), [filteredRecords]);
  const pizzaPerf = useMemo(() => computePizzaPerformance(filteredRecords), [filteredRecords]);
  const businessInsights = useMemo(() => generateBusinessInsights(filteredRecords, kpiMetrics), [filteredRecords, kpiMetrics]);

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
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-300">Loading Power BI Dashboard Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-12">
      
      {/* Power BI Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        recordCount={filteredRecords.length}
        totalRecords={allRecords.length}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={handleResetFilters}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 flex-1">
        
        {/* Interactive Slicer Filter Bar */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onReset={handleResetFilters}
          categories={categories}
          sizes={sizes}
        />

        {/* Global KPI Cards Bar */}
        <KPICards metrics={kpiMetrics} />

        {/* TAB 1: EXECUTIVE DASHBOARD OVERVIEW */}
        {activeTab === 'executive' && (
          <div className="space-y-6">
            
            {/* Top Row: Daily & Hourly/Monthly Trends */}
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

            {/* Middle Row: Category %, Size %, and Category Pizzas Sold */}
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

            {/* Bottom Section: Key Insights */}
            <KeyInsights insights={businessInsights} />

          </div>
        )}

        {/* TAB 2: BEST & WORST SELLERS ANALYSIS */}
        {activeTab === 'sellers' && (
          <BestWorstSellers data={pizzaPerf} />
        )}

        {/* TAB 3: DATA EXPLORER & RAW TABLE */}
        {activeTab === 'explorer' && (
          <DataTable records={filteredRecords} />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Pizza Sales Business Analytics — Rebuilt from Power BI Reference</p>
          <div className="flex items-center space-x-3">
            <span className="bg-slate-900 text-slate-400 px-2.5 py-1 rounded border border-slate-800 text-[11px] font-mono">
              Next.js 14 • React • TypeScript • Tailwind CSS • Recharts
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
