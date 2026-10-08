'use client';

import React from 'react';
import { Cpu, CheckCircle2, TrendingUp, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { IntelligenceSignal } from '@/types/pizza';

interface KeyInsightsProps {
  signals: IntelligenceSignal[];
}

export const KeyInsights: React.FC<KeyInsightsProps> = ({ signals }) => {
  const getBadge = (status: IntelligenceSignal['status']) => {
    switch (status) {
      case 'positive':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">SIGNAL</span>;
      case 'highlight':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">OPPORTUNITY</span>;
      case 'warning':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/20">ANOMALY</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">TREND</span>;
    }
  };

  return (
    <div className="intel-card rounded-2xl p-5 mb-6">
      
      {/* Header */}
      <div className="flex items-center space-x-2.5 pb-3 mb-4 border-b border-slate-800/80">
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Cpu className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
            EXECUTIVE INTELLIGENCE SIGNALS & BUSINESS ANOMALIES
          </h2>
          <p className="text-[11px] text-slate-400 font-normal">
            Automated operational observations calculated directly from order records
          </p>
        </div>
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {signals.map((sig) => (
          <div
            key={sig.id}
            className="bg-[#0b101d] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition"
          >
            <div className="flex items-center justify-between">
              {getBadge(sig.status)}
              <span className="text-[10px] font-mono text-slate-400 font-medium">{sig.impactMetric}</span>
            </div>

            <div>
              <h3 className="text-xs font-bold text-white font-sans mb-1">{sig.title}</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                {sig.insight}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Operational Impact</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
