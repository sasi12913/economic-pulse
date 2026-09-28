import React from 'react';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';

const NARRATIVE_STEPS = [
  { id: 'pulse', label: '1. PULSE', question: 'What is happening?' },
  { id: 'explorer', label: '2. EXPLORER', question: 'How do metrics compare?' },
  { id: 'insights', label: '3. AI INSIGHTS', question: 'Why is it changing?' },
  { id: 'claim', label: '4. CLAIM CHECK', question: 'What does evidence say?' },
  { id: 'regional', label: '5. REGIONAL VIEW', question: 'Where is it happening?' },
  { id: 'policy', label: '6. POLICY LAB', question: 'What trade-offs exist?' },
  { id: 'inequality', label: '7. INEQUALITY', question: 'Is growth inclusive?' },
  { id: 'forecast', label: '8. FORECAST', question: 'What might happen next (GDP & CPI)?' },
  { id: 'transparency', label: '9. TRANSPARENCY', question: 'How is it built?' },
  { id: 'adaptive', label: '10. ADAPTIVE', question: 'How is it updated?' }
];

export default function NarrativeChainNav({ currentTab, setCurrentTab }) {
  const currentIndex = NARRATIVE_STEPS.findIndex(s => s.id === currentTab);
  const nextStep = NARRATIVE_STEPS[currentIndex + 1];

  return (
    <div className="bg-slate-900 text-slate-200 mt-12 py-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Narrative Flow Chain Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-blue-400">
              <Compass className="w-4 h-4" />
              <span>THE ECONOMIC EVIDENCE CHAIN</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-white mt-1">
              Every screen connects to the next logical question.
            </h3>
          </div>

          {nextStep && (
            <button
              onClick={() => setCurrentTab(nextStep.id)}
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-md group shrink-0"
            >
              <span>Next Question: {nextStep.question}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Narrative Chain Breadcrumb Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 mt-6">
          {NARRATIVE_STEPS.map((step, idx) => {
            const isActive = step.id === currentTab;
            const isPast = idx < currentIndex;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentTab(step.id)}
                className={`p-2 rounded text-left transition border ${
                  isActive 
                    ? 'bg-blue-900/60 border-blue-500 text-white' 
                    : isPast 
                      ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800' 
                      : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:text-slate-300'
                }`}
              >
                <div className="text-[10px] font-mono uppercase font-bold tracking-tight text-blue-400">
                  {step.label}
                </div>
                <div className="text-xs font-medium truncate mt-0.5">
                  {step.question}
                </div>
              </button>
            );
          })}
        </div>

        {/* Permanent Landing Philosophy Message */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-sm font-serif italic text-slate-300 max-w-2xl mx-auto">
            “Economic Pulse does not tell you what to think about the economy.
            It helps you understand the evidence well enough to think for yourself.”
          </p>
          <div className="flex justify-center items-center space-x-2 mt-3 text-[11px] font-mono text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>NON-PARTISAN RESEARCH PROTOTYPE — DEMO DATA NOTICE ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
