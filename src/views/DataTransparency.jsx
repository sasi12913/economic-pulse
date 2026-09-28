import React, { useState } from 'react';
import { ShieldCheck, Database, GitBranch, ArrowRight, CheckCircle2, ChevronRight, Layers, FileText, RefreshCw, AlertCircle } from 'lucide-react';
import { DATA_METADATA_TABLE, DATA_VINTAGES } from '../data/modelMetrics';

const PIPELINE_STAGES = [
  {
    id: 'sources',
    name: 'DATA SOURCES',
    short: 'Official Ingestion',
    icon: Database,
    color: '#000080',
    title: '1. Official Statistical Agency Feeds',
    desc: 'Primary ingestion pipeline from national agencies with verified metadata tags.',
    details: [
      { key: 'Primary Providers', val: 'MOSPI (GDP, IIP), RBI (Monetary, Credit, FX), NSO (CPI), CMIE/PLFS (Labour), State DES (GSDP).' },
      { key: 'Release Schedules', val: 'Synchronized with official embargo schedules and press release bulletins.' },
      { key: 'Provenance Tracking', val: 'Every observation is stamped with source URL, release document hash, and ingestion timestamp.' }
    ]
  },
  {
    id: 'validation',
    name: 'VALIDATION',
    short: 'Outlier & Anomaly Test',
    icon: ShieldCheck,
    color: '#138808',
    title: '2. Automated Statistical Schema & Outlier Testing',
    desc: 'Sanity checks against historical statistical bounds and structural schema constraints.',
    details: [
      { key: 'Range & Outlier Bounds', val: 'Z-score check against 10-year rolling variance bounds (threshold: |Z| > 3.5 flags manual inspection).' },
      { key: 'Schema Verification', val: 'Strict data contract typing (datetime format, unit scale, non-negative bounds for price indices).' },
      { key: 'Revision Flagging', val: 'Automatic diffing against prior vintage values to track official data revision magnitudes.' }
    ]
  },
  {
    id: 'harmonisation',
    name: 'HARMONISATION',
    short: 'Alignment & Base Years',
    icon: RefreshCw,
    color: '#FF9933',
    title: '3. Frequency Harmonisation & Chaining',
    desc: 'Standardizing disparate time frequencies and historical base-year splicing.',
    details: [
      { key: 'Frequency Alignment', val: 'Aggregation of high-frequency monthly series (CPI, IIP) to quarterly cadence for multi-variate modeling.' },
      { key: 'Base-Year Handling', val: 'Splicing historical series (e.g. 2004-05 base to 2011-12 base) using geometric link factors.' },
      { key: 'Unit Conversion', val: 'Real terms vs Nominal terms conversion using implicit price deflators (IPD).' },
      { key: 'Missing Values Protocol', val: 'Zero synthetic fabrication. When district or state data is sparse, explicit unavailable flags are rendered.' }
    ]
  },
  {
    id: 'features',
    name: 'FEATURE ENGINEERING',
    short: 'Lag & Rolling Signals',
    icon: Layers,
    color: '#7c3aed',
    title: '4. Time-Aware Feature Store Creation',
    desc: 'Purged, embargoed feature calculation to prevent future data leakage.',
    details: [
      { key: 'Lag Structures', val: 'Lags t-1, t-2, t-4 (annual base), and t-12 (seasonal month) calculated on historical vintages only.' },
      { key: 'Rolling Volatilities', val: '3-month and 12-month rolling standard deviations for commodity prices and exchange rates.' },
      { key: 'Cross-Indicator Terms', val: 'Real wage spread (Nominal wage growth minus CPI), Real interest rate (Repo minus core CPI).' }
    ]
  },
  {
    id: 'model',
    name: 'MODEL TRAINING',
    short: 'Multi-Model Benchmark',
    icon: GitBranch,
    color: '#0284c7',
    title: '5. Empirical Validation & Benchmarking',
    desc: 'Evaluating statistical baselines (ARIMA/VAR) against ML (XGBoost) and DL (TFT).',
    details: [
      { key: 'Time-Based Validation', val: 'Expanding window walk-forward validation (never random k-fold) to respect temporal ordering.' },
      { key: 'Evaluation Metrics', val: 'Root Mean Squared Error (RMSE), Mean Absolute Error (MAE), and 80% Quantile Coverage.' },
      { key: 'Production Rule', val: 'Model selection governed by out-of-sample generalization — never theoretical model complexity.' }
    ]
  },
  {
    id: 'explainability',
    name: 'EXPLAINABILITY',
    short: 'SHAP & Uncertainty',
    icon: FileText,
    color: '#be185d',
    title: '6. XAI & Quantile Uncertainty Bands',
    desc: 'TreeSHAP decomposition and probabilistic prediction interval calculation.',
    details: [
      { key: 'SHAP Attribution', val: 'Decomposes model prediction delta relative to historical mean into percentage feature contributions.' },
      { key: 'Uncertainty Interval', val: 'Empirical quantile loss bands (P10, P50, P90) widening as forecast horizon expands.' },
      { key: 'Scientific Rule', val: 'Strict disclaimer that feature importance reflects model association, not real-world causal proof.' }
    ]
  },
  {
    id: 'user',
    name: 'USER INTERACTION',
    short: 'Non-Partisan Terminal',
    icon: CheckCircle2,
    color: '#138808',
    title: '7. Non-Partisan Economic Intelligence UI',
    desc: 'Objective research platform aiding human comprehension without political scores.',
    details: [
      { key: 'Zero Political Scoring', val: 'No single "good/bad" score; encourages understanding complex macroeconomic trade-offs.' },
      { key: 'Evidence Mode Toggle', val: 'Allows committee members and researchers to inspect exact methodologies and data vintages.' }
    ]
  }
];

