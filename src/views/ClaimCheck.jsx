import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import {
  FileCheck, Search, CheckCircle2, AlertCircle, ArrowRight,
  Microscope, ChevronDown, ChevronRight
} from 'lucide-react';
import { CLAIMS_DATABASE } from '../data/claimsData';

const INVESTIGATION_STAGES = ['CLAIM', 'BREAK DOWN', 'COMPARE DATA', 'CHECK CONTEXT', 'EVIDENCE', 'INTERPRETATION'];

const getRatingConfig = (rating) => {
  if (rating?.includes('MISLEADING')) return {
    label: '⚠ MISLEADING WITHOUT CONTEXT',
    bg: 'rgba(255,153,51,0.08)',
    border: 'rgba(255,153,51,0.3)',
    color: '#92400e',
    badgeBg: '#FF9933',
    badgeText: '#ffffff',
  };
  if (rating?.includes('PARTIALLY')) return {
    label: '🔍 PARTIALLY ACCURATE',
    bg: 'rgba(0,0,128,0.05)',
    border: 'rgba(0,0,128,0.2)',
    color: '#1e3a8a',
    badgeBg: '#000080',
    badgeText: '#ffffff',
  };
  if (rating?.includes('NEEDS CONTEXT')) return {
    label: 'ℹ NEEDS IMPORTANT CONTEXT',
    bg: 'rgba(124,58,237,0.05)',
    border: 'rgba(124,58,237,0.2)',
    color: '#4c1d95',
    badgeBg: '#7c3aed',
    badgeText: '#ffffff',
  };
  return {
    label: '⚡ REQUIRES CAREFUL EXAMINATION',
    bg: 'rgba(220,38,38,0.05)',
    border: 'rgba(220,38,38,0.2)',
    color: '#7f1d1d',
    badgeBg: '#dc2626',
    badgeText: '#ffffff',
  };
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', minWidth: '160px' }}>
      <div className="text-[11px] font-mono text-slate-400 mb-2">{label}</div>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between space-x-3 text-xs mb-0.5">
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span className="font-bold text-white font-mono">{typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function ClaimCheck({ setCurrentTab, evidenceMode }) {
  const [selectedClaimId, setSelectedClaimId] = useState('claim-1');
  const [investigationStage, setInvestigationStage] = useState(5); // Show all by default
  const [animating, setAnimating] = useState(false);

  const claimObj = CLAIMS_DATABASE.find(c => c.id === selectedClaimId) || CLAIMS_DATABASE[0];
  const ratingCfg = getRatingConfig(claimObj.rating);

  const handleClaimSelect = (id) => {
    setSelectedClaimId(id);
    // Animate investigation
    setInvestigationStage(0);
    setAnimating(true);
    let stage = 0;
    const timer = setInterval(() => {
      stage++;
      setInvestigationStage(stage);
      if (stage >= INVESTIGATION_STAGES.length - 1) {
        clearInterval(timer);
        setAnimating(false);
      }
    }, 350);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl" style={{
        background: 'linear-gradient(135deg, #3d1a00 0%, #2d1200 100%)',
      }}>
        <div className="p-6 md:p-8">
          <div className="h-0.5 w-24 mb-4 rounded-full" style={{ background: '#FF9933' }} />
          <div className="section-label mb-2" style={{ color: 'rgba(255,153,51,0.8)' }}>
            SIGNATURE FEATURE — ECONOMIC EVIDENCE INVESTIGATION
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            CHECK AN ECONOMIC CLAIM
          </h2>
          <p className="text-amber-200/70 text-sm mt-2 max-w-2xl">
            Evaluates public macroeconomic assertions against empirical data, economic concepts,
            and statistical nuances — without partisan scoring.
          </p>
          <div
            className="mt-4 inline-flex items-center space-x-2 text-xs px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
          >
            <Microscope className="w-3.5 h-3.5" />
            <span>Does NOT rate political parties. Evaluates economic logic and evidence.</span>
          </div>
        </div>
      </div>

      {/* Investigation Pipeline Visualization */}
      <div className="card-premium p-5">
        <div className="section-label text-slate-400 mb-4">INVESTIGATION PIPELINE</div>
        <div className="flex items-center overflow-x-auto custom-scrollbar pb-2">
          {INVESTIGATION_STAGES.map((stage, idx) => (
            <React.Fragment key={stage}>
              <div
                className="flex flex-col items-center shrink-0"
                style={{ minWidth: '80px' }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-all"
                  style={idx <= investigationStage ? {
                    background: '#FF9933',
                    color: '#ffffff',
                    boxShadow: idx === investigationStage && animating ? '0 0 0 4px rgba(255,153,51,0.2)' : 'none',
                  } : {
                    background: 'rgba(0,0,0,0.05)',
                    color: '#94a3b8',
                  }}
                >
                  {idx + 1}
                </div>
                <div
                  className="text-[10px] font-mono text-center mt-2 leading-tight"
                  style={{
                    color: idx <= investigationStage ? '#FF9933' : '#94a3b8',
                    maxWidth: '70px',
                  }}
                >
                  {stage}
                </div>
              </div>
              {idx < INVESTIGATION_STAGES.length - 1 && (
                <div
                  className="h-0.5 flex-1 mx-1 shrink-0 transition-all"
                  style={{
                    background: idx < investigationStage ? '#FF9933' : '#e2e0db',
                    minWidth: '20px',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Claim Selector */}
      <div className="card-premium p-5 space-y-4">
        <div className="section-label text-slate-400">SELECT AN ECONOMIC CLAIM TO INVESTIGATE</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CLAIMS_DATABASE.map((c) => {
            const isSelected = c.id === selectedClaimId;
            return (
              <button
                key={c.id}
                onClick={() => handleClaimSelect(c.id)}
                className="p-4 rounded-xl border text-left transition space-y-2"
                style={isSelected ? {
                  background: '#1a1a2e',
                  borderColor: '#FF9933',
                  boxShadow: '0 0 0 1px rgba(255,153,51,0.3)',
                } : {
                  background: '#ffffff',
                  borderColor: 'rgba(0,0,0,0.08)',
                }}
                aria-pressed={isSelected}
              >
                <div
                  className="section-label"
                  style={{ color: isSelected ? '#FF9933' : '#94a3b8' }}
                >
                  [{c.category}]
                </div>
                <div
                  className="text-sm font-semibold leading-snug"
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    color: isSelected ? '#ffffff' : '#1a1a2e',
                  }}
                >
                  "{c.claim}"
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] font-mono"
                    style={{ color: isSelected ? '#a78bfa' : '#94a3b8' }}
                  >
                    Concept: {c.literacyKey}
                  </span>
                  <span className="text-xs font-bold" style={{ color: '#FF9933' }}>
                    Investigate →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Claim Evaluation Result */}
      <div className="card-premium overflow-hidden">
        {/* Claim header */}
        <div
          className="p-6 space-y-3"
          style={{
            background: ratingCfg.bg,
            borderBottom: `1px solid ${ratingCfg.border}`,
          }}
        >
          <div className="section-label text-slate-400">CLAIM UNDER INVESTIGATION</div>
          <h3
            className="text-xl font-bold"
            style={{ fontFamily: "'Newsreader', Georgia, serif", color: '#1a1a2e' }}
          >
            "{claimObj.claim}"
          </h3>
          <div className="flex items-center flex-wrap gap-3">
            <span
              className="text-xs font-bold font-mono px-3 py-1.5 rounded-full"
              style={{ background: ratingCfg.badgeBg, color: ratingCfg.badgeText }}
            >
              {ratingCfg.label}
            </span>
            {evidenceMode && (
              <span className="text-[10px] font-mono text-slate-500">
                Category: {claimObj.category} · Concept: {claimObj.literacyKey}
              </span>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* WHAT / BUT panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="rounded-xl p-5 space-y-2"
              style={{ background: 'rgba(19,136,8,0.05)', border: '1px solid rgba(19,136,8,0.2)' }}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" style={{ color: '#138808' }} />
                <div className="section-label" style={{ color: '#138808' }}>WHAT THE DATA SHOW</div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {claimObj.whatDataSays}
              </p>
            </div>

            <div
              className="rounded-xl p-5 space-y-2"
              style={{ background: 'rgba(255,153,51,0.06)', border: '1px solid rgba(255,153,51,0.25)' }}
            >
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" style={{ color: '#FF9933' }} />
                <div className="section-label" style={{ color: '#FF9933' }}>BUT THE DATA DO NOT IMPLY</div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {claimObj.whatDataDoesNotImply}
              </p>
            </div>
          </div>

          {/* Explanation */}
          <div className="rounded-xl p-5 space-y-3" style={{ background: '#1a1a2e' }}>
            <div className="section-label" style={{ color: '#FF9933' }}>
              ECONOMIC CONCEPT BREAKDOWN — {claimObj.literacyKey?.toUpperCase()}
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {claimObj.explanation}
            </p>
          </div>

          {/* Visual evidence chart */}
          {claimObj.chartData && (
            <div className="space-y-4">
              <div className="section-label text-slate-400">VISUAL EVIDENCE</div>
              <div className="p-4 rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.07)', background: 'rgba(0,0,0,0.01)' }}>
                <p className="text-xs font-mono text-slate-500 mb-3">
                  INFLATION RATE VS ABSOLUTE PRICE LEVEL INDEX (2021–2026)
                </p>
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={claimObj.chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="2 4" stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }} tickLine={false} />
                      <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#000080' }} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#FF9933' }} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", paddingTop: '12px' }} />
                      <Line yAxisId="left" type="monotone" dataKey="cpiLevel" name="Price Level (Rising)" stroke="#000080" strokeWidth={2.5} dot={{ r: 3 }} />
                      <Line yAxisId="right" type="monotone" dataKey="inflationRate" name="Inflation Rate (Falling)" stroke="#FF9933" strokeWidth={2.5} strokeDasharray="5 3" dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[11px] text-slate-500 text-center mt-3 italic">
                  As the inflation rate (amber) falls, the absolute price level (navy) continues to rise.
                  Disinflation ≠ falling prices.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next CTA */}
      <div
        className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0d2040 100%)' }}
      >
        <div>
          <div className="section-label mb-1" style={{ color: '#138808' }}>NEXT QUESTION IN EVIDENTIAL CHAIN</div>
          <p className="text-lg font-bold text-white" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
            "Where in India are these dynamics happening?"
          </p>
        </div>
        <button
          onClick={() => setCurrentTab('regional')}
          className="flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold text-white shrink-0"
          style={{ background: '#138808' }}
        >
          <span>Explore Regional View</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
