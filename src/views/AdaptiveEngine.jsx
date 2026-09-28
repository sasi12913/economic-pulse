import React, { useState } from 'react';
import { RefreshCw, AlertTriangle, CheckCircle2, ShieldCheck, ArrowRight, Activity, GitBranch, Bell, Eye } from 'lucide-react';

const ADAPTIVE_STAGES = [
  { step: '1. DATA INGESTION', title: 'New Release Arrival', desc: 'Real-time or monthly data release bulletins ingested into immutable vintage store.', status: 'Active' },
  { step: '2. OUTLIER SCREENING', title: 'Quality Assurance', desc: 'Automated distribution tests check whether observations fall outside 3.5σ bounds.', status: 'Passing' },
  { step: '3. DRIFT MONITORING', title: 'Concept Drift Test', desc: 'Page-Hinkley and Kolmogorov-Smirnov statistical tests on feature relationships.', status: 'Alert Flagged' },
  { step: '4. VALIDATION', title: 'Holdout Verification', desc: 'Verifies whether divergence is noisy transitory variance or persistent structural shift.', status: 'Under Review' },
  { step: '5. RECALIBRATION', title: 'Targeted Re-estimation', desc: 'Recalibrates coefficient weights or retrains trees on post-break regime window.', status: 'Pending Approval' },
  { step: '6. CONTINUOUS MONITOR', title: 'Post-Deploy Feedback', desc: 'Resumes 24/7 telemetry monitoring on live forecast accuracy and empirical coverage.', status: 'Standing Loop' }
];

export default function AdaptiveEngine({ setCurrentTab, evidenceMode }) {
  const [selectedProtocol, setSelectedProtocol] = useState('review');
  const [activeStageIdx, setActiveStageIdx] = useState(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-premium p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border" style={{
        background: 'linear-gradient(135deg, #2b0b14 0%, #17050a 100%)',
        color: '#ffffff'
      }}>
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
            <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
            <span>ADAPTIVE MACROECONOMIC ENGINE & CONTINUOUS LEARNING</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mt-1">
            THE ECONOMY CHANGES. THE MODEL MUST TOO.
          </h1>
          <p className="text-sm text-rose-100/70 mt-0.5 max-w-2xl leading-relaxed">
            Economic relationships evolve across policy regimes, technological shifts, and supply shocks. The adaptive engine detects concept drift and structural breaks.
          </p>
        </div>

        <div className="bg-white/10 p-3.5 rounded-xl border border-white/15 text-xs text-rose-100 max-w-sm">
          <strong className="text-amber-300 font-mono block mb-1">CONTINUOUS LEARNING STANDARD:</strong>
          The system distinguishes a <strong>possible structural break</strong> from a <strong>validated structural break</strong> before permitting automatic model recalibration.
        </div>
      </div>

      {/* Live Structural Break Alert Banner */}
      <div className="card-premium p-6 rounded-2xl border-2 border-rose-300 bg-rose-50/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-rose-200">
          <div className="flex items-center space-x-2 text-rose-900 font-serif font-bold text-base">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>SIMULATED SYSTEM ALERT: POTENTIAL STRUCTURAL CHANGE DETECTED</span>
          </div>
          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            <span className="bg-rose-200 text-rose-900 px-2.5 py-0.5 rounded-full font-bold">
              Status: Active Monitoring
            </span>
          </div>
        </div>

        <p className="text-xs text-rose-950 leading-relaxed font-sans font-medium">
          “The statistical relationship between the central bank policy repo rate and commercial bank credit growth has decoupled compared with the historical baseline (2018–2023). Empirical verification is required before treating this as a permanent economic regime shift.”
        </p>

        {/* Structural Comparison Period A vs Period B */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
          <div className="bg-white p-4 rounded-xl border border-rose-200 space-y-1">
            <span className="font-mono font-bold text-slate-400 text-[10px] uppercase">
              PERIOD A — HISTORICAL BENCHMARK (2018–2023)
            </span>
            <div className="font-serif font-bold text-slate-900 text-sm">High Monetary Elasticity</div>
            <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
              A +50 bps rate hike historically translated to a -1.8% cooling in commercial credit expansion within 4 quarters, as commercial banks passed through deposit costs directly.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-rose-300 space-y-1 ring-1 ring-rose-400/40">
            <span className="font-mono font-bold text-rose-600 text-[10px] uppercase">
              PERIOD B — CURRENT REGIME (2024–2026)
            </span>
            <div className="font-serif font-bold text-slate-900 text-sm">Decoupled Bank Credit Transmission</div>
            <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
              Substantial corporate de-leveraging, high domestic mutual fund retail inflows, and digital lending channels lowered credit sensitivity to rate changes to only -0.6%.
            </p>
          </div>
        </div>

        {/* Protocol Protocol Strip */}
        <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl font-mono text-xs flex flex-wrap items-center justify-between gap-2">
          <span className="text-amber-400 font-bold">DECISION PROTOCOL:</span>
          <span className="text-slate-300">
            Possible Break Detected → Statistical Holdout Test → Compare Candidate Models → Re-estimate Elasticity → Recalibrate only if validated
          </span>
        </div>
      </div>

      {/* Continuous Loop Architecture */}
      <div className="card-premium p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <div className="section-label text-slate-400 mb-1">CONTINUOUS RE-CALIBRATION PIPELINE</div>
            <h2 className="text-lg font-bold font-serif text-slate-900">
              The 6-Stage Adaptive Monitoring Architecture
            </h2>
          </div>
          <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2.5 py-1 rounded">
            Click Stage to Inspect
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {ADAPTIVE_STAGES.map((st, i) => {
            const isSelected = activeStageIdx === i;
            return (
              <button
                key={i}
                onClick={() => setActiveStageIdx(i)}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-rose-500/30'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <div>
                  <div className="text-[9px] font-mono font-bold uppercase text-slate-400">{st.step}</div>
                  <div className="font-serif font-bold text-xs mt-1 leading-snug">{st.title}</div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px] font-mono">
                  <span className={isSelected ? 'text-rose-400' : 'text-slate-500'}>{st.status}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail */}
        {(() => {
          const st = ADAPTIVE_STAGES[activeStageIdx];
          return (
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-slate-900">{st.step}: {st.title}</span>
                <span className="font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px] font-bold">
                  Status: {st.status}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{st.desc}</p>
            </div>
          );
        })()}
      </div>

      {/* Complete Journey Summary */}
      <div className="bg-slate-900 text-white p-7 rounded-2xl border border-slate-800 space-y-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-white">
          Complete Economic Evidence Journey
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
          You have navigated the complete ten-dimension Economic Pulse evidence pipeline — from real-time landing cards, indicator divergence exploration, SHAP explainability, claim check evidence analysis, geographic drill-downs, policy trade-off simulations, inclusive growth metrics, dual-target GDP and CPI forecasts, data vintage registries, to continuous adaptive monitoring.
        </p>
        <p className="text-sm font-serif italic text-amber-300 pt-1">
          “Economic Pulse informed your understanding without dictating what political conclusion you should reach.”
        </p>
        <div className="pt-2">
          <button
            onClick={() => setCurrentTab('pulse')}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-xs font-semibold transition shadow-md"
          >
            <Activity className="w-4 h-4" />
            <span>Return to Economic Pulse Landing</span>
          </button>
        </div>
      </div>
    </div>
  );
}
