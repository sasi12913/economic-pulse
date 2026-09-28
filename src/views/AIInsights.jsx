import React, { useState } from 'react';
import { Cpu, AlertTriangle, Info, ArrowRight, Zap, BookOpen, ChevronRight } from 'lucide-react';
import { SHAP_EXPLANATIONS } from '../data/shapData';

const TARGET_OPTIONS = [
  { id: 'inflation', label: 'CPI Inflation', color: '#FF9933', icon: '📈' },
  { id: 'gdp', label: 'Real GDP Growth', color: '#138808', icon: '📊' },
  { id: 'wages', label: 'Real Wages', color: '#000080', icon: '💼' },
];

const LEARN_CONTENT = {
  inflation: {
    what: 'CPI Inflation measures how fast consumer prices are rising on average.',
    why: 'Directly affects household purchasing power, savings returns, and monetary policy.',
    howMeasured: 'MOSPI collects prices across 299 items weighted by household expenditure patterns.',
    misconception: '"Lower inflation means prices are falling." — Wrong. Lower inflation means prices are rising more slowly. The price level still rose.',
  },
  gdp: {
    what: 'Real GDP is the total inflation-adjusted output of all goods and services in India.',
    why: 'Determines employment capacity, tax revenues, and living standards.',
    howMeasured: 'MOSPI estimates expenditure, production and income approaches then reconciles.',
    misconception: '"GDP growth means everyone is better off." — Not necessarily. Distribution of gains matters enormously.',
  },
  wages: {
    what: 'Real wage growth is nominal wage change minus the inflation rate.',
    why: 'Determines whether workers can actually afford more goods and services.',
    howMeasured: 'PLFS / CMIE surveys track wage rates across formal and informal sectors.',
    misconception: '"Wages grew 8%." — If inflation was 7%, real wage growth was only ~1%.',
  },
};

function SHAPBar({ factor, evidenceMode, isSelected, onSelect }) {
  return (
    <button
      className="w-full text-left rounded-xl border transition p-4 space-y-3 hover:shadow-sm"
      style={{
        borderColor: isSelected ? factor.direction === 'upward' ? '#FF9933' : '#138808' : 'rgba(0,0,0,0.07)',
        background: isSelected
          ? factor.direction === 'upward' ? 'rgba(255,153,51,0.04)' : 'rgba(19,136,8,0.04)'
          : '#ffffff',
      }}
      onClick={onSelect}
      aria-expanded={isSelected}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span
            className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full"
            style={factor.direction === 'upward' ? {
              background: 'rgba(255,153,51,0.12)',
              color: '#92400e',
            } : {
              background: 'rgba(19,136,8,0.1)',
              color: '#0e6606',
            }}
          >
            {factor.direction === 'upward' ? '▲ Upward Pressure' : '▼ Downward Pressure'}
          </span>
          <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
            {factor.feature}
          </span>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <span className="text-base font-bold font-mono" style={{
            color: factor.direction === 'upward' ? '#FF9933' : '#138808',
          }}>
            {factor.percentage}
          </span>
          <ChevronRight
            className="w-3.5 h-3.5 text-slate-300 transition"
            style={{ transform: isSelected ? 'rotate(90deg)' : 'none' }}
          />
        </div>
      </div>

      {/* Animated bar */}
      <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
        <div
          className="h-full rounded-full shap-bar"
          style={{
            width: factor.percentage,
            background: factor.direction === 'upward' ? '#FF9933' : '#138808',
          }}
        />
      </div>

      {isSelected && (
        <div className="pt-2 space-y-2 text-xs page-enter">
          <p className="text-slate-600 leading-relaxed italic">{factor.details}</p>
          {evidenceMode && (
            <div
              className="p-2.5 rounded-lg"
              style={{ background: 'rgba(0,0,128,0.04)', border: '1px solid rgba(0,0,128,0.1)' }}
            >
              <div className="font-mono font-bold text-[10px] mb-1" style={{ color: '#000080' }}>MODEL INTERPRETATION</div>
              <p className="text-slate-600">
                <strong>What this means:</strong> {factor.details}
              </p>
              <p className="text-slate-500 mt-1">
                <strong>What this does NOT prove:</strong> Statistical association ≠ causal proof. Other confounding factors may be present.
              </p>
            </div>
          )}
          <div
            className="flex items-center space-x-1.5 text-[11px]"
            style={{ color: '#FF9933' }}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Model-based association — not causal proof</span>
          </div>
        </div>
      )}
    </button>
  );
}

