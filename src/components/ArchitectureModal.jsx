import React from 'react';
import { X, Cpu, CheckCircle2, AlertTriangle, Layers, GitBranch, ShieldCheck } from 'lucide-react';

const PRINCIPLES = [
  '1. Correlation is not causation.',
  '2. ML feature importance is not causal proof.',
  '3. Forecasts are estimates with uncertainty, not absolute facts.',
  '4. Policy simulations are conditional scenario estimates.',
  '5. Economic relationships change over time (structural breaks).',
  '6. Data revisions matter and vintages are explicitly tracked.',
  '7. Regional precision depends on actual survey data availability.',
  '8. Complex DL models must be benchmarked against simple statistical baselines.',
  '9. The system must continuously communicate uncertainty bands.',
  '10. The system must never make political party or government recommendations.'
];

export default function ArchitectureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-serif font-bold tracking-tight">
              Antigravity ML/DL Research System Architecture
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded transition text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          
          {/* Architecture Flow Diagram */}
          <div>
            <h3 className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-3">
              SYSTEM PIPELINE FLOW
            </h3>
            <div className="bg-slate-900 text-slate-100 p-5 rounded-xl font-mono text-xs space-y-3 border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-800 rounded border border-slate-700">
                <span className="text-blue-400 font-bold">1. DATA SOURCES</span>
                <span className="text-slate-400">MOSPI • RBI • NSO • World Bank • CMIE • State DES</span>
              </div>
              <div className="text-center text-slate-600">↓ Validation, Harmonisation, Base-Year Normalisation</div>

              <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-800 rounded border border-slate-700">
                <span className="text-teal-400 font-bold">2. MACRO DATA WAREHOUSE & VINTAGE STORE</span>
                <span className="text-slate-400">Immutable versioning (2026-Q3-V1)</span>
              </div>
              <div className="text-center text-slate-600">↓ Feature Engineering & Lag Processing</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-indigo-950/60 border border-indigo-700/60 rounded">
                  <span className="text-indigo-300 font-bold block mb-1">ML ANALYTICS ENGINE</span>
                  <p className="text-[11px] text-indigo-200">Random Forest • XGBoost • Anomaly Detection • SHAP Attributions</p>
                  <p className="text-[10px] text-indigo-400 mt-1">Role: Feature contributions, nonlinear elasticity, anomaly flags</p>
                </div>

                <div className="p-3 bg-purple-950/60 border border-purple-700/60 rounded">
                  <span className="text-purple-300 font-bold block mb-1">DL FORECASTING ENGINE</span>
                  <p className="text-[11px] text-purple-200">LSTM • GRU • Temporal Fusion Transformer (TFT)</p>
                  <p className="text-[10px] text-purple-400 mt-1">Role: Long-range sequence modeling & quantile nowcasting</p>
                </div>
              </div>
              <div className="text-center text-slate-600">↓ Model Validation & Benchmarking vs Baseline ARIMA/VAR</div>

              <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-800 rounded border border-slate-700">
                <span className="text-amber-400 font-bold">3. POLICY LAB & EXPLAINABILITY ENGINE</span>
                <span className="text-slate-400">Transmission channels • Uncertainty bands • Structural break alerts</span>
              </div>
              <div className="text-center text-slate-600">↓ Interactive Visual Rendering</div>

              <div className="p-2.5 bg-blue-900 text-center rounded font-semibold text-white">
                4. ECONOMIC PULSE INTERACTIVE UI LAYER
              </div>
            </div>
          </div>

          {/* 10 Scientific Principles */}
          <div>
            <h3 className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-3">
              10 MANDATORY SCIENTIFIC & ETHICAL PRINCIPLES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {PRINCIPLES.map((p, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-md text-xs font-medium hover:bg-slate-800 transition"
          >
            Close Architecture
          </button>
        </div>
      </div>
    </div>
  );
}
