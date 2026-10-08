'use client';

import React from 'react';
import { Lightbulb, CheckCircle2, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import { BusinessInsight } from '@/types/pizza';

interface KeyInsightsProps {
  insights: BusinessInsight[];
}

export const KeyInsights: React.FC<KeyInsightsProps> = ({ insights }) => {
  const getIcon = (type: BusinessInsight['type']) => {
    switch (type) {
      case 'positive':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'highlight':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <TrendingUp className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBorderColor = (type: BusinessInsight['type']) => {
    switch (type) {
      case 'positive':
        return 'border-emerald-500/30 bg-emerald-500/5';
      case 'highlight':
        return 'border-amber-500/30 bg-amber-500/5';
      case 'warning':
        return 'border-red-500/30 bg-red-500/5';
      default:
        return 'border-blue-500/30 bg-blue-500/5';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg mb-6">
      
      {/* Header */}
      <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-800">
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            KEY BUSINESS INSIGHTS & ANALYTICAL SUMMARY
          </h2>
          <p className="text-xs text-slate-400">
            Data-driven operational observations calculated directly from order records
          </p>
        </div>
      </div>

      {/* Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`border rounded-xl p-4 flex flex-col justify-between space-y-3 transition hover:border-slate-700 ${getBorderColor(
              insight.type
            )}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                {getIcon(insight.type)}
                <h3 className="text-xs font-bold text-white">{insight.title}</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {insight.description}
            </p>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400 font-medium">Metric:</span>
              <span className="text-amber-400 font-bold">{insight.metric}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
