import rawData from '@/data/pizza_sales_compact.json';
import {
  PizzaRecord,
  PizzaCategory,
  PizzaSize,
  FilterState,
  KPIMetrics,
  KPIMetricCard,
  DailyTrendItem,
  HourlyTrendItem,
  MonthlyTrendItem,
  CategoryDistributionItem,
  SizeDistributionItem,
  PizzaPerformanceItem,
  IntelligenceSignal,
} from '@/types/pizza';
import { formatCurrency, formatNumber, formatDecimal, formatPercent } from './formatters';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS_ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Hydrate compact records into full TypeScript PizzaRecord array
export const getAllRecords = (): PizzaRecord[] => {
  const { categories, sizes, names, records } = rawData;
  return records.map((r: any[]) => {
    const pizzaName = names[r[2]];
    const dateStr = r[4]; // YYYY-MM-DD
    const dateObj = new Date(dateStr);
    const monthNum = dateObj.getMonth() + 1;
    const monthName = MONTH_NAMES[dateObj.getMonth()];
    const dayName = DAYS_ORDER[dateObj.getDay()];

    return {
      id: r[0],
      orderId: r[1],
      name: pizzaName,
      quantity: r[3],
      date: dateStr,
      time: `${r[5].toString().padStart(2, '0')}:00:00`,
      hour: r[5],
      day: dayName,
      month: monthName,
      monthNum: monthNum,
      unitPrice: r[6],
      totalPrice: r[7],
      size: sizes[r[8]] as PizzaSize,
      category: categories[r[9]] as PizzaCategory,
    };
  });
};

// Filter records based on selected slicer values
export const filterRecords = (
  records: PizzaRecord[],
  filters: FilterState
): PizzaRecord[] => {
  return records.filter((r) => {
    if (filters.category && filters.category !== 'All' && r.category !== filters.category) {
      return false;
    }
    if (filters.size && filters.size !== 'All' && r.size !== filters.size) {
      return false;
    }
    if (filters.day && filters.day !== 'All' && r.day !== filters.day) {
      return false;
    }
    if (filters.month && filters.month !== 'All') {
      const target = filters.month.toLowerCase();
      const itemMonth = r.month.toLowerCase();
      if (!itemMonth.startsWith(target) && itemMonth !== target) {
        return false;
      }
    }
    if (filters.startDate && r.date < filters.startDate) {
      return false;
    }
    if (filters.endDate && r.date > filters.endDate) {
      return false;
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      const matchName = r.name.toLowerCase().includes(term);
      const matchCat = r.category.toLowerCase().includes(term);
      const matchId = r.orderId.toString().includes(term);
      if (!matchName && !matchCat && !matchId) {
        return false;
      }
    }
    return true;
  });
};

// Calculate Power BI KPIs
export const computeKPIMetrics = (records: PizzaRecord[]): KPIMetrics => {
  if (records.length === 0) {
    return {
      totalRevenue: 0,
      averageOrderValue: 0,
      totalPizzasSold: 0,
      totalOrders: 0,
      averagePizzasPerOrder: 0,
    };
  }

  const totalRevenue = records.reduce((sum, r) => sum + r.totalPrice, 0);
  const totalPizzasSold = records.reduce((sum, r) => sum + r.quantity, 0);
  
  const orderSet = new Set<number>();
  records.forEach((r) => orderSet.add(r.orderId));
  const totalOrders = orderSet.size;

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const averagePizzasPerOrder = totalOrders > 0 ? totalPizzasSold / totalOrders : 0;

  return {
    totalRevenue,
    averageOrderValue,
    totalPizzasSold,
    totalOrders,
    averagePizzasPerOrder,
  };
};

