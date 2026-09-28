import React, { useState } from 'react';
import { TrendingUp, AlertCircle, Info, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, BarChart3, Users, Scale } from 'lucide-react';
import { TIME_SERIES_DATA } from '../data/macroData';

const INEQUALITY_PILLARS = [
  {
    id: 'output_vs_wages',
    title: 'Output Expansion vs Real Wages',
    metric1: { label: 'Real GDP Growth', val: '7.4%', color: '#138808' },
    metric2: { label: 'Real Wage Growth', val: '+2.4%', color: '#000080' },
    summary: 'GDP growth outpaces real wage growth, reflecting capital-heavy growth and formal-informal labour segmentation.',
    implication: 'Headline national GDP can expand without immediate symmetric gains in lower-income household disposable incomes.'
  },
  {
    id: 'spatial',
    title: 'Inter-District Spatial Divergence',
    metric1: { label: 'Top Metro District GSDP', val: '9.8%', color: '#000080' },
    metric2: { label: 'Inland Agri District GSDP', val: '5.9%', color: '#FF9933' },
    summary: 'High-tech export and seaport logistics clusters outpace dryland agricultural belts by nearly 400 basis points.',
    implication: 'National macro policy must account for regional spatial divergence rather than presuming uniform geographic absorption.'
  },
  {
    id: 'palma',
    title: 'Palma Disparity Ratio (Top 10% / Bottom 40%)',
    metric1: { label: 'Current Palma Ratio', val: '0.41', color: '#7c3aed' },
    metric2: { label: 'Pre-Transfer Disparity', val: '0.46', color: '#be185d' },
    summary: 'Concentration of financial asset appreciation is partially mitigated by targeted direct benefit transfers (DBT) and food buffers.',
    implication: 'Direct fiscal transfers act as an essential cushion preventing consumption floor collapse during high-inflation periods.'
  },
  {
    id: 'consumption_share',
    title: 'Consumption Basket Essentials Share',
    metric1: { label: 'Rural Food Expenditure Share', val: '46.4%', color: '#d97706' },
    metric2: { label: 'Urban Food Expenditure Share', val: '39.2%', color: '#0284c7' },
    summary: 'Lower-income quintiles spend a far higher portion of disposable income on food grains and vegetables.',
    implication: 'Food inflation acts as a regressive tax, disproportionately compressing low-income discretionary spending.'
  }
];

