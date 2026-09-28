import React, { useState } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, Legend, ReferenceLine
} from 'recharts';
import {
  GitBranch, ShieldAlert, ArrowRight, Info, CheckCircle2, AlertTriangle,
  TrendingUp, TrendingDown, Cpu, Sliders, Layers, RefreshCw, BarChart3,
  ExternalLink, ChevronRight, Zap, Eye
} from 'lucide-react';
import {
  GDP_FORECAST_DATA,
  CPI_FORECAST_DATA,
  MACRO_ECOSYSTEM_CATEGORIES,
  GROWTH_VS_INFLATION_TIMELINE,
  TRANSMISSION_REGIMES
} from '../data/forecastingData';
import { MODEL_BENCHMARK_MATRIX } from '../data/modelMetrics';

const MODEL_META = {
  tft: { name: 'Temporal Fusion Transformer (TFT)', shortName: 'TFT Attention (DL)', type: 'Deep Learning', color: '#000080', description: 'Multi-horizon self-attention architecture with interpretable feature weights and quantile prediction intervals.' },
  xgb: { name: 'XGBoost Regressor', shortName: 'XGBoost (ML)', type: 'Machine Learning', color: '#FF9933', description: 'Gradient boosted decision trees optimized for non-linear macroeconomic tabular feature interactions.' },
  rf: { name: 'Random Forest Regressor', shortName: 'Random Forest (ML)', type: 'Machine Learning', color: '#138808', description: 'Ensemble bagging trees with high tabular stability and TreeSHAP explainability.' },
  lstm: { name: 'LSTM Recurrent Network', shortName: 'LSTM Recurrent (DL)', type: 'Deep Learning', color: '#7c3aed', description: 'Sequential memory network capturing persistent multi-quarter temporal momentum and lag structures.' },
  arima: { name: 'ARIMA / VAR Baseline', shortName: 'ARIMA/VAR (Statistical)', type: 'Statistical Baseline', color: '#64748b', description: 'Linear autoregressive integrated benchmark with classical lag differencing.' }
};

const CustomForecastTooltip = ({ active, payload, label, unit }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '12px 14px', minWidth: '190px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }}>
      <div className="text-[11px] font-mono text-slate-400 mb-2 border-b border-slate-700 pb-1 flex items-center justify-between">
        <span>{label}</span>
        {label?.includes('(F)') && <span className="text-amber-400 text-[9px] font-bold uppercase tracking-wider">Forecast Horizon</span>}
      </div>
      {payload.filter(e => e.value != null && !e.name.includes('Bound')).map((entry, i) => (
        <div key={i} className="flex items-center justify-between space-x-3 text-xs mb-1">
          <span style={{ color: entry.color || '#94a3b8' }} className="font-medium text-[11px]">{entry.name}</span>
          <span className="font-bold text-white font-mono">{typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}{unit}</span>
        </div>
      ))}
      {payload.find(e => e.dataKey === 'lower80') && payload.find(e => e.dataKey === 'upper80') && (
        <div className="mt-2 pt-1.5 border-t border-slate-700/60 text-[10px] font-mono text-slate-400 flex items-center justify-between">
          <span>80% Interval:</span>
          <span className="text-amber-300 font-semibold">
            {payload.find(e => e.dataKey === 'lower80')?.value?.toFixed(1)}{unit} – {payload.find(e => e.dataKey === 'upper80')?.value?.toFixed(1)}{unit}
          </span>
        </div>
      )}
    </div>
  );
};

const CustomCrossTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '12px', minWidth: '200px' }}>
      <div className="text-[11px] font-mono text-slate-400 mb-1.5">{label}</div>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between space-x-3 text-xs mb-1">
          <span style={{ color: entry.color }} className="font-medium">{entry.name}</span>
          <span className="font-bold text-white font-mono">{typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}%</span>
        </div>
      ))}
    </div>
  );
};

