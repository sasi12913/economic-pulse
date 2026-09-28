import React, { useState, useCallback } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, Legend, ReferenceLine
} from 'recharts';
import { BarChart3, Info, BookOpen, ArrowRight, TrendingUp, TrendingDown, Zap, AlertCircle } from 'lucide-react';
import { TIME_SERIES_DATA } from '../data/macroData';

const METRIC_OPTIONS = [
  { id: 'gdp', name: 'Real GDP Growth', unit: '% YoY', color: '#138808', category: 'Output' },
  { id: 'cpi', name: 'CPI Inflation Rate', unit: '% YoY', color: '#FF9933', category: 'Prices' },
  { id: 'realWages', name: 'Real Wage Growth', unit: '% YoY', color: '#000080', category: 'Wages' },
  { id: 'unemployment', name: 'Unemployment Rate', unit: '%', color: '#dc2626', category: 'Labour' },
  { id: 'consumption', name: 'Consumption Index', unit: 'Base 100', color: '#7c3aed', category: 'Demand' },
  { id: 'repoRate', name: 'Policy Repo Rate', unit: '%', color: '#0891b2', category: 'Monetary' },
  { id: 'capEx', name: 'Public CapEx Growth', unit: '% YoY', color: '#059669', category: 'Fiscal' },
  { id: 'exports', name: 'Exports Index', unit: 'Base 100', color: '#d97706', category: 'External' },
  { id: 'fiscalDeficit', name: 'Fiscal Deficit', unit: '% GDP', color: '#be185d', category: 'Fiscal' },
];

