export type PizzaCategory = 'Classic' | 'Veggie' | 'Supreme' | 'Chicken';
export type PizzaSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface PizzaRecord {
  id: number;
  orderId: number;
  name: string;
  quantity: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS
  hour: number;
  day: string; // Monday, Tuesday...
  month: string; // January, February...
  monthNum: number;
  unitPrice: number;
  totalPrice: number;
  size: PizzaSize;
  category: PizzaCategory;
}

export interface FilterState {
  category: string; // 'All' or specific
  size: string; // 'All' or specific
  day: string; // 'All' or specific day
  month: string; // 'All' or specific month
  startDate: string; // 'YYYY-MM-DD' or ''
  endDate: string; // 'YYYY-MM-DD' or ''
  searchTerm: string;
}

export interface KPIMetricCard {
  id: string;
  title: string;
  value: string;
  rawValue: number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  comparisonText: string;
  daxFormula: string;
  sparklineData: number[];
  category: 'financial' | 'operational' | 'volume';
}

export interface KPIMetrics {
  totalRevenue: number;
  averageOrderValue: number;
  totalPizzasSold: number;
  totalOrders: number;
  averagePizzasPerOrder: number;
}

export interface DailyTrendItem {
  day: string;
  shortDay: string;
  orders: number;
  revenue: number;
  pizzas: number;
  pctOfTotal: number;
}

export interface HourlyTrendItem {
  hour: number;
  hourLabel: string;
  orders: number;
  revenue: number;
  pizzas: number;
  isPeak: boolean;
}

export interface MonthlyTrendItem {
  monthNum: number;
  month: string;
  shortMonth: string;
  orders: number;
  revenue: number;
  pizzas: number;
}

export interface CategoryDistributionItem {
  category: string;
  revenue: number;
  quantity: number;
  orders: number;
  percentage: number;
  avgOrderValue: number;
}

export interface SizeDistributionItem {
  size: string;
  sizeLabel: string;
  revenue: number;
  quantity: number;
  orders: number;
  percentage: number;
}

export interface PizzaPerformanceItem {
  name: string;
  category: string;
  revenue: number;
  quantity: number;
  orders: number;
  avgUnitPrice: number;
  revenueShare: number;
}

export interface IntelligenceSignal {
  id: string;
  category: 'Signal' | 'Anomaly' | 'Opportunity' | 'Trend';
  title: string;
  insight: string;
  impactMetric: string;
  status: 'positive' | 'warning' | 'neutral' | 'highlight';
}
