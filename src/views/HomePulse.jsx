import React, { useState, useEffect, useRef } from 'react';
import {
  Activity, Info, ShieldAlert, ArrowRight, TrendingUp,
  TrendingDown, Minus, ChevronDown, ChevronUp, AlertCircle,
  BookOpen, ExternalLink, Zap, Globe
} from 'lucide-react';
import { PULSE_DIMENSIONS } from '../data/macroData';
import Sparkline from '../components/Sparkline';

// ── ECONOMY SYSTEM GRAPH DATA ─────────────────────────────────────────────────
const ECONOMY_NODES = [
  { id: 'gdp', label: 'GDP Growth', x: 50, y: 50, color: '#138808', size: 22 },
  { id: 'inflation', label: 'Inflation', x: 85, y: 25, color: '#FF9933', size: 18 },
  { id: 'interest', label: 'Interest Rates', x: 85, y: 75, color: '#000080', size: 18 },
  { id: 'employment', label: 'Employment', x: 15, y: 25, color: '#138808', size: 18 },
  { id: 'wages', label: 'Real Wages', x: 15, y: 75, color: '#FF9933', size: 16 },
  { id: 'consumption', label: 'Consumption', x: 50, y: 15, color: '#7c3aed', size: 16 },
  { id: 'credit', label: 'Credit', x: 50, y: 85, color: '#000080', size: 16 },
  { id: 'investment', label: 'Investment', x: 28, y: 50, color: '#138808', size: 16 },
  { id: 'exports', label: 'Exports', x: 72, y: 50, color: '#FF9933', size: 14 },
  { id: 'inequality', label: 'Inequality', x: 28, y: 85, color: '#dc2626', size: 14 },
  { id: 'productivity', label: 'Productivity', x: 72, y: 15, color: '#7c3aed', size: 14 },
];

const ECONOMY_EDGES = [
  { from: 'interest', to: 'credit', strength: 'strong' },
  { from: 'credit', to: 'investment', strength: 'strong' },
  { from: 'investment', to: 'gdp', strength: 'strong' },
  { from: 'gdp', to: 'employment', strength: 'strong' },
  { from: 'employment', to: 'wages', strength: 'strong' },
  { from: 'wages', to: 'consumption', strength: 'strong' },
  { from: 'consumption', to: 'gdp', strength: 'medium' },
  { from: 'inflation', to: 'interest', strength: 'strong' },
  { from: 'wages', to: 'inflation', strength: 'medium' },
  { from: 'consumption', to: 'inflation', strength: 'medium' },
  { from: 'exports', to: 'gdp', strength: 'medium' },
  { from: 'productivity', to: 'gdp', strength: 'medium' },
  { from: 'productivity', to: 'wages', strength: 'medium' },
  { from: 'gdp', to: 'inequality', strength: 'weak' },
  { from: 'credit', to: 'consumption', strength: 'medium' },
];