function LearnPanel({ targetId, evidenceMode }) {
  const [open, setOpen] = useState(false);
  const content = LEARN_CONTENT[targetId];
  if (!content) return null;

  return (
    <div className="card-premium overflow-hidden">
      <button
        className="w-full px-5 py-4 flex items-center justify-between text-left"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4" style={{ color: '#000080' }} />
          <span className="text-sm font-semibold text-slate-900">LEARN: {targetId.toUpperCase() === 'GDP' ? 'GDP' : targetId.charAt(0).toUpperCase() + targetId.slice(1)} — What is it?</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 transition" style={{ transform: open ? 'rotate(90deg)' : 'none' }} />
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 space-y-4 text-xs border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'What is it?', content: content.what, color: '#138808' },
              { label: 'Why does it matter?', content: content.why, color: '#000080' },
              { label: 'How is it measured?', content: content.howMeasured, color: '#7c3aed' },
            ].map(item => (
              <div key={item.label} className="space-y-1.5">
                <div className="section-label" style={{ color: item.color }}>{item.label}</div>
                <p className="text-slate-600 leading-relaxed">{item.content}</p>
              </div>
            ))}
            <div className="space-y-1.5">
              <div className="section-label" style={{ color: '#FF9933' }}>COMMON MISCONCEPTION</div>
              <div
                className="p-3 rounded-xl text-slate-700 leading-relaxed"
                style={{ background: 'rgba(255,153,51,0.06)', border: '1px solid rgba(255,153,51,0.2)' }}
              >
                <AlertTriangle className="w-3.5 h-3.5 inline-block mr-1.5" style={{ color: '#FF9933' }} />
                {content.misconception}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AIInsights({ setCurrentTab, evidenceMode }) {
  const [selectedTarget, setSelectedTarget] = useState('inflation');
  const [selectedFactor, setSelectedFactor] = useState(null);
  const shapData = SHAP_EXPLANATIONS[selectedTarget] || SHAP_EXPLANATIONS.inflation;
  const targetObj = TARGET_OPTIONS.find(t => t.id === selectedTarget);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl" style={{
        background: 'linear-gradient(135deg, #2d0069 0%, #1a003d 100%)',
      }}>
        <div className="p-6 md:p-8">
          <div className="h-0.5 w-24 mb-4 rounded-full" style={{ background: '#7c3aed' }} />
          <div className="section-label mb-2" style={{ color: '#a78bfa' }}>AI INSIGHTS — ML ANALYTICS & EXPLAINABILITY</div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            WHY IS THIS HAPPENING?
          </h2>
          <p className="text-purple-200 text-sm mt-2 max-w-2xl">
            Machine learning feature attributions (SHAP values) decompose indicator movements
            into their statistical contributions.
          </p>

          {/* Target selector */}
          <div className="flex flex-wrap gap-2 mt-5">
            {TARGET_OPTIONS.map(t => (
              <button
                key={t.id}
                onClick={() => { setSelectedTarget(t.id); setSelectedFactor(null); }}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition"
                style={selectedTarget === t.id ? {
                  background: t.color,
                  color: '#ffffff',
                } : {
                  background: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mandatory Causality Warning */}
      <div
        className="rounded-xl p-4 flex items-start space-x-3"
        style={{
          background: 'rgba(255,153,51,0.06)',
          border: '1.5px solid rgba(255,153,51,0.3)',
        }}
        role="alert"
      >
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#FF9933' }} />
        <div>
          <div className="section-label mb-1" style={{ color: '#FF9933' }}>
            SCIENTIFIC GUARDRAIL — READ BEFORE INTERPRETING
          </div>
          <p className="text-sm text-amber-900 leading-relaxed font-semibold" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
            MODEL-BASED ASSOCIATION / CONTRIBUTION — NOT CAUSAL PROOF
          </p>
          <p className="text-xs text-amber-800 mt-1 leading-relaxed">
            SHAP breakdown represents statistical feature importance from XGBoost / Random Forest models.
            Feature importance or statistical correlation does not establish structural causation.
          </p>
        </div>
      </div>

      {/* SHAP Panel */}
      <div className="card-premium p-6 space-y-6">
        {/* Indicator header */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
        >
          <div>
            <div className="section-label text-slate-400 mb-1">TARGET INDICATOR UNDER ANALYSIS</div>
            <h3
              className="text-xl font-bold text-slate-900"
              style={{ fontFamily: "'Newsreader', Georgia, serif" }}
            >
              {shapData.indicator}
            </h3>
            <p className="text-sm text-slate-500 mt-1 font-mono">{shapData.movement}</p>
          </div>
          <div className="text-right space-y-1.5">
            <div className="text-xs text-slate-400 font-mono">Historical Baseline</div>
            <div
              className="text-2xl font-bold font-mono"
              style={{ color: targetObj?.color }}
            >
              {shapData.baseValue}%
            </div>
          </div>
        </div>

        {/* Anomaly alert */}
        {shapData.isAnomaly && (
          <div
            className="rounded-xl p-4 flex items-start space-x-3"
            style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
          >
            <Zap className="w-4 h-4 shrink-0 mt-0.5 text-purple-600" />
            <div>
              <div className="section-label mb-1 text-purple-700">ANOMALY DETECTION ALERT</div>
              <p className="text-xs text-purple-800 leading-relaxed">{shapData.anomalyNote}</p>
            </div>
          </div>
        )}

        {/* SHAP bars */}
        <div className="space-y-3">
          <div className="section-label text-slate-400">
            MODEL-IDENTIFIED FEATURE CONTRIBUTIONS (% SHARE OF MODEL VARIANCE)
          </div>
          <div className="space-y-2.5">
            {shapData.factors.map((factor, idx) => (
              <SHAPBar
                key={idx}
                factor={factor}
                evidenceMode={evidenceMode}
                isSelected={selectedFactor === idx}
                onSelect={() => setSelectedFactor(selectedFactor === idx ? null : idx)}
              />
            ))}
          </div>
        </div>

        {/* Model Specs */}
        <div
          className="rounded-xl p-4 space-y-2"
          style={{ background: '#1a1a2e' }}
        >
          <div className="section-label" style={{ color: '#a78bfa' }}>MODEL AUDIT SPECIFICATION</div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Algorithm: XGBoost Regressor (100 Decision Trees, Max Depth 4) · Explainer: TreeSHAP
            · Reference Window: 2018–2026 · Validation: Out-of-sample RMSE
          </p>
          <p className="text-[11px] text-slate-500 font-mono">
            Model selection is based on out-of-sample empirical validation, not model complexity.
          </p>
        </div>
      </div>

      {/* Learn Panel */}
      <LearnPanel targetId={selectedTarget} evidenceMode={evidenceMode} />

      {/* Next CTA */}
      <div
        className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0d2040 100%)' }}
      >
        <div>
          <div className="section-label mb-1" style={{ color: '#FF9933' }}>NEXT QUESTION IN EVIDENTIAL CHAIN</div>
          <p className="text-lg font-bold text-white" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
            "What does the evidence say about common economic claims?"
          </p>
        </div>
        <button
          onClick={() => setCurrentTab('claim')}
          className="flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold text-white shrink-0"
          style={{ background: '#FF9933' }}
        >
          <span>Check an Economic Claim</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