export default function DataTransparency({ setCurrentTab, evidenceMode }) {
  const [activeStageId, setActiveStageId] = useState('harmonisation');
  const activeStage = PIPELINE_STAGES.find(s => s.id === activeStageId) || PIPELINE_STAGES[2];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-premium p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border" style={{
        background: 'linear-gradient(135deg, #091a10 0%, #06140b 100%)',
        color: '#ffffff'
      }}>
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>MODEL & DATA TRANSPARENCY PIPELINE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mt-1">
            Data Sources, Vintages & Harmonisation Pipeline
          </h1>
          <p className="text-sm text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
            Full transparency into official statistical agencies, frequency harmonisation, base-year adjustments, and reproducible data revision cycles.
          </p>
        </div>

        <div className="bg-white/10 p-3.5 rounded-xl border border-white/15 text-xs text-slate-200 max-w-sm">
          <strong className="text-emerald-300 font-mono block mb-1">DATA GOVERNANCE STANDARD:</strong>
          Every statistic is tied to an immutable release vintage tag to ensure 100% reproducible research audits.
        </div>
      </div>

      {/* Interactive Pipeline Stages Banner */}
      <div className="card-premium p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <div className="section-label text-slate-400 mb-1">END-TO-END DATA ARCHITECTURE</div>
            <h2 className="text-lg font-bold font-serif text-slate-900">
              Interactive Data Lifecycle Pipeline (Click Any Stage to Inspect)
            </h2>
          </div>
          <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-1 rounded">
            Click Stage for Breakdown
          </span>
        </div>

        {/* Pipeline Steps Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {PIPELINE_STAGES.map((st, i) => {
            const isSelected = activeStageId === st.id;
            const Icon = st.icon;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStageId(st.id)}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-blue-500/30'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <div>
                  <div className="text-[9px] font-mono font-bold uppercase text-slate-400">Step {i + 1}</div>
                  <div className="font-serif font-bold text-xs mt-0.5 leading-snug">{st.name}</div>
                </div>
                <div className="mt-2 flex items-center space-x-1.5 text-[10px] font-mono" style={{ color: isSelected ? '#38bdf8' : st.color }}>
                  <Icon className="w-3 h-3 shrink-0" />
                  <span className="truncate">{st.short}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-blue-600">INSPECTING STAGE METHODOLOGY</span>
              <h3 className="text-base font-bold font-serif text-slate-900 mt-0.5">{activeStage.title}</h3>
            </div>
            <span className="text-xs font-mono bg-white text-slate-700 px-3 py-1 rounded border border-slate-200">
              {activeStage.desc}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {activeStage.details.map((d, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-mono font-bold text-slate-900 uppercase text-[10px]">{d.key}</span>
                <p className="text-slate-600 leading-relaxed">{d.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Vintage Releases */}
      <div className="card-premium p-6 space-y-4">
        <div className="text-xs font-mono font-bold uppercase text-slate-400">DATA VINTAGE & REVISION PIPELINE</div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {DATA_VINTAGES.map((v, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="text-[10px] font-mono font-bold text-blue-600 uppercase">{v.timestamp}</div>
              <div className="font-serif font-bold text-slate-900 leading-snug">{v.stage}</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Data Registry Table */}
      <div className="card-premium p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono font-bold uppercase text-slate-400">OFFICIAL INDICATOR REGISTRY & SOURCES</div>
            <h3 className="text-base font-bold font-serif text-slate-900">Verified Statistical Agency Metadata</h3>
          </div>
          <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded border border-emerald-200 font-bold">
            100% Traceable Metadata
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-mono text-[11px]">
                <th className="p-3">Indicator</th>
                <th className="p-3">Source Agency</th>
                <th className="p-3">Frequency</th>
                <th className="p-3">Unit</th>
                <th className="p-3">Revision Status</th>
                <th className="p-3">Coverage Window</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DATA_METADATA_TABLE.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-900 font-serif">{row.indicator}</td>
                  <td className="p-3 text-slate-700">{row.source}</td>
                  <td className="p-3 font-mono text-slate-600">{row.frequency}</td>
                  <td className="p-3 font-mono text-slate-600">{row.unit}</td>
                  <td className="p-3 font-mono text-emerald-600 font-bold">{row.revisionStatus}</td>
                  <td className="p-3 font-mono text-slate-500">{row.coverage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Next Step CTA */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase text-blue-400 font-bold">NEXT QUESTION IN EVIDENTIAL CHAIN</div>
          <div className="text-sm font-serif font-bold mt-0.5">“How does the system adapt to structural breaks and continuous data releases?”</div>
        </div>
        <button onClick={() => setCurrentTab('adaptive')} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shrink-0">
          <span>Open Adaptive Engine</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
