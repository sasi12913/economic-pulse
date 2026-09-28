import React from 'react';
import { ArrowRight, Sliders, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function TransmissionFlow({ scenario }) {
  if (!scenario) return null;

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-800 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            CAUSAL TRANSMISSION CHANNEL MAP
          </div>
          <h3 className="text-base font-bold font-serif text-white mt-0.5">
            {scenario.name}
          </h3>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
          Parameter: {scenario.parameter} ({scenario.currentVal} → {scenario.simulatedVal})
        </span>
      </div>

      {/* Causal Transmission Node Flow */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-slate-400">PRIMARY TRANSMISSION PATHWAY:</div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
          {scenario.transmissionNodes.map((node, idx) => (
            <React.Fragment key={node.id}>
              <div 
                className={`p-3 rounded-lg border text-xs flex flex-col justify-between h-full transition ${
                  node.type === 'primary' 
                    ? 'bg-amber-950/60 border-amber-600 text-amber-100' 
                    : node.type === 'outcome' 
                      ? 'bg-emerald-950/60 border-emerald-600 text-emerald-100' 
                      : 'bg-slate-800/80 border-slate-700 text-slate-200'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase text-slate-400">
                    STEP {idx + 1}
                  </div>
                  <div className="font-bold text-sm mt-0.5 leading-snug">
                    {node.title}
                  </div>
                </div>
                <div className="text-[11px] text-slate-300 mt-2 leading-tight">
                  {node.desc}
                </div>
              </div>

              {idx < scenario.transmissionNodes.length - 1 && (
                <div className="hidden md:flex justify-center text-slate-500">
                  <ArrowRight className="w-5 h-5 text-amber-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Counter-Effects & Trade-offs */}
      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
        <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>POTENTIAL COUNTER-EFFECTS & UNINTENDED TRADE-OFFS</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {scenario.counterEffects.map((item, idx) => (
            <div key={idx} className="p-2.5 bg-slate-900 rounded border border-slate-800 text-slate-300">
              <div className="font-bold text-rose-300 mb-1">{item.effect}</div>
              <div className="text-[11px] text-slate-400 leading-normal">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