const NODE_CONNECTIONS = {
  interest: {
    title: 'Interest Rates',
    description: 'The central bank repo rate influences the cost of borrowing across the economy.',
    flow: ['Interest Rates', '→ Borrowing Cost', '→ Credit Availability', '→ Investment & Consumption', '→ Aggregate Demand', '→ Inflation'],
    connected: ['credit', 'inflation', 'consumption', 'investment'],
  },
  inflation: {
    title: 'Inflation',
    description: 'The rate of price change affects purchasing power, wage demands, and monetary policy.',
    flow: ['Inflation', '→ Real Wages', '→ Consumption Power', '→ Demand Pressure', '→ Interest Rate Response'],
    connected: ['interest', 'wages', 'consumption', 'gdp'],
  },
  gdp: {
    title: 'GDP Growth',
    description: 'Total economic output integrates production across all sectors and regions.',
    flow: ['GDP Growth', '→ Employment', '→ Household Incomes', '→ Tax Revenues', '→ Fiscal Space'],
    connected: ['employment', 'consumption', 'investment', 'exports', 'inequality'],
  },
  employment: {
    title: 'Employment',
    description: 'Labour market conditions determine household income generation and demand dynamics.',
    flow: ['Employment', '→ Wage Levels', '→ Consumption', '→ Demand', '→ Output'],
    connected: ['wages', 'gdp', 'consumption'],
  },
  wages: {
    title: 'Real Wages',
    description: 'Purchasing power after inflation determines whether growth translates to household welfare.',
    flow: ['Real Wages', '→ Consumption', '→ Savings', '→ Aggregate Demand'],
    connected: ['consumption', 'inflation', 'employment', 'inequality'],
  },
  credit: {
    title: 'Credit',
    description: 'Bank lending amplifies or constrains investment and consumption.',
    flow: ['Credit Growth', '→ Investment', '→ Consumption', '→ Demand', '→ GDP'],
    connected: ['interest', 'investment', 'consumption', 'gdp'],
  },
  consumption: {
    title: 'Consumption',
    description: 'Private final consumption is India\'s largest demand component (~60% of GDP).',
    flow: ['Consumption', '→ Demand', '→ Production', '→ Employment', '→ Growth'],
    connected: ['wages', 'credit', 'inflation', 'gdp'],
  },
  investment: {
    title: 'Investment',
    description: 'Capital formation drives productive capacity and long-term growth potential.',
    flow: ['Investment', '→ Capital Stock', '→ Productivity', '→ Growth', '→ Wages'],
    connected: ['credit', 'gdp', 'productivity'],
  },
  exports: {
    title: 'Exports',
    description: 'External demand provides foreign exchange and supports domestic employment.',
    flow: ['Exports', '→ Foreign Exchange', '→ Currency Stability', '→ Import Cost', '→ Inflation'],
    connected: ['gdp', 'inflation', 'employment'],
  },
  inequality: {
    title: 'Inequality',
    description: 'Distribution of gains determines social sustainability of growth.',
    flow: ['Inequality', '→ Consumption Distribution', '→ Demand Composition', '→ Growth Quality'],
    connected: ['wages', 'gdp', 'consumption'],
  },
  productivity: {
    title: 'Productivity',
    description: 'Output per worker determines non-inflationary wage growth capacity.',
    flow: ['Productivity', '→ Real Wage Capacity', '→ Competitiveness', '→ Exports', '→ Growth'],
    connected: ['wages', 'gdp', 'exports'],
  },
};

