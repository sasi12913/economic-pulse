import React, { useState } from 'react';
import { Sliders, ShieldAlert, ArrowRight, AlertTriangle, ChevronDown, CheckCircle2, RefreshCw, Zap } from 'lucide-react';
import TransmissionFlow from '../components/TransmissionFlow';
import { POLICY_SCENARIOS } from '../data/policyScenarios';

const SCENARIO_ICONS = {
  interest_rate_hike: '🏦',
  capex_expansion: '🏗️',
  transfer_spending: '💸',
  tax_rationalization: '📊'
};

const MAGNITUDES = [
  { label: 'Moderate', scale: 0.5, desc: 'Conservative calibration' },
  { label: 'Baseline', scale: 1.0, desc: 'Central policy scenario' },
  { label: 'Aggressive', scale: 1.5, desc: 'Accelerated policy push' }
];

export default function PolicyLab({ setCurrentTab, evidenceMode }) {
  const [selectedScenarioKey, setSelectedScenarioKey] = useState('interest_rate_hike');
  const [magnitudeIndex, setMagnitudeIndex] = useState(1); // Baseline (scale: 1.0)
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [showCounterEffects, setShowCounterEffects] = useState(true);

  const scenarioObj = POLICY_SCENARIOS[selectedScenarioKey] || POLICY_SCENARIOS.interest_rate_hike;
  const currentMagnitude = MAGNITUDES[magnitudeIndex];

  // Helper to scale impacts based on selected magnitude
  const getScaledImpact = (valStr, scale) => {
    const isNegative = valStr.startsWith('-');
    const cleanNum = parseFloat(valStr.replace(/[^0-9.]/g, ''));
    if (isNaN(cleanNum)) return valStr;
    const scaled = (cleanNum * scale).toFixed(2);
    return `${isNegative ? '-' : '+'}${scaled}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-premium p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border" style={{
        background: 'linear-gradient(135deg, #160829 0%, #0d0419 100%)',
        color: '#ffffff'
      }}>
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
            <Sliders className="w-4 h-4" />
            <span>POLICY SCENARIO SIMULATION LABORATORY</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mt-1">
            EXPLORE MACROECONOMIC POLICY TRADE-OFFS
          </h1>
          <p className="text-sm text-purple-200/70 mt-0.5 max-w-2xl leading-relaxed">
            "Change a policy assumption. Trace the modelled transmission channels, second-order counter-effects, and macroeconomic trade-offs."
          </p>
        </div>

        <div className="bg-white/10 p-3.5 rounded-xl border border-white/15 text-xs text-purple-100 max-w-sm">
          <strong className="text-amber-300 font-mono block mb-1">CONDITIONAL SIMULATION RULE:</strong>
          Not a policy prescription engine. The platform never labels any policy as "optimal" or "guaranteed". Outputs represent conditional econometric counterfactuals.
        </div>
      </div>

      {/* Mandatory Non-Partisan Scientific Guardrail */}
      <div
        className="card-premium p-4 rounded-xl border flex items-start space-x-3 bg-purple-50/70 border-purple-300/80 text-purple-950"
        role="alert"
      >
        <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-purple-600" />
        <div className="text-xs space-y-1">
          <div className="font-mono font-bold text-purple-900 uppercase text-[10px] tracking-wider">
            SCIENTIFIC GUARDRAIL — CONDITIONAL SCENARIOS ONLY
          </div>
          <p className="leading-relaxed">
            <strong>HYPOTHETICAL SCENARIO.</strong> Model estimates depend on empirical elasticity derived from historical macroeconomic data. Actual policy outcomes depend on implementation timing, global commodity movements, institutional agility, and second-order private sector feedback loops.
          </p>
        </div>
      </div>

      {/* Scenario Selector & Magnitude Controls */}
      <div className="card-premium p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="section-label text-slate-400 mb-1">SELECT POLICY SCENARIO</div>
            <h2 className="text-lg font-bold font-serif text-slate-900">
              Four Core Policy Experiments
            </h2>
          </div>

          {/* Magnitude Stepper */}
          <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
            <span className="font-mono text-slate-500 font-bold px-2">STIMULUS LEVEL:</span>
            {MAGNITUDES.map((mag, idx) => (
              <button
                key={mag.label}
                onClick={() => setMagnitudeIndex(idx)}
                className={`px-3 py-1 rounded-lg font-mono font-semibold transition ${
                  magnitudeIndex === idx
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {mag.label} ({mag.scale}x)
              </button>
            ))}
          </div>
        </div>

        {/* 4 Scenario Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.values(POLICY_SCENARIOS).map((sc) => {
            const isSelected = sc.id === selectedScenarioKey;
            const icon = SCENARIO_ICONS[sc.id] || '⚗️';
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioKey(sc.id)}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-purple-500 shadow-lg ring-2 ring-purple-500/30'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
                aria-pressed={isSelected}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{icon}</span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      isSelected ? 'bg-purple-950 text-purple-300 border border-purple-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {sc.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold font-serif mt-2 leading-snug">
                    {sc.name.split(' (')[0]}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/40 text-xs font-mono">
                  <span className={isSelected ? 'text-purple-300' : 'text-slate-500'}>
                    {sc.parameter}: {sc.currentVal} → {sc.simulatedVal}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Causal Transmission Pathway Diagram */}
      <div className="card-premium overflow-hidden">
        <div className="px-6 pt-5 pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="section-label text-slate-400 mb-1">TRANSMISSION MECHANISM</div>
            <h2 className="text-lg font-bold font-serif text-slate-900">
              Causal Pathway: {scenarioObj.name}
            </h2>
            <p className="text-xs font-mono text-slate-500 mt-0.5">
              Active Parameter Shift: {scenarioObj.parameter} ({scenarioObj.currentVal} → {scenarioObj.simulatedVal}) at {currentMagnitude.label} calibration ({currentMagnitude.scale}x)
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase bg-purple-50 text-purple-800 px-3 py-1 rounded border border-purple-200 font-bold">
            Modeled Transmission Lag: 4–6 Quarters
          </span>
        </div>

        <div className="p-6">
          <TransmissionFlow scenario={scenarioObj} />
        </div>
      </div>

      {/* Estimated Macroeconomic Impacts */}
      <div className="card-premium p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="section-label text-slate-400 mb-1">ESTIMATED MACROECONOMIC IMPACTS</div>
            <h2 className="text-lg font-bold font-serif text-slate-900">
              Simulated 4-Quarter Horizon Response
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Reflects scaled empirical impulse-response functions with uncertainty bounds.
            </p>
          </div>
          <div className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1 rounded border border-slate-200">
            Multiplier Scale: <strong>{currentMagnitude.scale}x</strong> ({currentMagnitude.desc})
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(scenarioObj.estimatedImpacts).map(([key, item]) => {
            const scaledChange = getScaledImpact(item.change, currentMagnitude.scale);
            const isPos = scaledChange.startsWith('+');
            const isNeg = scaledChange.startsWith('-');
            return (
              <div
                key={key}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-1.5"
              >
                <div className="section-label text-slate-400 truncate capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                <div
                  className="text-2xl font-bold font-mono"
                  style={{
                    color: isPos ? '#059669' : isNeg ? '#e11d48' : '#1e293b'
                  }}
                >
                  {scaledChange}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  Confidence: <span className="font-bold text-slate-700">{item.confidence}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Counter-Effects & Trade-offs Panel */}
        <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-serif font-bold text-sm text-slate-900 flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Second-Order Counter-Effects & Real-World Friction:</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {scenarioObj.counterEffects.map((ce, i) => (
              <div key={i} className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1">
                <span className="font-serif font-bold text-amber-950 block">{ce.effect}</span>
                <p className="text-amber-900/80 leading-relaxed text-[11px]">{ce.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Collapsible Assumptions & Limitations */}
        <div className="pt-2">
          <button
            onClick={() => setShowAssumptions(a => !a)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-800 py-2 transition"
          >
            <div className="flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-purple-600" />
              <span>Methodological Assumptions & Structural Limitations</span>
            </div>
            <ChevronDown
              className="w-3.5 h-3.5 transition-transform"
              style={{ transform: showAssumptions ? 'rotate(180deg)' : 'none' }}
            />
          </button>
          {showAssumptions && (
            <div className="mt-2 p-4 rounded-xl text-xs space-y-2 bg-slate-50 border border-slate-200">
              <p><strong className="text-slate-900">Key Assumptions:</strong> <span className="text-slate-600">{scenarioObj.assumptions}</span></p>
              <p><strong className="text-slate-900">Econometric Limitations:</strong> <span className="text-slate-600">{scenarioObj.limitations}</span></p>
            </div>
          )}
        </div>
      </div>

      {/* Next CTA */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase text-teal-400 font-bold tracking-wider">
            NEXT QUESTION IN EVIDENTIAL CHAIN
          </div>
          <h3 className="text-lg font-serif font-bold text-white mt-1">
            "Is economic growth reaching all households and regions equally?"
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Inspect real wages, district GSDP dispersion, and Palma inequality disparity metrics.
          </p>
        </div>
        <button
          onClick={() => setCurrentTab('inequality')}
          className="flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shrink-0 transition shadow-md"
        >
          <span>Inspect Inclusive Growth</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