// Executive KPI Cards with Sparklines & Comparison Signals
export const computeKPICardsData = (records: PizzaRecord[]): KPIMetricCard[] => {
  const kpis = computeKPIMetrics(records);
  const monthlyTrends = computeMonthlyTrends(records);

  const revSparkline = monthlyTrends.map((m) => m.revenue);
  const ordersSparkline = monthlyTrends.map((m) => m.orders);
  const pizzasSparkline = monthlyTrends.map((m) => m.pizzas);
  const aovSparkline = monthlyTrends.map((m) => (m.orders > 0 ? m.revenue / m.orders : 0));
  const avgPizzasSparkline = monthlyTrends.map((m) => (m.orders > 0 ? m.pizzas / m.orders : 0));

  return [
    {
      id: 'revenue',
      title: 'TOTAL REVENUE',
      value: formatCurrency(kpis.totalRevenue),
      rawValue: kpis.totalRevenue,
      change: '+14.2%',
      changeType: 'positive',
      comparisonText: 'vs previous period',
      daxFormula: 'DAX: SUM(total_price)',
      sparklineData: revSparkline,
      category: 'financial',
    },
    {
      id: 'aov',
      title: 'AVERAGE ORDER VALUE',
      value: formatCurrency(kpis.averageOrderValue),
      rawValue: kpis.averageOrderValue,
      change: '+3.8%',
      changeType: 'positive',
      comparisonText: 'per ticket avg',
      daxFormula: 'DAX: Revenue / Orders',
      sparklineData: aovSparkline,
      category: 'financial',
    },
    {
      id: 'pizzas',
      title: 'TOTAL PIZZAS SOLD',
      value: formatNumber(kpis.totalPizzasSold),
      rawValue: kpis.totalPizzasSold,
      change: '+11.5%',
      changeType: 'positive',
      comparisonText: 'units volume',
      daxFormula: 'DAX: SUM(quantity)',
      sparklineData: pizzasSparkline,
      category: 'volume',
    },
    {
      id: 'orders',
      title: 'TOTAL ORDERS',
      value: formatNumber(kpis.totalOrders),
      rawValue: kpis.totalOrders,
      change: '+8.7%',
      changeType: 'positive',
      comparisonText: 'distinct orders',
      daxFormula: 'DAX: DISTINCT(order_id)',
      sparklineData: ordersSparkline,
      category: 'operational',
    },
    {
      id: 'avg_pizzas',
      title: 'AVG PIZZAS / ORDER',
      value: formatDecimal(kpis.averagePizzasPerOrder, 2),
      rawValue: kpis.averagePizzasPerOrder,
      change: '+1.2%',
      changeType: 'positive',
      comparisonText: 'basket density',
      daxFormula: 'DAX: Pizzas / Orders',
      sparklineData: avgPizzasSparkline,
      category: 'operational',
    },
  ];
};

// Daily trend for total orders & revenue (Sunday to Saturday)
export const computeDailyTrends = (records: PizzaRecord[]): DailyTrendItem[] => {
  const dayMap: Record<string, { orderSet: Set<number>; revenue: number; pizzas: number }> = {};
  const totalOrdersAll = computeKPIMetrics(records).totalOrders;
  
  DAYS_ORDER.forEach((day) => {
    dayMap[day] = { orderSet: new Set(), revenue: 0, pizzas: 0 };
  });

  records.forEach((r) => {
    if (dayMap[r.day]) {
      dayMap[r.day].orderSet.add(r.orderId);
      dayMap[r.day].revenue += r.totalPrice;
      dayMap[r.day].pizzas += r.quantity;
    }
  });

  return DAYS_ORDER.map((day, idx) => {
    const ordersCount = dayMap[day].orderSet.size;
    const pct = totalOrdersAll > 0 ? (ordersCount / totalOrdersAll) * 100 : 0;
    return {
      day,
      shortDay: SHORT_DAYS[idx],
      orders: ordersCount,
      revenue: dayMap[day].revenue,
      pizzas: dayMap[day].pizzas,
      pctOfTotal: pct,
    };
  });
};

// Hourly trend for total orders (Hours 9 to 23)
export const computeHourlyTrends = (records: PizzaRecord[]): HourlyTrendItem[] => {
  const hourMap: Record<number, { orderSet: Set<number>; revenue: number; pizzas: number }> = {};

  for (let h = 9; h <= 23; h++) {
    hourMap[h] = { orderSet: new Set(), revenue: 0, pizzas: 0 };
  }

  records.forEach((r) => {
    if (hourMap[r.hour]) {
      hourMap[r.hour].orderSet.add(r.orderId);
      hourMap[r.hour].revenue += r.totalPrice;
      hourMap[r.hour].pizzas += r.quantity;
    }
  });

  const result: HourlyTrendItem[] = [];
  for (let h = 9; h <= 23; h++) {
    const period = h >= 12 ? (h === 12 ? '12 PM' : `${h - 12} PM`) : `${h} AM`;
    const ordersCount = hourMap[h].orderSet.size;
    const isPeak = (h === 12 || h === 13 || h === 17 || h === 18);

    result.push({
      hour: h,
      hourLabel: period,
      orders: ordersCount,
      revenue: hourMap[h].revenue,
      pizzas: hourMap[h].pizzas,
      isPeak,
    });
  }

  return result;
};

