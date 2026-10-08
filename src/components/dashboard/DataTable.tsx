'use client';

import React, { useState, useMemo } from 'react';
import { Table, Download, ChevronLeft, ChevronRight, ArrowUpDown, Search } from 'lucide-react';
import { PizzaRecord } from '@/types/pizza';
import { formatCurrency } from '@/utils/formatters';

interface DataTableProps {
  records: PizzaRecord[];
}

export const DataTable: React.FC<DataTableProps> = ({ records }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortField, setSortField] = useState<keyof PizzaRecord>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = useMemo(() => {
    if (!searchQuery) return records;
    const q = searchQuery.toLowerCase();
    return records.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.orderId.toString().includes(q) ||
        r.size.toLowerCase().includes(q)
    );
  }, [records, searchQuery]);

  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredRecords, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedRecords.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedRecords.slice(start, start + pageSize);
  }, [sortedRecords, currentPage, pageSize]);

  const handleSort = (field: keyof PizzaRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Order ID', 'Pizza Name', 'Category', 'Size', 'Quantity', 'Unit Price ($)', 'Total Price ($)', 'Date', 'Time'];
    const rows = sortedRecords.map((r) => [
      r.orderId,
      `"${r.name}"`,
      r.category,
      r.size,
      r.quantity,
      r.unitPrice,
      r.totalPrice,
      r.date,
      r.time,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pizza_sales_filtered_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="intel-card rounded-2xl p-5 space-y-4">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              RAW DATASET EXPLORER
            </h2>
            <p className="text-[11px] text-slate-400 font-normal">
              Showing {sortedRecords.length.toLocaleString()} matching records from {records.length.toLocaleString()} total
            </p>
          </div>
        </div>

        {/* Search & Export */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search dataset..."
              className="bg-[#111728] border border-slate-800 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:ring-1 focus:ring-amber-500 font-medium"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Data Table Grid */}
      <div className="overflow-x-auto rounded-xl border border-slate-800/80">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#111728] text-slate-400 text-[10px] font-mono font-bold uppercase tracking-widest border-b border-slate-800">
            <tr>
              <th className="py-3 px-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('orderId')}>
                <div className="flex items-center space-x-1">
                  <span>Order ID</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
                <div className="flex items-center space-x-1">
                  <span>Pizza Name</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('category')}>
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('size')}>
                <div className="flex items-center space-x-1">
                  <span>Size</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3.5 text-right cursor-pointer hover:text-white" onClick={() => handleSort('quantity')}>
                <div className="flex items-center justify-end space-x-1">
                  <span>Qty</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3.5 text-right cursor-pointer hover:text-white" onClick={() => handleSort('unitPrice')}>
                <div className="flex items-center justify-end space-x-1">
                  <span>Unit Price</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3.5 text-right cursor-pointer hover:text-white" onClick={() => handleSort('totalPrice')}>
                <div className="flex items-center justify-end space-x-1">
                  <span>Total Price</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('date')}>
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-numeric text-[11px]">
            {paginatedRecords.length > 0 ? (
              paginatedRecords.map((r, i) => (
                <tr key={`${r.id}-${i}`} className="hover:bg-slate-800/30 transition">
                  <td className="py-2.5 px-3.5 font-bold text-amber-400 font-mono">#{r.orderId}</td>
                  <td className="py-2.5 px-3.5 font-sans font-semibold text-white">{r.name}</td>
                  <td className="py-2.5 px-3.5 font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#111728] border border-slate-800 text-slate-300 font-mono">
                      {r.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3.5 font-sans">
                    <span className="font-bold text-blue-400 font-mono">{r.size}</span>
                  </td>
                  <td className="py-2.5 px-3.5 text-right text-emerald-400 font-bold">{r.quantity}</td>
                  <td className="py-2.5 px-3.5 text-right text-slate-300">{formatCurrency(r.unitPrice)}</td>
                  <td className="py-2.5 px-3.5 text-right font-bold text-amber-300">{formatCurrency(r.totalPrice)}</td>
                  <td className="py-2.5 px-3.5 text-slate-400 font-mono">{r.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500 font-sans">
                  No records match your search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 pt-2 font-mono">
        <div className="flex items-center space-x-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-[#111728] border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1"
          >
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <span>
            Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
          </span>
          <div className="flex items-center space-x-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1 rounded-lg bg-[#111728] border border-slate-800 hover:bg-slate-800 disabled:opacity-40 text-slate-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1 rounded-lg bg-[#111728] border border-slate-800 hover:bg-slate-800 disabled:opacity-40 text-slate-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
