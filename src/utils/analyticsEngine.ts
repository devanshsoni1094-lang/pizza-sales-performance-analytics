import rawData from '@/data/pizza_sales_compact.json';
import {
  PizzaRecord,
  PizzaCategory,
  PizzaSize,
  FilterState,
  KPIMetrics,
  DailyTrendItem,
  HourlyTrendItem,
  CategoryDistributionItem,
  SizeDistributionItem,
  PizzaPerformanceItem,
} from '@/types/pizza';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHORT_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

// Daily trend for total orders & revenue (Sunday to Saturday)
export const computeDailyTrends = (records: PizzaRecord[]): DailyTrendItem[] => {
  const dayMap: Record<string, { orderSet: Set<number>; revenue: number; pizzas: number }> = {};
  
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

  return DAYS_ORDER.map((day, idx) => ({
    day,
    shortDay: SHORT_DAYS[idx],
    orders: dayMap[day].orderSet.size,
    revenue: dayMap[day].revenue,
    pizzas: dayMap[day].pizzas,
  }));
};

// Hourly trend for total orders (Hours 10 to 23)
export const computeHourlyTrends = (records: PizzaRecord[]): HourlyTrendItem[] => {
  const hourMap: Record<number, { orderSet: Set<number>; revenue: number; pizzas: number }> = {};

  for (let h = 10; h <= 23; h++) {
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
  for (let h = 10; h <= 23; h++) {
    result.push({
      hour: h,
      orders: hourMap[h].orderSet.size,
      revenue: hourMap[h].revenue,
      pizzas: hourMap[h].pizzas,
    });
  }

  return result;
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

  // Exactly match Power BI legend order in screenshot: Chicken, Classic, Supreme, Veggie
  const categoriesOrder = ['Chicken', 'Classic', 'Supreme', 'Veggie'];
  
  return categoriesOrder
    .filter((cat) => catMap[cat])
    .map((cat) => {
      const rev = catMap[cat].revenue;
      const pct = totalRevenue > 0 ? (rev / totalRevenue) * 100 : 0;
      return {
        category: cat,
        revenue: rev,
        quantity: catMap[cat].quantity,
        orders: catMap[cat].orderSet.size,
        percentage: pct,
      };
    });
};

// Size distribution (% of total sales & quantity)
export const computeSizeDistribution = (records: PizzaRecord[]): SizeDistributionItem[] => {
  const totalRevenue = records.reduce((sum, r) => sum + r.totalPrice, 0);
  const sizeMap: Record<string, { revenue: number; quantity: number; orderSet: Set<number> }> = {};

  const sizeLabels: Record<string, string> = {
    L: 'Large',
    M: 'Medium',
    S: 'Regular',
    XL: 'X-Large',
    XXL: 'XX-Large',
  };

  records.forEach((r) => {
    if (!sizeMap[r.size]) {
      sizeMap[r.size] = { revenue: 0, quantity: 0, orderSet: new Set() };
    }
    sizeMap[r.size].revenue += r.totalPrice;
    sizeMap[r.size].quantity += r.quantity;
    sizeMap[r.size].orderSet.add(r.orderId);
  });

  // Exactly match Power BI legend order: Large, Medium, Regular, X-Large, XX-Large
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
    return {
      name,
      category: item.category,
      revenue: item.revenue,
      quantity: item.quantity,
      orders: item.orderSet.size,
    };
  });
};
