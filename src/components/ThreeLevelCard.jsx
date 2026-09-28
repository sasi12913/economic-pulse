import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, Info, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import Sparkline from './Sparkline';

export default function ThreeLevelCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  const getDirectionBadge = () => {
    if (item.direction === 'up') {
      return (
        <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
          <span>↑ vs prev ({item.prevValue})</span>
        </span>
      );
    }
    if (item.direction === 'down') {
      return (
        <span className="inline-flex items-center text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
          <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
          <span>↓ vs prev ({item.prevValue})</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
        <Minus className="w-3.5 h-3.5 mr-0.5" />
        <span>→ vs prev ({item.prevValue})</span>
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow transition-all overflow-hidden flex flex-col">
      {/* Top Card Section */}
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              {item.category}
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight mt-0.5 font-sans">
              {item.title}
            </h3>
          </div>
          <Sparkline data={item.sparkline} color={item.direction === 'up' ? '#2563eb' : '#0d9488'} />
        </div>

        {/* Value Display */}
        <div className="mt-3 flex items-baseline justify-between">
          <div className="text-2xl font-bold font-mono tracking-tight text-slate-900">
            {item.value}
          </div>
          {getDirectionBadge()}
        </div>

        {/* Level 1: WHAT */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="text-[10px] font-mono font-bold uppercase text-slate-500">LEVEL 1 — WHAT IS THIS?</div>
          <p className="text-xs text-slate-700 leading-relaxed mt-1">
            {item.level1}
          </p>
        </div>
      </div>

      {/* Expandable Disclosure for Level 2 & Level 3 */}
      <div className="bg-slate-50 border-t border-slate-100">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-4 py-2 text-left text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center justify-between transition"
        >
          <span className="flex items-center space-x-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>{expanded ? 'Hide Drivers & Household Impact' : 'Why this matters & Household Impact'}</span>
          </span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {expanded && (
          <div className="px-4 pb-4 pt-1 space-y-3 text-xs border-t border-slate-200/60 bg-white">
            
            {/* Level 2: WHY */}
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-indigo-600">LEVEL 2 — WHY IS IT MOVING?</div>
              <p className="text-slate-700 mt-0.5 leading-relaxed">
                {item.level2}
              </p>
            </div>

            {/* Level 3: SO WHAT */}
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-teal-600">LEVEL 3 — SO WHAT FOR HOUSEHOLDS & REGIONS?</div>
              <p className="text-slate-700 mt-0.5 leading-relaxed font-medium">
                {item.level3}
              </p>
            </div>

            {/* Nuance Warning */}
            <div className="bg-amber-50 border border-amber-200 p-2 rounded text-[11px] text-amber-900 flex items-start space-x-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Contextual Nuance:</strong> {item.nuance}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