function EconomySystemGraph({ setCurrentTab }) {
  const [activeNode, setActiveNode] = useState(null);
  const svgRef = useRef(null);
  const W = 600, H = 320;

  const getNodePos = (node) => ({
    x: (node.x / 100) * W,
    y: (node.y / 100) * H,
  });

  const isConnected = (nodeId) => {
    if (!activeNode) return true;
    const info = NODE_CONNECTIONS[activeNode];
    return nodeId === activeNode || (info?.connected || []).includes(nodeId);
  };

  const isActiveEdge = (edge) => {
    if (!activeNode) return false;
    return edge.from === activeNode || edge.to === activeNode;
  };

  const activeInfo = activeNode ? NODE_CONNECTIONS[activeNode] : null;

  return (
    <div className="card-premium p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="section-label text-slate-400 mb-1">Economic System</div>
          <h3 className="text-lg font-bold" style={{ fontFamily: "'Newsreader', Georgia, serif", color: '#1a1a2e' }}>
            HOW THE ECONOMY CONNECTS
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Hover or tap a node to see how it connects through the economic system.
          </p>
        </div>
        {activeNode && (
          <button
            onClick={() => setActiveNode(null)}
            className="text-xs font-mono text-slate-400 hover:text-slate-600 border border-slate-200 px-3 py-1.5 rounded-full transition"
          >
            Clear selection
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Graph */}
        <div className="lg:col-span-2">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto"
            style={{ maxHeight: '280px' }}
            role="img"
            aria-label="Economic system relationship diagram"
          >
            {/* Edges */}
            {ECONOMY_EDGES.map((edge, i) => {
              const from = ECONOMY_NODES.find(n => n.id === edge.from);
              const to = ECONOMY_NODES.find(n => n.id === edge.to);
              if (!from || !to) return null;
              const fp = getNodePos(from), tp = getNodePos(to);
              const active = isActiveEdge(edge);
              return (
                <line
                  key={i}
                  x1={fp.x} y1={fp.y}
                  x2={tp.x} y2={tp.y}
                  stroke={active ? '#FF9933' : '#e2e0db'}
                  strokeWidth={active ? 2 : 1}
                  strokeDasharray={active ? '6 3' : undefined}
                  opacity={activeNode && !active ? 0.15 : 0.7}
                  style={active ? { animation: 'edgeFlow 1.5s linear infinite' } : {}}
                  className={active ? 'active-edge' : ''}
                />
              );
            })}

            {/* Nodes */}
            {ECONOMY_NODES.map((node) => {
              const pos = getNodePos(node);
              const connected = isConnected(node.id);
              const isActive = node.id === activeNode;
              return (
                <g
                  key={node.id}
                  className={`economy-node ${!connected && activeNode ? 'dimmed' : ''} ${isActive ? 'active' : ''}`}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setActiveNode(n => n === node.id ? null : node.id)}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  role="button"
                  aria-label={`${node.label} - click to see connections`}
                >
                  <circle
                    r={node.size + 4}
                    fill={node.color}
                    opacity={0.1}
                  />
                  <circle
                    r={node.size}
                    fill={isActive ? node.color : '#ffffff'}
                    stroke={node.color}
                    strokeWidth={isActive ? 0 : 2}
                  />
                  {isActive && (
                    <circle r={node.size + 2} fill="none" stroke={node.color} strokeWidth="1.5" opacity="0.4" />
                  )}
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={isActive ? "9" : "8"}
                    fontWeight={isActive ? "700" : "600"}
                    fill={isActive ? '#ffffff' : node.color}
                    style={{ userSelect: 'none', fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {node.label.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-1">
          {activeInfo ? (
            <div className="space-y-4 animate-fadeIn page-enter">
              <div>
                <div className="section-label text-slate-400 mb-1">Selected Node</div>
                <h4 className="text-base font-bold" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                  {activeInfo.title}
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{activeInfo.description}</p>
              </div>

              {/* Transmission flow */}
              <div>
                <div className="section-label text-slate-400 mb-2">Transmission</div>
                <div className="space-y-1">
                  {activeInfo.flow.map((step, i) => (
                    <div
                      key={i}
                      className="flex items-center text-xs"
                      style={{ paddingLeft: i > 0 ? `${i * 8}px` : '0' }}
                    >
                      {i > 0 && (
                        <span className="text-slate-300 mr-1.5 flow-arrow inline-block">↓</span>
                      )}
                      <span
                        className={`font-${i === 0 ? 'bold' : 'medium'} ${i === 0 ? 'text-slate-900' : 'text-slate-600'}`}
                        style={i === 0 ? { color: '#FF9933' } : {}}
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentTab('explorer')}
                className="text-xs flex items-center space-x-1.5 font-semibold transition"
                style={{ color: '#138808' }}
              >
                <span>Explore in Economic Explorer</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-8 space-y-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,153,51,0.08)' }}
              >
                <Zap className="w-5 h-5" style={{ color: '#FF9933' }} />
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                The economy is a system,<br />not isolated numbers.
              </p>
              <p className="text-xs text-slate-400">
                Hover a node to see connections and transmission channels.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── UPGRADED PULSE CARD ────────────────────────────────────────────────────────
function PulseCard({ item, setCurrentTab, evidenceMode }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const getDirectionConfig = () => {
    if (item.direction === 'up') return {
      icon: TrendingUp,
      color: '#138808',
      bg: 'rgba(19,136,8,0.08)',
      border: 'rgba(19,136,8,0.2)',
      label: '↑ Rising',
    };
    if (item.direction === 'down') return {
      icon: TrendingDown,
      color: '#000080',
      bg: 'rgba(0,0,128,0.08)',
      border: 'rgba(0,0,128,0.2)',
      label: '↓ Falling',
    };
    return {
      icon: Minus,
      color: '#6b7280',
      bg: 'rgba(107,114,128,0.08)',
      border: 'rgba(107,114,128,0.2)',
      label: '→ Stable',
    };
  };

  const dc = getDirectionConfig();
  const DirIcon = dc.icon;

  const getLinkedTab = () => {
    const map = {
      growth: 'explorer',
      inflation: 'claim',
      employment: 'inequality',
      wages: 'inequality',
      consumption: 'explorer',
      fiscal: 'policy',
      monetary: 'policy',
      external: 'explorer',
      inequality: 'inequality',
      productivity: 'insights',
    };
    return map[item.id] || 'explorer';
  };

  return (
    <div
      className="pulse-card card-premium overflow-hidden flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? dc.border : undefined,
      }}
    >
      {/* Category accent bar */}
      <div
        style={{
          height: '2px',
          background: dc.color,
          opacity: hovered ? 1 : 0.3,
          transition: 'opacity 0.3s ease',
        }}
      />

      <div className="p-4 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 mr-2">
            <div
              className="section-label mb-1"
              style={{ color: dc.color }}
            >
              {item.category}
            </div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">
              {item.title}
            </h3>
          </div>
          <div className="shrink-0">
            <Sparkline
              data={item.sparkline}
              color={dc.color}
              height={40}
              width={90}
            />
          </div>
        </div>

        {/* Value display */}
        <div className="flex items-end justify-between mt-2">
          <div>
            <div
              className="text-2xl font-bold font-mono count-up"
              style={{ color: '#1a1a2e', letterSpacing: '-0.02em' }}
            >
              {item.value}
            </div>
            <div
              className="inline-flex items-center space-x-1 mt-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: dc.bg, color: dc.color }}
            >
              <DirIcon className="w-3 h-3" />
              <span>{dc.label} vs prev ({item.prevValue})</span>
            </div>
          </div>
        </div>

        {/* Level 1 — WHAT */}
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="section-label text-slate-400 mb-1">WHAT IS THIS?</div>
          <p className="text-xs text-slate-600 leading-relaxed">{item.level1}</p>
        </div>

        {/* Evidence mode extras */}
        {evidenceMode && (
          <div
            className="mt-3 p-2.5 rounded-lg text-[11px] font-mono"
            style={{ background: 'rgba(0,0,128,0.04)', border: '1px solid rgba(0,0,128,0.1)', color: '#000080' }}
          >
            <div className="font-bold mb-1">EVIDENCE MODE</div>
            <div>Source: MOSPI / RBI / PLFS (Demo Data)</div>
            <div className="mt-0.5 flex items-center space-x-2">
              <span
                className="badge-high text-[10px] font-bold px-1.5 py-0.5 rounded"
              >
                High Quality
              </span>
              <span className="text-slate-400">Quarterly revision cycle</span>
            </div>
          </div>
        )}
      </div>

      {/* Expandable section */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-4 py-2.5 flex items-center justify-between text-xs transition hover:bg-slate-50"
          aria-expanded={expanded}
        >
          <span className="flex items-center space-x-1.5 text-slate-500 font-medium">
            <Info className="w-3.5 h-3.5" style={{ color: dc.color }} />
            <span>{expanded ? 'Hide details' : 'Why this matters'}</span>
          </span>
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          )}
        </button>

        {expanded && (
          <div className="px-4 pb-4 pt-1 space-y-3 text-xs bg-slate-50">
            <div>
              <div className="section-label mb-1" style={{ color: '#000080' }}>WHY IS IT MOVING?</div>
              <p className="text-slate-700 leading-relaxed">{item.level2}</p>
            </div>
            <div>
              <div className="section-label mb-1" style={{ color: '#138808' }}>SO WHAT FOR HOUSEHOLDS?</div>
              <p className="text-slate-700 leading-relaxed font-medium">{item.level3}</p>
            </div>
            <div
              className="p-2.5 rounded-lg flex items-start space-x-2"
              style={{ background: 'rgba(255,153,51,0.08)', border: '1px solid rgba(255,153,51,0.2)' }}
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#FF9933' }} />
              <p className="text-[11px] leading-relaxed" style={{ color: '#92400e' }}>
                <strong>Contextual nuance:</strong> {item.nuance}
              </p>
            </div>
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setCurrentTab(getLinkedTab())}
                className="flex items-center space-x-1 text-[11px] font-semibold transition"
                style={{ color: '#138808' }}
              >
                <span>Explore deeper →</span>
              </button>
              <button
                onClick={() => setCurrentTab('claim')}
                className="flex items-center space-x-1 text-[11px] font-medium text-slate-500 hover:text-slate-700 transition"
              >
                <span>Check claims →</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── FOLLOW THE ECONOMY FEATURE ─────────────────────────────────────────────────
const ECONOMY_JOURNEY = {
  inflation: {
    label: 'Inflation',
    color: '#FF9933',
    steps: [
      { id: 'inflation', label: 'Inflation Rate', desc: 'The rate at which prices are rising', tab: 'pulse' },
      { id: 'food', label: 'Food Prices', desc: 'Largest weight in CPI basket for most households', tab: 'explorer' },
      { id: 'energy', label: 'Energy Costs', desc: 'Imported crude affects transport and production', tab: 'explorer' },
      { id: 'demand', label: 'Demand Pressure', desc: 'Consumer spending drives price levels', tab: 'explorer' },
      { id: 'rates', label: 'Interest Rates', desc: 'RBI responds to sustained inflation pressure', tab: 'policy' },
      { id: 'credit', label: 'Credit Tightening', desc: 'Higher rates reduce borrowing capacity', tab: 'policy' },
      { id: 'consumption', label: 'Consumption', desc: 'Households cut discretionary spending', tab: 'explorer' },
      { id: 'regional', label: 'Regional Impact', desc: 'Rural inflation patterns differ from urban', tab: 'regional' },
      { id: 'household', label: 'Household Experience', desc: 'Real wage purchasing power eroded', tab: 'inequality' },
    ],
  },
  gdp: {
    label: 'GDP Growth',
    color: '#138808',
    steps: [
      { id: 'gdp', label: 'GDP Growth Rate', desc: 'Total economic output change', tab: 'pulse' },
      { id: 'capex', label: 'Capital Investment', desc: 'Public and private capital formation', tab: 'explorer' },
      { id: 'services', label: 'Services Exports', desc: 'Software, GCC, and digital services', tab: 'explorer' },
      { id: 'employment', label: 'Job Creation', desc: 'GDP growth translates to labour demand', tab: 'pulse' },
      { id: 'wages', label: 'Wage Growth', desc: 'Employment drives nominal wage levels', tab: 'inequality' },
      { id: 'distribution', label: 'Distribution', desc: 'Who benefits from growth?', tab: 'inequality' },
      { id: 'regional', label: 'Regional Variation', desc: 'States grow at different rates', tab: 'regional' },
    ],
  },
  wages: {
    label: 'Real Wages',
    color: '#000080',
    steps: [
      { id: 'wages', label: 'Real Wage Growth', desc: 'Nominal wages minus inflation', tab: 'pulse' },
      { id: 'inflation', label: 'Inflation Effect', desc: 'Price rises erode purchasing power', tab: 'claim' },
      { id: 'formal', label: 'Formal vs Informal', desc: 'Tech/finance vs agricultural workers diverge', tab: 'inequality' },
      { id: 'productivity', label: 'Productivity Growth', desc: 'Long-run wages tied to productivity', tab: 'insights' },
      { id: 'household', label: 'Household Budget', desc: 'Real wage determines daily living standards', tab: 'inequality' },
    ],
  },
};

function FollowTheEconomy({ setCurrentTab }) {
  const [selectedJourney, setSelectedJourney] = useState('inflation');
  const [activeStep, setActiveStep] = useState(0);
  const journey = ECONOMY_JOURNEY[selectedJourney];

  useEffect(() => {
    setActiveStep(0);
  }, [selectedJourney]);

  const currentStep = journey.steps[activeStep];

  return (
    <div className="card-premium overflow-hidden">
      {/* Header */}
      <div
        className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          background: `linear-gradient(135deg, ${journey.color}08 0%, transparent 100%)`,
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div>
          <div
            className="section-label mb-1"
            style={{ color: journey.color }}
          >
            SIGNATURE FEATURE
          </div>
          <h3
            className="text-lg font-bold"
            style={{ fontFamily: "'Newsreader', Georgia, serif", color: '#1a1a2e' }}
          >
            FOLLOW THE ECONOMY
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Trace how one indicator connects through the entire economic system.
          </p>
        </div>
        {/* Journey selector */}
        <div className="flex items-center gap-2">
          {Object.entries(ECONOMY_JOURNEY).map(([key, j]) => (
            <button
              key={key}
              onClick={() => setSelectedJourney(key)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border transition"
              style={selectedJourney === key ? {
                background: j.color,
                color: '#ffffff',
                borderColor: j.color,
              } : {
                background: 'transparent',
                color: j.color,
                borderColor: `${j.color}40`,
              }}
            >
              {j.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Journey steps */}
        <div className="overflow-x-auto custom-scrollbar pb-2">
          <div className="flex items-start space-x-3 min-w-max">
            {journey.steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center journey-node"
                  style={{ minWidth: '80px' }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    style={idx === activeStep ? {
                      background: journey.color,
                      color: '#ffffff',
                      boxShadow: `0 0 0 3px ${journey.color}30`,
                    } : idx < activeStep ? {
                      background: `${journey.color}20`,
                      color: journey.color,
                      border: `1.5px solid ${journey.color}50`,
                    } : {
                      background: '#f8f7f4',
                      color: '#94a3b8',
                      border: '1.5px solid #e2e0db',
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div
                    className="text-[10px] font-mono text-center mt-1.5 leading-tight max-w-[70px]"
                    style={{ color: idx === activeStep ? journey.color : '#94a3b8' }}
                  >
                    {step.label}
                  </div>
                </button>
                {idx < journey.steps.length - 1 && (
                  <div
                    className="h-0.5 w-6 mt-4 shrink-0 transition-all"
                    style={{
                      background: idx < activeStep ? journey.color : '#e2e0db',
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Active step detail */}
        {currentStep && (
          <div
            className="mt-5 p-4 rounded-xl flex items-start justify-between gap-4"
            style={{
              background: `${journey.color}06`,
              border: `1px solid ${journey.color}20`,
            }}
          >
            <div>
              <div
                className="text-sm font-bold"
                style={{ fontFamily: "'Newsreader', Georgia, serif", color: journey.color }}
              >
                {currentStep.label}
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{currentStep.desc}</p>
            </div>
            <div className="flex flex-col items-end space-y-2 shrink-0">
              <button
                onClick={() => setCurrentTab(currentStep.tab)}
                className="text-xs font-semibold flex items-center space-x-1 transition"
                style={{ color: journey.color }}
              >
                <span>Explore</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <div className="flex space-x-1.5">
                {activeStep > 0 && (
                  <button
                    onClick={() => setActiveStep(s => s - 1)}
                    className="text-[11px] font-mono text-slate-400 hover:text-slate-600 border border-slate-200 px-2 py-1 rounded transition"
                  >
                    ← Back
                  </button>
                )}
                {activeStep < journey.steps.length - 1 && (
                  <button
                    onClick={() => setActiveStep(s => s + 1)}
                    className="text-[11px] font-mono px-2 py-1 rounded transition text-white"
                    style={{ background: journey.color }}
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── MAIN VIEW ─────────────────────────────────────────────────────────────────
export default function HomePulse({ setCurrentTab, selectedState, evidenceMode }) {
  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0d1a3a 50%, #0a1628 100%)',
        padding: '2px',
      }}>
        <div className="rounded-2xl p-6 md:p-8">
          {/* Tricolour line */}
          <div className="h-0.5 w-32 mb-5 rounded-full" style={{
            background: 'linear-gradient(90deg, #FF9933 33%, rgba(255,255,255,0.6) 33%, rgba(255,255,255,0.6) 67%, #138808 67%)',
          }} />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div
                className="section-label mb-2"
                style={{ color: 'rgba(255,153,51,0.8)' }}
              >
                LANDING DASHBOARD — MULTIDIMENSIONAL MACRO INTELLIGENCE
              </div>
              <h1
                className="text-3xl md:text-4xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Newsreader', Georgia, serif", letterSpacing: '0.02em' }}
              >
                ECONOMIC PULSE
              </h1>
              <p className="text-slate-300 text-base font-light mt-2">
                India's Economic Intelligence Layer
              </p>
              <p className="text-slate-400 text-sm mt-3 max-w-2xl leading-relaxed">
                Explore growth, prices, employment, financial conditions, inequality and regional
                differences through connected evidence.
              </p>
            </div>

            {/* Live data status */}
            <div
              className="rounded-xl p-4 space-y-3 shrink-0 min-w-[200px]"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="section-label" style={{ color: 'rgba(255,153,51,0.7)' }}>
                LIVE DATA STATUS
              </div>
              <div className="space-y-1.5">
                {[
                  { label: 'Official Observation', color: '#138808', dot: 'bg-emerald-400' },
                  { label: 'Model Estimate', color: '#7c3aed', dot: 'bg-purple-400' },
                  { label: 'Demonstration', color: '#FF9933', dot: 'bg-amber-400' },
                ].map(item => (
                  <div key={item.label} className="flex items-center space-x-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                    <span className="text-[11px] font-mono text-slate-300">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-1.5 pt-1">
                <span className="live-pulse" />
                <span className="text-xs font-mono text-slate-400">Updated: Sept 2026</span>
              </div>
            </div>
          </div>

          {/* Philosophy statement */}
          <div
            className="mt-6 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center space-x-2 text-slate-400">
              <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>
                <strong className="text-slate-300">Non-Partisan Scientific Guardrail:</strong> No single aggregate "economy score" — deliberately omitted to prevent oversimplified political judgements.
              </span>
            </div>
            <div
              className="text-[10px] font-mono px-2.5 py-1 rounded-full shrink-0"
              style={{ background: 'rgba(255,153,51,0.15)', color: '#FF9933', border: '1px solid rgba(255,153,51,0.2)' }}
            >
              RESEARCH PROTOTYPE v2.4
            </div>
          </div>
        </div>
      </div>

      {/* Demo Data Notice */}
      <div
        className="demo-banner px-4 py-3 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
      >
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 shrink-0" style={{ color: '#FF9933' }} />
          <span className="text-amber-900">
            <strong>DEMO DATA NOTICE:</strong> All time-series data are realistic synthetic demo datasets.
            Replace with official MOSPI/RBI/PLFS feeds in production.
          </span>
        </div>
        <div
          className="text-[10px] font-mono font-bold px-2.5 py-1 rounded shrink-0"
          style={{ background: 'rgba(255,153,51,0.2)', color: '#92400e' }}
        >
          DEMO — NOT OFFICIAL
        </div>
      </div>

      {/* 10-Dimension Economic Pulse Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="section-label text-slate-400 mb-1">10-DIMENSIONAL ANALYSIS</div>
            <h2
              className="text-xl font-bold"
              style={{ fontFamily: "'Newsreader', Georgia, serif", color: '#1a1a2e' }}
            >
              ECONOMIC PULSE GRID
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:block">
            Hover cards for detailed analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PULSE_DIMENSIONS.map((item) => (
            <PulseCard
              key={item.id}
              item={item}
              setCurrentTab={setCurrentTab}
              evidenceMode={evidenceMode}
            />
          ))}
        </div>
      </div>

      {/* Economy System Graph */}
      <EconomySystemGraph setCurrentTab={setCurrentTab} />

      {/* Follow the Economy (Signature Feature) */}
      <FollowTheEconomy setCurrentTab={setCurrentTab} />

      {/* CTA to Economic Explorer */}
      <div
        className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0d2040 100%)',
        }}
      >
        <div>
          <div className="section-label mb-1" style={{ color: '#FF9933' }}>
            NEXT QUESTION IN THE EVIDENCE CHAIN
          </div>
          <h3
            className="text-lg font-bold text-white mt-1"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            "Why can GDP grow while households still feel pressure?"
          </h3>
          <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
            Compare aggregate growth against real wage growth and household consumption on the same timeline.
          </p>
        </div>
        <button
          onClick={() => setCurrentTab('explorer')}
          className="flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition shrink-0"
          style={{ background: '#FF9933' }}
        >
          <span>Open Economic Explorer</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
