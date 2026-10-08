# 🍕 Pizza Sales Analysis — Interactive Power BI Web Application

An enterprise-grade, interactive Business Intelligence (BI) analytics web application built with **Next.js 14**, **React**, **TypeScript**, **Tailwind CSS**, and **Recharts**. 

This application faithfully converts and enhances the original **Power BI Pizza Sales Business Analysis Dashboard** into a real-time responsive web application designed for high performance and seamless deployment on **Vercel**.

---

## 📌 Executive Summary & Power BI Conversion

The objective of this project is to recreate the complete **Power BI Pizza Sales Analysis Report** into a modern web client while retaining 100% mathematical fidelity with the original dataset (`pizza_sales.csv`).

### 🎯 Key Performance Indicators (KPIs)
All metrics are dynamically calculated in real time using client-side JavaScript calculation engines replicating DAX logic:

| Metric Name | Power BI DAX Formula | Calculated Value | Visual Component |
| :--- | :--- | :--- | :--- |
| **Total Revenue** | `SUM(total_price)` | **$817,860.05** | `KPICards.tsx` |
| **Average Order Value** | `SUM(total_price) / COUNT(DISTINCT order_id)` | **$38.31** | `KPICards.tsx` |
| **Total Pizzas Sold** | `SUM(quantity)` | **49,574** | `KPICards.tsx` |
| **Total Orders** | `COUNT(DISTINCT order_id)` | **21,350** | `KPICards.tsx` |
| **Avg Pizzas Per Order** | `SUM(quantity) / COUNT(DISTINCT order_id)` | **2.32** | `KPICards.tsx` |

---

## 📊 Dashboard Architecture & Visual Mapping

The application reproduces every Power BI visual component as an interactive React component:

### 1. 🏠 Executive Dashboard (Home Tab)
- **Power BI Slicers Bar**: Interactive dropdowns for Category (`Classic`, `Veggie`, `Supreme`, `Chicken`), Size (`S`, `M`, `L`, `XL`, `XXL`), Month, Day of Week, Search query, and quick Reset filter badges.
- **Daily Trend for Total Orders**: Interactive bar chart displaying order volumes across days of the week, with Friday peak highlights (`3,538 orders`) and click-to-filter capability.
- **Hourly & Monthly Order Trends**: Interactive switcher between Hourly peak times (12:00 PM lunch & 6:00 PM dinner) and 12-month sales trend with gradient fill area charts.
- **Percentage of Sales by Pizza Category**: Donut chart displaying exact percentage shares (Classic `26.91%`, Supreme `25.46%`, Chicken `23.96%`, Veggie `23.68%`).
- **Percentage of Sales by Pizza Size**: Donut chart displaying revenue distribution across sizes (Large `45.89%`, Medium `30.49%`, Regular `21.77%`, XL `1.72%`, XXL `0.12%`).
- **Total Pizzas Sold by Pizza Category**: Horizontal bar chart reflecting quantity volume per category.

### 2. 🏆 Best & Worst Sellers Performance
- **Metric Selector Ribbon**: Switch between **Total Revenue ($)**, **Total Pizzas Sold (Qty)**, and **Total Orders Count**.
- **Top 5 Best Seller Pizzas**: Displays top performers (The Thai Chicken Pizza, The Barbecue Chicken Pizza, The California Chicken Pizza, The Classic Deluxe Pizza, The Spicy Italian Pizza).
- **Bottom 5 Worst Seller Pizzas**: Displays lowest performers (The Brie Carre Pizza, The Green Garden Pizza, The Spinach Supreme Pizza, The Mediterranean Pizza, The Spinach Pesto Pizza).

### 3. 📋 Raw Dataset Explorer
- Full searchable, paginated data table showing all order items.
- Dynamic column sorting (`Order ID`, `Pizza Name`, `Category`, `Size`, `Quantity`, `Unit Price`, `Total Price`, `Date`).
- **One-click CSV Export** of current filtered view.

---

## 💡 Key Business Insights

1. **Category Dominance**: The **Classic** category leads total sales ($220,053.10 / 26.91% share), followed closely by Supreme ($208,197.00 / 25.46%).
2. **Size Preference**: **Large (L)** size pizzas represent **45.89%** ($375,318.70) of total revenue. XL and XXL sizes account for less than 2% of total sales.
3. **Peak Operational Demand**:
   - **Peak Days**: Friday (`3,538 orders`) and Thursday (`3,239 orders`) generate the highest order traffic.
   - **Peak Hours**: Lunch rush (**12:00 PM – 1:00 PM**) and dinner rush (**5:00 PM – 7:00 PM**).
4. **Product Menu Optimization**:
   - **Top Revenue Generator**: *The Thai Chicken Pizza* ($43,434.25 revenue, 2,371 sold).
   - **Lowest Performer**: *The Brie Carre Pizza* ($11,588.50 revenue, 490 sold).

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Data Engine**: Custom client-side memory query engine (`src/utils/analyticsEngine.ts`)

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/pizza-sales-powerbi-analytics.git

# 2. Navigate into the project folder
cd pizza-sales-powerbi-analytics

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Production Build & Vercel Deployment

### Local Build Verification
```bash
npm run build
npm run start
```

### Deploy to Vercel (One-Click)

1. Push this repository to GitHub.
2. Log into [Vercel](https://vercel.com).
3. Click **New Project** and import your GitHub repository.
4. Keep standard Next.js build settings (`npm run build`).
5. Click **Deploy**.

The app is fully optimized for Vercel edge caching and static static optimization.

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── globals.css         # Global Tailwind styles & dark theme
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main dashboard controller
├── components/
│   └── dashboard/
│       ├── Header.tsx              # Power BI navigation header
│       ├── FilterBar.tsx           # Interactive Slicer controls
│       ├── KPICards.tsx            # 5 Key Metric Cards
│       ├── DailyTrendChart.tsx     # Orders by day bar chart
│       ├── HourlyMonthlyChart.tsx  # Peak hours & monthly trend
│       ├── CategoryPieChart.tsx    # Category revenue donut chart
│       ├── SizePieChart.tsx        # Size revenue donut chart
│       ├── CategoryBarChart.tsx    # Category quantity bar chart
│       ├── BestWorstSellers.tsx    # Top 5 / Bottom 5 rank cards
│       ├── KeyInsights.tsx         # Business findings panel
│       └── DataTable.tsx           # Paginated raw data table
├── data/
│   └── pizza_sales_compact.json    # Compressed dataset derived from pizza_sales.csv
├── types/
│   └── pizza.ts            # TypeScript interfaces
└── utils/
    ├── analyticsEngine.ts  # DAX logic & query calculation engine
    └── formatters.ts       # Currency & number formatters
```