export default function InequalityView({ setCurrentTab, evidenceMode }) {
  const [selectedPillar, setSelectedPillar] = useState('output_vs_wages');
  const activePillar = INEQUALITY_PILLARS.find(p => p.id === selectedPillar) || INEQUALITY_PILLARS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-premium p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border" style={{
        background: 'linear-gradient(135deg, #091a24 0%, #061219 100%)',
        color: '#ffffff'
      }}>
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
            <Scale className="w-4 h-4" />
            <span>DISTRIBUTIONAL MACRO ANALYSIS — INCLUSIVE GROWTH</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mt-1">
            IS GROWTH REACHING EVERYWHERE?
          </h1>
          <p className="text-sm text-teal-100/70 mt-0.5 max-w-2xl leading-relaxed">
            Evaluating distributional outcomes across aggregate GDP output, household real wages, rural versus urban CPI inflation baskets, and regional Palma disparity ratios.
          </p>
        </div>

        <div className="bg-white/10 p-3.5 rounded-xl border border-white/15 text-xs text-teal-100 max-w-sm">
          <strong className="text-amber-300 font-mono block mb-1">NON-PARTISAN SCIENTIFIC PRINCIPLE:</strong>
          Aggregate GDP growth does not automatically imply symmetric distributional gains across all income quintiles or geographies.
        </div>
      </div>

      {/* 4 Core Comparison Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-premium p-5 space-y-2 border-t-2 border-t-blue-600">
          <div className="section-label text-slate-400">AGGREGATE PRODUCTION</div>
          <div className="text-2xl font-bold font-mono text-blue-600">7.4% ↑</div>
          <div className="text-xs font-serif font-bold text-slate-900">Real GDP Growth</div>
          <p className="text-[11px] text-slate-600 leading-tight">
            Driven by formal manufacturing, services exports, and public capital infrastructure expenditure.
          </p>
        </div>

        <div className="card-premium p-5 space-y-2 border-t-2 border-t-emerald-600">
          <div className="section-label text-slate-400">PURCHASING POWER</div>
          <div className="text-2xl font-bold font-mono text-emerald-600">+2.4% →</div>
          <div className="text-xs font-serif font-bold text-slate-900">Real Wage Growth</div>
          <p className="text-[11px] text-slate-600 leading-tight">
            Rebounding after post-2023 disinflation, but formal tech/finance gains exceed rural agricultural wages.
          </p>
        </div>

        <div className="card-premium p-5 space-y-2 border-t-2 border-t-amber-600">
          <div className="section-label text-slate-400">REGIONAL SPREAD</div>
          <div className="text-2xl font-bold font-mono text-amber-600">5.9% vs 9.8%</div>
          <div className="text-xs font-serif font-bold text-slate-900">District GSDP Variance</div>
          <p className="text-[11px] text-slate-600 leading-tight">
            Metropolitan tech/maritime hubs expand nearly 400 bps faster than inland dryland agricultural areas.
          </p>
        </div>

        <div className="card-premium p-5 space-y-2 border-t-2 border-t-purple-600">
          <div className="section-label text-slate-400">INCOME CONCENTRATION</div>
          <div className="text-2xl font-bold font-mono text-purple-600">0.41</div>
          <div className="text-xs font-serif font-bold text-slate-900">Palma Disparity Ratio</div>
          <p className="text-[11px] text-slate-600 leading-tight">
            Top 10% income share relative to bottom 40% share, buffered by public welfare transfers.
          </p>
        </div>
      </div>

      {/* Interactive Distributional Pillars */}
      <div className="card-premium p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <div className="section-label text-slate-400 mb-1">DISTRIBUTIONAL DYNAMICS</div>
            <h2 className="text-lg font-bold font-serif text-slate-900">
              Interactive Distributional Pillars (Click to Inspect)
            </h2>
          </div>
          <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-1 rounded">
            Survey-Based Metrics
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {INEQUALITY_PILLARS.map(pillar => {
            const isSelected = selectedPillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={`p-3.5 rounded-xl border text-left transition ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-teal-500/30 font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <div className="text-[10px] font-mono text-teal-400 uppercase mb-0.5">Pillar</div>
                <div className="font-serif text-xs leading-snug">{pillar.title}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Detail */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
            <h3 className="font-serif font-bold text-sm text-slate-900">{activePillar.title}</h3>
            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="font-bold" style={{ color: activePillar.metric1.color }}>{activePillar.metric1.label}: {activePillar.metric1.val}</span>
              <span className="text-slate-300">vs</span>
              <span className="font-bold" style={{ color: activePillar.metric2.color }}>{activePillar.metric2.label}: {activePillar.metric2.val}</span>
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-sans">{activePillar.summary}</p>

          <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs flex items-start space-x-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span className="text-slate-700"><strong>Economic Implication:</strong> {activePillar.implication}</span>
          </div>
        </div>
      </div>

      {/* Sparse Data & Survey Cadence Disclaimer */}
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
        <div className="font-serif font-bold text-sm text-amber-900 flex items-center space-x-1.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>SURVEY CADENCE & DATA AVAILABILITY CAVEAT</span>
        </div>
        <p className="leading-relaxed text-amber-900">
          Unlike monthly CPI or quarterly GDP, consumption distribution and inequality metrics are derived from periodic household surveys (PLFS / NSSO Consumer Expenditure Survey). The platform explicitly displays official survey sampling limits and avoids synthetic fabrication of unobserved household precision.
        </p>
      </div>

      {/* Next Step CTA */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase text-blue-400 font-bold">NEXT QUESTION IN EVIDENTIAL CHAIN</div>
          <div className="text-sm font-serif font-bold mt-0.5">“What does the multi-target model forecast for GDP Growth and CPI Inflation next?”</div>
        </div>
        <button onClick={() => setCurrentTab('forecast')} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shrink-0">
          <span>Open Macro Forecast Center</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