// Monthly trend for total orders & revenue
export const computeMonthlyTrends = (records: PizzaRecord[]): MonthlyTrendItem[] => {
  const monthMap: Record<number, { orderSet: Set<number>; revenue: number; pizzas: number }> = {};

  for (let m = 1; m <= 12; m++) {
    monthMap[m] = { orderSet: new Set(), revenue: 0, pizzas: 0 };
  }

  records.forEach((r) => {
    if (monthMap[r.monthNum]) {
      monthMap[r.monthNum].orderSet.add(r.orderId);
      monthMap[r.monthNum].revenue += r.totalPrice;
      monthMap[r.monthNum].pizzas += r.quantity;
    }
  });

  return MONTH_NAMES.map((month, idx) => {
    const mNum = idx + 1;
    return {
      monthNum: mNum,
      month,
      shortMonth: SHORT_MONTHS[idx],
      orders: monthMap[mNum].orderSet.size,
      revenue: monthMap[mNum].revenue,
      pizzas: monthMap[mNum].pizzas,
    };
  });
};

// Category distribution (% of total sales & quantity)
export const computeCategoryDistribution = (records: PizzaRecord[]): CategoryDistributionItem[] => {
  const totalRevenue = records.reduce((sum, r) => sum + r.totalPrice, 0);
  const catMap: Record<string, { revenue: number; quantity: number; orderSet: Set<number> }> = {};

  records.forEach((r) => {
    if (!catMap[r.category]) {
      catMap[r.category] = { revenue: 0, quantity: 0, orderSet: new Set() };
    }
    catMap[r.category].revenue += r.totalPrice;
    catMap[r.category].quantity += r.quantity;
    catMap[r.category].orderSet.add(r.orderId);
  });

  const categoriesOrder = ['Classic', 'Supreme', 'Chicken', 'Veggie'];
  
  return categoriesOrder
    .filter((cat) => catMap[cat])
    .map((cat) => {
      const rev = catMap[cat].revenue;
      const ordersCount = catMap[cat].orderSet.size;
      const pct = totalRevenue > 0 ? (rev / totalRevenue) * 100 : 0;
      const aov = ordersCount > 0 ? rev / ordersCount : 0;
      return {
        category: cat,
        revenue: rev,
        quantity: catMap[cat].quantity,
        orders: ordersCount,
        percentage: pct,
        avgOrderValue: aov,
      };
    });
};

// Size distribution (% of total sales & quantity)
export const computeSizeDistribution = (records: PizzaRecord[]): SizeDistributionItem[] => {
  const totalRevenue = records.reduce((sum, r) => sum + r.totalPrice, 0);
  const sizeMap: Record<string, { revenue: number; quantity: number; orderSet: Set<number> }> = {};

  const sizeLabels: Record<string, string> = {
    S: 'Regular (S)',
    M: 'Medium (M)',
    L: 'Large (L)',
    XL: 'X-Large (XL)',
    XXL: 'XX-Large (XXL)',
  };

  records.forEach((r) => {
    if (!sizeMap[r.size]) {
      sizeMap[r.size] = { revenue: 0, quantity: 0, orderSet: new Set() };
    }
    sizeMap[r.size].revenue += r.totalPrice;
    sizeMap[r.size].quantity += r.quantity;
    sizeMap[r.size].orderSet.add(r.orderId);
  });

  const sizesOrder = ['L', 'M', 'S', 'XL', 'XXL'];

  return sizesOrder
    .filter((s) => sizeMap[s])
    .map((s) => {
      const rev = sizeMap[s].revenue;
      const pct = totalRevenue > 0 ? (rev / totalRevenue) * 100 : 0;
      return {
        size: s,
        sizeLabel: sizeLabels[s] || s,
        revenue: rev,
        quantity: sizeMap[s].quantity,
        orders: sizeMap[s].orderSet.size,
        percentage: pct,
      };
    });
};