const CONCEPT_EXPLANATIONS = {
  'gdp-realWages': {
    title: 'GDP vs Real Wages Divergence',
    observation: 'GDP growth outpaced real wage growth from 2021–2023 by a significant margin.',
    explanation: `During high-inflation periods, nominal wages may lag price increases, reducing real purchasing
power even as total economic output expands. This is the "GDP-wage divergence" — aggregate growth
does not automatically translate to household income gains.`,
    implication: 'High GDP growth is necessary but not sufficient for household welfare improvement.',
    tab: 'inequality',
  },
  'cpi-repoRate': {
    title: 'Inflation and Monetary Policy Response',
    observation: 'The repo rate rose from 4.0% to 6.5% between 2022-2023 as inflation exceeded target.',
    explanation: `The RBI responded to rising CPI inflation with a series of rate hikes. The lag between
rate decisions and inflation impact is typically 6-18 months, explaining why inflation persisted above
target even as rates rose.`,
    implication: 'Monetary tightening reduces demand-side pressure but cannot directly address supply-driven inflation.',
    tab: 'policy',
  },
  'default': {
    title: 'Indicator Relationship Analysis',
    observation: 'The selected indicators show varying co-movement patterns over the data period.',
    explanation: `Economic indicators interact through complex transmission mechanisms. Lead-lag relationships
and structural breaks can shift these patterns over time, requiring careful interpretation of correlation patterns.`,
    implication: 'Correlation between indicators does not establish causal direction.',
    tab: 'insights',
  },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: '#1a1a2e',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '10px',
        padding: '12px 14px',
        minWidth: '180px',
      }}
    >
      <div className="text-[11px] font-mono text-slate-400 mb-2">{label}</div>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between space-x-4 text-xs mb-1">
          <span style={{ color: entry.color }} className="font-medium">{entry.name?.split(' ')[0]}</span>
          <span className="font-bold text-white font-mono">{typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function EconomicExplorer({ setCurrentTab, evidenceMode }) {
  const [metric1, setMetric1] = useState('gdp');
  const [metric2, setMetric2] = useState('realWages');
  const [showConceptModal, setShowConceptModal] = useState(false);
  const [showObservation, setShowObservation] = useState(true);

  const metric1Obj = METRIC_OPTIONS.find(m => m.id === metric1);
  const metric2Obj = METRIC_OPTIONS.find(m => m.id === metric2);

  const conceptKey = `${metric1}-${metric2}`;
  const concept = CONCEPT_EXPLANATIONS[conceptKey] || CONCEPT_EXPLANATIONS[`${metric2}-${metric1}`] || CONCEPT_EXPLANATIONS.default;

  // Compute simple observation
  const latest = TIME_SERIES_DATA[TIME_SERIES_DATA.length - 1];
  const first = TIME_SERIES_DATA[0];
  const m1Change = latest[metric1] - first[metric1];
  const m2Change = latest[metric2] - first[metric2];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl" style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #1a1a2e 100%)',
      }}>
        <div className="p-6 md:p-8">
          <div className="h-0.5 w-24 mb-4 rounded-full" style={{
            background: 'linear-gradient(90deg, #138808 33%, rgba(255,255,255,0.4) 33%, rgba(255,255,255,0.4) 67%, #FF9933 67%)',
          }} />
          <div className="section-label mb-2" style={{ color: '#138808' }}>INTERACTIVE EXPLORER</div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            Compare Indicators on a Single Timeline
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">
            Select any two macroeconomic series to evaluate lead/lag dynamics, structural divergence and historical relationships.
          </p>
        </div>
      </div>

      {/* Indicator Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { metric: metric1, setMetric: setMetric1, metricObj: metric1Obj, axis: 'Primary (Left Axis)', borderColor: metric1Obj?.color },
          { metric: metric2, setMetric: setMetric2, metricObj: metric2Obj, axis: 'Secondary (Right Axis)', borderColor: metric2Obj?.color },
        ].map(({ metric, setMetric, metricObj, axis, borderColor }, i) => (
          <div
            key={i}
            className="card-premium p-4"
            style={{ borderLeft: `3px solid ${borderColor || '#e2e0db'}` }}
          >
            <div className="section-label text-slate-400 mb-2">{axis}</div>
            <select
              value={metric}
              onChange={e => setMetric(e.target.value)}
              className="w-full text-sm font-semibold text-slate-900 bg-transparent border-none outline-none cursor-pointer py-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {METRIC_OPTIONS.map(m => (
                <option key={m.id} value={m.id}>[{m.category}] {m.name} ({m.unit})</option>
              ))}
            </select>
            {metricObj && (
              <div className="mt-2 flex items-center space-x-3 text-xs">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: metricObj.color }}
                />
                <span className="text-slate-500 font-mono">{metricObj.unit}</span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ background: `${metricObj.color}15`, color: metricObj.color }}
                >
                  {metricObj.category}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-5 pb-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div>
            <div className="section-label text-slate-400 mb-1">TIME SERIES COMPARISON</div>
            <h3 className="text-base font-bold text-slate-900" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
              {metric1Obj?.name} vs {metric2Obj?.name}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">2021 Q1 – 2026 Q2</p>
          </div>
          <div className="flex items-center gap-2">
            {evidenceMode && (
              <div
                className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(0,0,128,0.06)', color: '#000080', border: '1px solid rgba(0,0,128,0.15)' }}
              >
                Sources: MOSPI · RBI · PLFS
              </div>
            )}
            <span
              className="text-[10px] font-mono px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,153,51,0.1)', color: '#92400e', border: '1px solid rgba(255,153,51,0.25)' }}
            >
              DEMO DATA
            </span>
          </div>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={TIME_SERIES_DATA}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(0,0,0,0.05)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 10, fill: metric1Obj?.color, fontFamily: "'JetBrains Mono', monospace" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 10, fill: metric2Obj?.color, fontFamily: "'JetBrains Mono', monospace" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: '16px', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey={metric1}
                name={metric1Obj?.name}
                stroke={metric1Obj?.color}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: metric1Obj?.color }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey={metric2}
                name={metric2Obj?.name}
                stroke={metric2Obj?.color}
                strokeWidth={2.5}
                strokeDasharray="5 4"
                dot={false}
                activeDot={{ r: 5, fill: metric2Obj?.color }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          {[
            { label: `${metric1Obj?.name} Latest`, value: latest[metric1]?.toFixed(1), unit: metric1Obj?.unit, color: metric1Obj?.color },
            { label: `${metric1Obj?.name} Change`, value: `${m1Change > 0 ? '+' : ''}${m1Change.toFixed(1)}`, unit: 'since 2021', color: m1Change > 0 ? '#138808' : '#dc2626' },
            { label: `${metric2Obj?.name} Latest`, value: latest[metric2]?.toFixed(1), unit: metric2Obj?.unit, color: metric2Obj?.color },
            { label: `${metric2Obj?.name} Change`, value: `${m2Change > 0 ? '+' : ''}${m2Change.toFixed(1)}`, unit: 'since 2021', color: m2Change > 0 ? '#138808' : '#dc2626' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.02)' }}>
              <div className="text-[10px] font-mono text-slate-400 mb-1 truncate">{stat.label}</div>
              <div className="text-xl font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{stat.unit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Automated Observation */}
      {showObservation && (
        <div
          className="rounded-2xl p-5 space-y-3"
          style={{ background: '#1a1a2e' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" style={{ color: '#FF9933' }} />
              <span className="section-label" style={{ color: '#FF9933' }}>
                MODEL-GENERATED OBSERVATION — WHAT CHANGED?
              </span>
            </div>
            <button onClick={() => setShowConceptModal(true)} className="text-xs font-mono text-slate-500 hover:text-slate-300 border border-slate-700 px-3 py-1 rounded-full transition">
              Learn concept
            </button>
          </div>

          <p className="text-sm font-medium text-white" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
            "{concept.observation}"
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            {concept.explanation}
          </p>

          <div
            className="flex items-start space-x-2 p-3 rounded-lg text-xs"
            style={{ background: 'rgba(255,153,51,0.1)', border: '1px solid rgba(255,153,51,0.2)' }}
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#FF9933' }} />
            <span style={{ color: '#fbbf24' }}>
              <strong>Possible implication:</strong> {concept.implication}
            </span>
          </div>

          <div className="flex items-center space-x-3 pt-1">
            <button
              onClick={() => setCurrentTab(concept.tab)}
              className="text-xs font-semibold flex items-center space-x-1 transition"
              style={{ color: '#138808' }}
            >
              <span>Explore deeper →</span>
            </button>
            <button
              onClick={() => setCurrentTab('claim')}
              className="text-xs text-slate-500 flex items-center space-x-1"
            >
              <span>Check related claims →</span>
            </button>
          </div>
        </div>
      )}

      {/* Concept Modal */}
      {showConceptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(3,3,15,0.7)', backdropFilter: 'blur(8px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div>
                <div className="section-label text-slate-400 mb-1">ECONOMIC CONCEPT</div>
                <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                  {concept.title}
                </h3>
              </div>
              <button onClick={() => setShowConceptModal(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed">{concept.explanation}</p>
              <div
                className="p-3 rounded-xl text-sm"
                style={{ background: 'rgba(19,136,8,0.06)', border: '1px solid rgba(19,136,8,0.15)', color: '#0e6606' }}
              >
                <strong>Key takeaway:</strong> {concept.implication}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => { setCurrentTab('claim'); setShowConceptModal(false); }}
                  className="text-xs font-semibold px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                >
                  Check Claims →
                </button>
                <button
                  onClick={() => setShowConceptModal(false)}
                  className="text-xs font-semibold px-4 py-2 rounded-lg text-white"
                  style={{ background: '#138808' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next CTA */}
      <div
        className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0d2040 100%)' }}
      >
        <div>
          <div className="section-label mb-1" style={{ color: '#7c3aed' }}>NEXT QUESTION IN EVIDENTIAL CHAIN</div>
          <p className="text-lg font-bold text-white" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
            "Why might these indicators be moving this way?"
          </p>
        </div>
        <button
          onClick={() => setCurrentTab('insights')}
          className="flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold text-white shrink-0 transition"
          style={{ background: '#7c3aed' }}
        >
          <span>Inspect AI Insights</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