export default function ForecastView({ setCurrentTab, evidenceMode }) {
  // Target 1: GDP, Target 2: CPI Inflation
  const [selectedTarget, setSelectedTarget] = useState('gdp');
  const [selectedModel, setSelectedModel] = useState('tft');
  const [selectedHorizon, setSelectedHorizon] = useState('4Q');
  const [benchmarkFilter, setBenchmarkFilter] = useState('all'); // 'all', 'gdp', 'cpi'
  const [selectedRegime, setSelectedRegime] = useState('demand_pull');
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [showAlternativeModels, setShowAlternativeModels] = useState(false);

  const activeTargetData = selectedTarget === 'gdp' ? GDP_FORECAST_DATA : CPI_FORECAST_DATA;
  const modelMeta = MODEL_META[selectedModel] || MODEL_META.tft;
  const currentHorizonObj = activeTargetData.horizons.find(h => h.id === selectedHorizon) || activeTargetData.horizons[2];

  // Target theme styling
  const isGdp = selectedTarget === 'gdp';
  const targetTheme = isGdp ? {
    primary: '#138808',
    primaryLight: 'rgba(19, 136, 8, 0.08)',
    primaryBorder: 'rgba(19, 136, 8, 0.25)',
    bannerGrad: 'linear-gradient(135deg, #092c15 0%, #061e0e 50%, #0a1628 100%)',
    accentText: '#34d399',
    tag: 'TARGET 1 — OUTPUT & REAL GROWTH'
  } : {
    primary: '#FF9933',
    primaryLight: 'rgba(255, 153, 51, 0.08)',
    primaryBorder: 'rgba(255, 153, 51, 0.25)',
    bannerGrad: 'linear-gradient(135deg, #3d1c02 0%, #291300 50%, #0a1628 100%)',
    accentText: '#fbbf24',
    tag: 'TARGET 2 — PRICE STABILITY & PURCHASING POWER'
  };

  // Filter benchmark matrix
  const filteredBenchmarks = MODEL_BENCHMARK_MATRIX.filter(b => {
    if (benchmarkFilter === 'gdp') return b.target === 'gdp';
    if (benchmarkFilter === 'cpi') return b.target === 'cpi';
    return true;
  });

  return (
    <div className="space-y-8">
      {/* ── 1. HERO FORECAST CENTER HEADER ── */}
      <div className="relative overflow-hidden rounded-2xl" style={{ background: targetTheme.bannerGrad }}>
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="h-0.5 w-32 rounded-full" style={{
              background: 'linear-gradient(90deg, #FF9933 33.33%, #ffffff 33.33%, #ffffff 66.66%, #138808 66.66%)'
            }} />
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                DEMO DATA — RESEARCH PROTOTYPE
              </span>
              <span className="text-[10px] font-mono text-slate-300 hidden sm:inline">
                Time-Aware Out-of-Sample Validation
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider mb-1" style={{ color: targetTheme.accentText }}>
                MACROECONOMIC FORECAST CENTER — MULTI-TARGET PREDICTIVE SYSTEM
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                Multi-Indicator Macroeconomic Forecast Engine
              </h1>
              <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
                Uses the complete macroeconomic ecosystem to model and forecast both economic growth (<strong>GDP</strong>) and price stability (<strong>CPI Inflation</strong>), while explaining what the models learn, why forecasts move, and how uncertainty evolves over time.
              </p>
            </div>

            {/* Macroeconomic shared pipeline badge */}
            <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 text-xs text-slate-300 max-w-sm space-y-1.5 shrink-0">
              <div className="font-mono text-[10px] font-bold text-amber-300 uppercase flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>SHARED FEATURE ECOSYSTEM</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Models do NOT operate in isolated silos. GDP and Inflation models consume shared cross-indicator features: credit, trade, commodity prices, and monetary policy.
              </p>
            </div>
          </div>

          {/* ── PRIMARY TARGET SELECTOR ── */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-xs font-mono font-bold uppercase text-slate-400 mb-3 flex items-center justify-between">
              <span>SELECT PRIMARY FORECAST TARGET:</span>
              <span className="text-[11px] text-slate-400 font-normal">Active Target: <strong className="text-white">{activeTargetData.targetName}</strong></span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* TARGET 1: Real GDP Growth */}
              <button
                onClick={() => setSelectedTarget('gdp')}
                className={`p-4 rounded-xl border text-left transition relative overflow-hidden ${
                  selectedTarget === 'gdp'
                    ? 'bg-slate-900/90 border-emerald-500 shadow-lg shadow-emerald-950/40 ring-2 ring-emerald-500/30'
                    : 'bg-white/5 border-white/15 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded text-emerald-300 bg-emerald-950/80 border border-emerald-800">
                      TARGET 1 — OUTPUT & GROWTH
                    </span>
                    <h2 className="text-lg font-bold text-white mt-1.5 font-serif">
                      Real GDP Growth (% YoY)
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Nowcast (2026 Q2)</span>
                    <div className="text-2xl font-bold font-mono text-emerald-400">7.4%</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Next 1Q (Q3):</span>
                    <strong className="text-white">7.6%</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">4Q Out (2027):</span>
                    <strong className="text-emerald-300">8.1%</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">80% Interval:</span>
                    <strong className="text-amber-300">7.3%–8.8%</strong>
                  </div>
                </div>
              </button>

              {/* TARGET 2: CPI Inflation */}
              <button
                onClick={() => setSelectedTarget('cpi')}
                className={`p-4 rounded-xl border text-left transition relative overflow-hidden ${
                  selectedTarget === 'cpi'
                    ? 'bg-slate-900/90 border-amber-500 shadow-lg shadow-amber-950/40 ring-2 ring-amber-500/30'
                    : 'bg-white/5 border-white/15 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded text-amber-300 bg-amber-950/80 border border-amber-800">
                      TARGET 2 — PRICE STABILITY
                    </span>
                    <h2 className="text-lg font-bold text-white mt-1.5 font-serif">
                      CPI Inflation Rate (% YoY)
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Latest (2026 Q2)</span>
                    <div className="text-2xl font-bold font-mono text-amber-400">3.8%</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Next 1Q (Q3):</span>
                    <strong className="text-white">4.1%</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">4Q Out (2027):</span>
                    <strong className="text-amber-300">4.8%</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">80% Interval:</span>
                    <strong className="text-amber-300">4.0%–5.6%</strong>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. MANDATORY UNCERTAINTY GUARDRAIL ── */}
      <div className="card-premium p-4 rounded-xl border flex items-start space-x-3 bg-amber-50/70 border-amber-300/80 text-amber-950" role="alert">
        <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
        <div className="text-xs space-y-1">
          <div className="font-mono font-bold text-amber-900 uppercase text-[10px] tracking-wider">
            UNCERTAINTY PRINCIPLE: NEVER STATE "{activeTargetData.shortName.toUpperCase()} WILL BE X%"
          </div>
          <p className="leading-relaxed">
            Central point estimate for {currentHorizonObj.label}: <strong>{currentHorizonObj.forecast}{activeTargetData.unit}</strong> | Prediction Interval (80% confidence): <strong>{currentHorizonObj.lower80}{activeTargetData.unit} to {currentHorizonObj.upper80}{activeTargetData.unit}</strong>.
            Forecast uncertainty naturally expands as the prediction horizon stretches into multi-quarter periods. All predictions are conditional on model specifications, past observations, and macroeconomic stability assumptions.
          </p>
        </div>
      </div>

      {/* ── 3. MAIN FORECAST TRAJECTORY & MULTI-HORIZON CHART ── */}
      <div className="card-premium p-6 space-y-6">
        {/* Controls Bar: Model & Horizon Selectors */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="section-label text-slate-400 mb-1">
              MULTI-HORIZON TRAJECTORY & FAN CHART
            </div>
            <h2 className="text-xl font-bold font-serif text-slate-900">
              {activeTargetData.targetName} Trajectory with Prediction Intervals
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Historical Observed Actuals (2024 Q1 – 2026 Q2) versus Multi-Quarter Forecasts (2026 Q3 – 2028 Q2)
            </p>
          </div>

          {/* Model Selector */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {Object.entries(MODEL_META).map(([key, meta]) => (
              <button
                key={key}
                onClick={() => setSelectedModel(key)}
                className={`px-3 py-1.5 rounded-lg font-mono font-semibold transition ${
                  selectedModel === key
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title={meta.description}
              >
                {meta.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Horizon selector buttons & Model comparison toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-slate-500 text-[11px] font-bold uppercase">Target Horizon:</span>
            <div className="flex items-center space-x-1">
              {activeTargetData.horizons.map(h => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHorizon(h.id)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition ${
                    selectedHorizon === h.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {h.id} ({h.forecast}%)
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAlternativeModels(v => !v)}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded border text-xs font-mono transition ${
                showAlternativeModels
                  ? 'bg-purple-100 border-purple-300 text-purple-900 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showAlternativeModels ? 'Hide Alternative Model Lines' : 'Overlay ARIMA/XGB/LSTM Lines'}</span>
            </button>

            <span className="text-[10px] font-mono uppercase bg-slate-200 text-slate-700 px-2 py-1 rounded">
              Active: {modelMeta.name}
            </span>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeTargetData.timeline} margin={{ top: 15, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {/* 95% Band Gradient */}
                <linearGradient id="band95" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isGdp ? '#138808' : '#FF9933'} stopOpacity={0.12} />
                  <stop offset="95%" stopColor={isGdp ? '#138808' : '#FF9933'} stopOpacity={0.03} />
                </linearGradient>
                {/* 80% Band Gradient */}
                <linearGradient id="band80" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isGdp ? '#138808' : '#FF9933'} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={isGdp ? '#138808' : '#FF9933'} stopOpacity={0.08} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis
                domain={isGdp ? [5.0, 11.0] : [2.0, 7.5]}
                tick={{ fontSize: 10, fill: '#64748b' }}
                label={{ value: activeTargetData.unit, angle: -90, position: 'insideLeft', style: { fontSize: '10px', fill: '#94a3b8' } }}
              />
              <Tooltip content={<CustomForecastTooltip unit={activeTargetData.unit} />} />
              <Legend wrapperStyle={{ paddingTop: '12px', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }} />

              {/* 95% Interval Band */}
              <Area type="monotone" dataKey="upper95" name="95% Uncertainty Bound" stroke="none" fill="url(#band95)" />
              <Area type="monotone" dataKey="lower95" name="Lower 95% Bound" stroke="none" fill="#ffffff" fillOpacity={1} />

              {/* 80% Interval Band */}
              <Area type="monotone" dataKey="upper80" name="80% Uncertainty Bound" stroke="none" fill="url(#band80)" />
              <Area type="monotone" dataKey="lower80" name="Lower 80% Bound" stroke="none" fill="#ffffff" fillOpacity={1} />

              {/* Historical Observed Actuals */}
              <Area
                type="monotone"
                dataKey="actual"
                name={`Observed Historical ${activeTargetData.shortName}`}
                stroke={isGdp ? '#138808' : '#d97706'}
                strokeWidth={3}
                fill="none"
                dot={{ r: 3.5, fill: isGdp ? '#138808' : '#d97706' }}
                activeDot={{ r: 6 }}
              />

              {/* Model Central Point Forecast Trajectory */}
              <Area
                type="monotone"
                dataKey="forecast"
                name={`${modelMeta.shortName} Central Forecast`}
                stroke={isGdp ? '#000080' : '#b45309'}
                strokeWidth={3}
                strokeDasharray="5 4"
                fill="none"
                dot={{ r: 4, fill: isGdp ? '#000080' : '#b45309' }}
                activeDot={{ r: 7 }}
              />

              {/* Optional alternative model lines */}
              {showAlternativeModels && (
                <>
                  <Line type="monotone" dataKey="arima" name="ARIMA Baseline" stroke="#64748b" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
                  <Line type="monotone" dataKey="xgb" name="XGBoost" stroke="#0284c7" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                  <Line type="monotone" dataKey="lstm" name="LSTM Recurrent" stroke="#7c3aed" strokeWidth={1.5} strokeDasharray="2 2" dot={false} />
                </>
              )}

              {/* "NOW" vertical divider */}
              <ReferenceLine
                x="2026 Q2"
                stroke="#dc2626"
                strokeWidth={2}
                strokeDasharray="4 4"
                label={{
                  value: 'NOW (2026 Q2)',
                  position: 'top',
                  fill: '#dc2626',
                  fontSize: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 'bold'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 4-Quarters Ahead Summary Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {activeTargetData.horizons.map(h => (
            <div
              key={h.id}
              onClick={() => setSelectedHorizon(h.id)}
              className={`p-3 rounded-xl border text-center cursor-pointer transition ${
                selectedHorizon === h.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-blue-500/30'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <div className="text-[10px] font-mono uppercase font-bold text-slate-400">{h.label}</div>
              <div className="text-xl font-bold font-mono mt-1" style={{ color: selectedHorizon === h.id ? '#60a5fa' : isGdp ? '#138808' : '#d97706' }}>
                {h.forecast}{activeTargetData.unit}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                80%: {h.lower80}–{h.upper80}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. TARGET-SPECIFIC SHAP EXPLAINABILITY (XAI) ── */}
      <div className="card-premium p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="section-label text-slate-400 mb-1">
              MODEL EXPLAINABILITY & FEATURE CONTRIBUTIONS (SHAP)
            </div>
            <h2 className="text-xl font-bold font-serif text-slate-900">
              Why Did the Model Generate This {activeTargetData.shortName} Forecast?
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Decomposing statistical feature importance and directional attribution from the multi-variate ML/DL pipeline.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
              Method: TreeSHAP / Gradient Attribution
            </span>
          </div>
        </div>

        {/* Causality guardrail alert */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Scientific Guardrail:</strong> SHAP values quantify statistical feature association within the trained model weights. Feature importance does <em>not</em> prove deterministic real-world causation.
          </span>
        </div>

        {/* Feature Attribution List */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold uppercase text-slate-500">
            KEY PREDICTIVE FEATURE CONTRIBUTIONS (% OF MODEL PREDICTION VARIANCE):
          </div>

          <div className="space-y-2.5">
            {activeTargetData.shapAttributions.map((item, idx) => {
              const isExpanded = expandedFeature === idx;
              const isUpward = item.direction === 'upward';
              return (
                <div
                  key={idx}
                  onClick={() => setExpandedFeature(isExpanded ? null : idx)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer ${
                    isExpanded
                      ? 'bg-slate-50 border-blue-400 shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isUpward ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {isUpward ? '▲ Upward Pressure' : '▼ Downward Drag'}
                      </span>
                      <span className="font-serif font-bold text-sm text-slate-900">
                        {item.feature}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-bold text-sm" style={{ color: isUpward ? '#e11d48' : '#059669' }}>
                        {item.percentage}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>

                  {/* Contribution bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isUpward ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: item.percentage }}
                    />
                  </div>

                  {/* Expanded Detail */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-200 text-xs space-y-1.5">
                      <p className="text-slate-700 leading-relaxed font-sans">
                        <strong>Economic Mechanism:</strong> {item.details}
                      </p>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                        <span>Numerical Vector Weight: {item.contribution > 0 ? `+${item.contribution}` : item.contribution}</span>
                        <span className="text-blue-600">Model-based correlation, not causal proof</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Narrative Economic Explanation Block */}
        <div className="p-5 bg-slate-900 text-white rounded-xl space-y-3">
          <div className="font-mono text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Info className="w-4 h-4 text-teal-400" />
            <span>ECONOMIC EXPLANATION LAYER — CONTEXT & IMPLICATIONS</span>
          </div>

          <div className="space-y-2 text-xs leading-relaxed">
            <p>
              <strong className="text-amber-300 font-serif text-sm block mb-1">What the Model Sees:</strong>
              {activeTargetData.explanation.what}
            </p>
            <p>
              <strong className="text-amber-300 font-serif text-sm block mb-1">Why Variables Are Moving:</strong>
              {activeTargetData.explanation.why}
            </p>
            <p>
              <strong className="text-amber-300 font-serif text-sm block mb-1">So What for Households and Enterprises:</strong>
              {activeTargetData.explanation.soWhat}
            </p>
            <div className="p-2.5 rounded bg-slate-800 text-[11px] text-slate-300 border border-slate-700 italic">
              <strong>Caveat & Tail-Risks:</strong> {activeTargetData.explanation.caveat}
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. SHARED MACROECONOMIC INPUT ECOSYSTEM ── */}
      <div className="card-premium p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="section-label text-slate-400 mb-1">
              MACROECONOMIC INPUT ECOSYSTEM (FEATURE REPOSITORY)
            </div>
            <h2 className="text-xl font-bold font-serif text-slate-900">
              The Economy as an Interconnected Feature Network
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              The forecasting engine consumes 6 macroeconomic categories to build lagged, rolling, and interaction features.
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-800 px-3 py-1 rounded border border-blue-200 font-bold">
            6 Pillars · 35+ Integrated Series
          </span>
        </div>

        {/* Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MACRO_ECOSYSTEM_CATEGORIES.map(category => (
            <div key={category.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: category.color }} />
                  <span>{category.title}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">{category.indicators.length} Variables</span>
              </div>

              <p className="text-[11px] text-slate-600 leading-tight">
                {category.description}
              </p>

              <div className="space-y-1.5 pt-1 border-t border-slate-200 text-xs">
                {category.indicators.map((ind, i) => (
                  <div key={i} className="flex items-center justify-between py-0.5">
                    <span className="text-slate-700 truncate max-w-[170px]" title={ind.name}>{ind.name}</span>
                    <div className="flex items-center space-x-1.5 font-mono text-[11px]">
                      <span className="font-bold text-slate-900">{ind.value}</span>
                      <span className="text-[9px] text-slate-400">({ind.freq[0]})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. CROSS-INDICATOR VIEW: "GROWTH VS PRICE STABILITY" ── */}
      <div className="card-premium p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="section-label text-slate-400 mb-1">
              CROSS-INDICATOR HARMONIZATION
            </div>
            <h2 className="text-xl font-bold font-serif text-slate-900">
              Growth vs Price Stability: GDP Growth ↔ CPI Inflation
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Evaluating output expansion alongside consumer price stability on a synchronized quarterly timeline.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-3 py-1 rounded border border-emerald-300 font-bold">
              Current Regime: Disinflationary Expansion
            </span>
          </div>
        </div>

        {/* Dual Axis Synchronized Timeline Chart */}
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={GROWTH_VS_INFLATION_TIMELINE} margin={{ top: 15, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis
                yAxisId="left"
                domain={[5.0, 9.0]}
                tick={{ fontSize: 10, fill: '#138808' }}
                label={{ value: 'Real GDP Growth (% YoY)', angle: -90, position: 'insideLeft', style: { fontSize: '10px', fill: '#138808' } }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[2.5, 7.0]}
                tick={{ fontSize: 10, fill: '#d97706' }}
                label={{ value: 'CPI Inflation (% YoY)', angle: 90, position: 'insideRight', style: { fontSize: '10px', fill: '#d97706' } }}
              />
              <Tooltip content={<CustomCrossTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }} />

              {/* GDP Actual & Forecast Lines */}
              <Line yAxisId="left" type="monotone" dataKey="gdp" name="Real GDP Growth (Observed)" stroke="#138808" strokeWidth={3} dot={{ r: 3.5, fill: '#138808' }} />
              <Line yAxisId="left" type="monotone" dataKey="gdpForecast" name="Real GDP Growth (Forecasted)" stroke="#138808" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 4, fill: '#138808' }} />

              {/* CPI Actual & Forecast Lines */}
              <Line yAxisId="right" type="monotone" dataKey="cpi" name="CPI Inflation (Observed)" stroke="#d97706" strokeWidth={3} dot={{ r: 3.5, fill: '#d97706' }} />
              <Line yAxisId="right" type="monotone" dataKey="cpiForecast" name="CPI Inflation (Forecasted)" stroke="#d97706" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 4, fill: '#d97706' }} />

              {/* Dividing reference line */}
              <ReferenceLine yAxisId="left" x="2026 Q2" stroke="#dc2626" strokeDasharray="3 3" label={{ value: 'NOW', position: 'top', fill: '#dc2626', fontSize: 10 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Interactive Economic Transmission Channels */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono font-bold uppercase text-slate-500">
            EXPLORE ECONOMIC TRANSMISSION PATHWAYS (GDP ↔ INFLATION):
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {TRANSMISSION_REGIMES.map(reg => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegime(reg.id)}
                className={`p-3 rounded-lg border text-left text-xs transition ${
                  selectedRegime === reg.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow font-bold'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-amber-400 mb-0.5">Channel</div>
                <div className="font-serif leading-snug">{reg.title.split(' (')[0]}</div>
              </button>
            ))}
          </div>

          {/* Active Regime Detail */}
          {(() => {
            const activeReg = TRANSMISSION_REGIMES.find(r => r.id === selectedRegime) || TRANSMISSION_REGIMES[0];
            return (
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-slate-900">{activeReg.title}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Non-Causal Modeled Pathway</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{activeReg.summary}</p>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 pt-1">
                  {activeReg.nodes.map((n, i) => (
                    <div key={i} className="p-2.5 rounded bg-white border border-slate-200 space-y-1">
                      <div className="font-mono text-[10px] font-bold text-blue-600 uppercase">{n.step}</div>
                      <p className="text-[11px] text-slate-600 leading-tight">{n.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ── 7. TARGET-AWARE MODEL BENCHMARK MATRIX ── */}
      <div className="card-premium p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="section-label text-slate-400 mb-1">EMPIRICAL MODEL VALIDATION MATRIX</div>
            <h2 className="text-xl font-bold font-serif text-slate-900">
              Statistical Baselines vs Machine Learning vs Deep Learning
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-target out-of-sample error benchmarking across historical test holdouts (2018–2024).
            </p>
          </div>

          {/* Target Filter */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setBenchmarkFilter('all')}
              className={`px-2.5 py-1 rounded font-mono font-semibold transition ${
                benchmarkFilter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Targets
            </button>
            <button
              onClick={() => setBenchmarkFilter('gdp')}
              className={`px-2.5 py-1 rounded font-mono font-semibold transition ${
                benchmarkFilter === 'gdp' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              GDP Growth
            </button>
            <button
              onClick={() => setBenchmarkFilter('cpi')}
              className={`px-2.5 py-1 rounded font-mono font-semibold transition ${
                benchmarkFilter === 'cpi' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CPI Inflation
            </button>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs" style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}>
            <thead>
              <tr className="bg-slate-900 text-white font-mono text-[11px]">
                <th className="p-3 rounded-l-lg">Target</th>
                <th className="p-3">Model Architecture</th>
                <th className="p-3">MAE</th>
                <th className="p-3">RMSE</th>
                <th className="p-3">MAPE</th>
                <th className="p-3">80% Coverage</th>
                <th className="p-3">Interpretability</th>
                <th className="p-3 rounded-r-lg">Primary Features Used</th>
              </tr>
            </thead>
            <tbody>
              {filteredBenchmarks.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition border-b border-slate-100">
                  <td className="p-3 font-mono font-bold">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      m.target === 'gdp' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {m.target.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900 font-serif text-[13px]">{m.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{m.type}</div>
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-800">{m.mae}</td>
                  <td className="p-3 font-mono text-slate-600">{m.rmse}</td>
                  <td className="p-3 font-mono text-slate-600">{m.mape}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">{m.coverage80}</td>
                  <td className="p-3 text-slate-700">{m.interpretability}</td>
                  <td className="p-3 text-slate-500 text-[11px] max-w-xs truncate" title={m.primaryFeatures}>
                    {m.primaryFeatures}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono text-center">
          💡 <strong>Guiding Principle:</strong> Model selection in research and production is governed strictly by out-of-sample empirical generalization (RMSE & Coverage) — not model complexity.
        </div>
      </div>

      {/* ── 8. NEXT QUESTION IN EVIDENTIAL CHAIN ── */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase text-blue-400 font-bold tracking-wider">
            NEXT QUESTION IN EVIDENTIAL CHAIN
          </div>
          <h3 className="text-lg font-serif font-bold text-white mt-1">
            "Where did the underlying data originate, and how are vintages harmonized?"
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Inspect data source registries, revision schedules, missing-data handling, and reproducible data pipeline stages in the Data Transparency engine.
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('transparency')}
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl text-xs font-semibold transition shrink-0 shadow-md"
        >
          <span>Inspect Data Transparency</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