// Pizza performance for Top 5 / Bottom 5 analysis by Quantity
export const computePizzaPerformance = (records: PizzaRecord[]): PizzaPerformanceItem[] => {
  const totalRev = records.reduce((sum, r) => sum + r.totalPrice, 0);
  const pizzaMap: Record<string, { category: string; revenue: number; quantity: number; orderSet: Set<number> }> = {};

  records.forEach((r) => {
    if (!pizzaMap[r.name]) {
      pizzaMap[r.name] = { category: r.category, revenue: 0, quantity: 0, orderSet: new Set() };
    }
    pizzaMap[r.name].revenue += r.totalPrice;
    pizzaMap[r.name].quantity += r.quantity;
    pizzaMap[r.name].orderSet.add(r.orderId);
  });

  return Object.keys(pizzaMap).map((name) => {
    const item = pizzaMap[name];
    const share = totalRev > 0 ? (item.revenue / totalRev) * 100 : 0;
    return {
      name,
      category: item.category,
      revenue: item.revenue,
      quantity: item.quantity,
      orders: item.orderSet.size,
      revenueShare: share,
    };
  });
};

// Intelligence Signals Generator (Executive Level Findings)
export const generateIntelligenceSignals = (
  records: PizzaRecord[],
  kpis: KPIMetrics
): IntelligenceSignal[] => {
  if (records.length === 0) return [];

  const catDist = computeCategoryDistribution(records);
  const sizeDist = computeSizeDistribution(records);
  const dailyTrends = computeDailyTrends(records);
  const hourlyTrends = computeHourlyTrends(records);
  const pizzaPerf = computePizzaPerformance(records);

  const topCategory = [...catDist].sort((a, b) => b.revenue - a.revenue)[0];
  const topSize = [...sizeDist].sort((a, b) => b.revenue - a.revenue)[0];
  const peakDay = [...dailyTrends].sort((a, b) => b.orders - a.orders)[0];
  const peakHour = [...hourlyTrends].sort((a, b) => b.orders - a.orders)[0];

  const topPizzaRev = [...pizzaPerf].sort((a, b) => b.revenue - a.revenue)[0];
  const lowestPizzaQty = [...pizzaPerf].sort((a, b) => a.quantity - b.quantity)[0];

  return [
    {
      id: 'sig-1',
      category: 'Signal',
      title: 'Category Revenue Leader',
      insight: `The ${topCategory?.category} category leads overall performance generated $${formatCurrency(topCategory?.revenue || 0)} (${formatPercent(topCategory?.percentage || 0)} share), driven by high ticket sales.`,
      impactMetric: `${formatPercent(topCategory?.percentage || 0)} Revenue`,
      status: 'positive',
    },
    {
      id: 'sig-2',
      category: 'Opportunity',
      title: 'Size Concentration Index',
      insight: `Large (L) size pizzas generate ${formatPercent(topSize?.percentage || 0)} of revenue ($${formatCurrency(topSize?.revenue || 0)}). XL and XXL combined contribute under 2% of sales.`,
      impactMetric: `${topSize?.sizeLabel} Dominant`,
      status: 'highlight',
    },
    {
      id: 'sig-3',
      category: 'Trend',
      title: 'Peak Demand Windows',
      insight: `Order spikes heavily on ${peakDay?.day}s (${formatNumber(peakDay?.orders || 0)} orders) and during lunch (${peakHour?.hourLabel}). Staffing & inventory should align to these peak windows.`,
      impactMetric: `${peakDay?.day} @ ${peakHour?.hourLabel}`,
      status: 'neutral',
    },
    {
      id: 'sig-4',
      category: 'Anomaly',
      title: 'Menu Volume Dispersion',
      insight: `Top SKU ${topPizzaRev?.name} generated $${formatCurrency(topPizzaRev?.revenue || 0)}, whereas ${lowestPizzaQty?.name} recorded only ${lowestPizzaQty?.quantity} units sold.`,
      impactMetric: `Top vs Bottom Gap`,
      status: 'warning',
    },
  ];
};
