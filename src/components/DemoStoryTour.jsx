import React from 'react';
import { Play, ChevronRight, ChevronLeft, X, Sparkles, CheckCircle2 } from 'lucide-react';

export const DEMO_STEPS = [
  {
    step: 1,
    tab: 'pulse',
    title: 'Step 1: Economic Pulse Landing Dashboard',
    userQuestion: 'What is happening in the economy across core dimensions right now?',
    guidance: 'Observe the 10 separate dimensions. Notice GDP (7.4% ↑), Inflation (3.8% ↓), Real Wages (+2.4%), and Employment (5.3%). Note that there is NO single overall economy score.',
    actionText: 'Inspect the 10 Pulse Cards'
  },
  {
    step: 2,
    tab: 'pulse',
    title: 'Step 2: The Core Citizen Paradox',
    userQuestion: '“Why can GDP grow strongly while individual households still feel economic pressure?”',
    guidance: 'Click any Pulse Card to expand the 3-level explanation (WHAT → WHY → SO WHAT). Notice that GDP measures aggregate output, not household purchasing power.',
    actionText: 'Proceed to Economic Explorer'
  },
  {
    step: 3,
    tab: 'explorer',
    title: 'Step 3: Multi-Indicator Explorer',
    userQuestion: 'How do GDP and Real Wages interact on the same timeline?',
    guidance: 'Select Real GDP vs Real Wage Growth in the explorer. Observe the gap during 2022-2023 where GDP grew while real wages contracted.',
    actionText: 'Compare GDP vs Real Wages'
  },
  {
    step: 4,
    tab: 'insights',
    title: 'Step 4: AI Insights & Feature Attribution',
    userQuestion: 'What factors are statistically associated with recent inflation movements?',
    guidance: 'Inspect the SHAP feature contribution waterfall. Note the explicit label: "Model-based association / contribution — NOT causal proof."',
    actionText: 'View SHAP Explanation'
  },
  {
    step: 5,
    tab: 'claim',
    title: 'Step 5: Check an Economic Claim',
    userQuestion: '“Inflation has fallen, so prices have fallen.” Is this claim true?',
    guidance: 'Select Claim 1. See the rating: "MISLEADING / NEEDS CONTEXT". Review the chart contrasting the inflation rate vs the absolute CPI price level index.',
    actionText: 'Analyze Claim 1'
  },
  {
    step: 6,
    tab: 'regional',
    title: 'Step 6: National → State → District Geographic View',
    userQuestion: 'How do economic conditions differ between National (India), State (Andhra Pradesh), and District (Krishna)?',
    guidance: 'Select India → Andhra Pradesh → Krishna District. Observe how local sectoral composition (ports/agri) differs from national averages. Notice the missing data disclaimer for remote agency belts.',
    actionText: 'Drill Down Geography'
  },
  {
    step: 7,
    tab: 'policy',
    title: 'Step 7: Policy Scenario Lab',
    userQuestion: 'What are the transmission channels and trade-offs of raising interest rates by +50 bps?',
    guidance: 'Simulate +50 bps Repo Rate hike. Trace the causal node network from borrowing costs to investment cooling to inflation reduction. Note potential negative impacts on private investment.',
    actionText: 'Simulate Policy Trade-offs'
  },
  {
    step: 8,
    tab: 'inequality',
    title: 'Step 8: Inequality & Inclusive Growth',
    userQuestion: 'Is aggregate GDP growth reaching every region and group equally?',
    guidance: 'Compare aggregate growth vs rural/urban CPI disparities and Palma inequality index trends across states.',
    actionText: 'Inspect Inclusivity Metrics'
  },
  {
    step: 9,
    tab: 'forecast',
    title: 'Step 9: Multi-Target Macro Forecast Center',
    userQuestion: 'What does the model see next for GDP Growth and CPI Inflation?',
    guidance: 'Switch between Target 1 (Real GDP Growth) and Target 2 (CPI Inflation). Observe prediction intervals widening over multi-quarter horizons, SHAP feature contributions for both targets, and the cross-indicator Growth vs Price Stability synchronized trajectory.',
    actionText: 'Explore Dual-Target Forecasts'
  },
  {
    step: 10,
    tab: 'adaptive',
    title: 'Step 10: Adaptive Engine & Model Transparency',
    userQuestion: 'How does the system handle continuous data releases and structural breaks?',
    guidance: 'Review the live structural change alert ("Post-2024 credit transmission shift"). Finish with the core conclusion: The system informed your judgment without telling you what to vote or believe.',
    actionText: 'Review Adaptive Engine'
  }
];

export default function DemoStoryTour({ 
  currentStep, 
  setCurrentStep, 
  setCurrentTab, 
  onClose 
}) {
  const stepObj = DEMO_STEPS.find(s => s.step === currentStep) || DEMO_STEPS[0];

  const handleNext = () => {
    if (currentStep < 10) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setCurrentTab(DEMO_STEPS[nextStep - 1].tab);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setCurrentTab(DEMO_STEPS[prevStep - 1].tab);
    }
  };

  const handleStepJump = (stepNum) => {
    setCurrentStep(stepNum);
    setCurrentTab(DEMO_STEPS[stepNum - 1].tab);
  };

  return (
    <div className="bg-amber-500 text-slate-950 px-4 py-3 border-b border-amber-600 shadow-md transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Left: Step Info */}
        <div className="flex items-start space-x-3">
          <div className="bg-slate-950 text-amber-400 p-2 rounded-lg font-mono font-bold text-sm shrink-0 mt-0.5">
            {stepObj.step}/10
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm tracking-tight font-serif">{stepObj.title}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-900 text-amber-100 uppercase">
                Demo Walkthrough
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-900 mt-0.5">
              <span className="underline">User Question:</span> {stepObj.userQuestion}
            </p>
            <p className="text-xs text-slate-800 mt-0.5 max-w-3xl">
              {stepObj.guidance}
            </p>
          </div>
        </div>

        {/* Right: Controls & Jump Selector */}
        <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
          <select
            value={currentStep}
            onChange={(e) => handleStepJump(Number(e.target.value))}
            aria-label="Jump to Demo Step"
            className="bg-amber-100 border border-amber-600 text-slate-900 text-xs font-medium rounded px-2 py-1 focus:outline-none cursor-pointer"
          >
            {DEMO_STEPS.map(s => (
              <option key={s.step} value={s.step}>Step {s.step}: {s.tab.toUpperCase()}</option>
            ))}
          </select>

          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="p-1 rounded bg-amber-600 hover:bg-amber-700 text-slate-950 disabled:opacity-40 transition"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === 10}
            className="flex items-center space-x-1 px-3 py-1 rounded bg-slate-950 hover:bg-slate-900 text-amber-400 font-semibold text-xs transition shadow-sm"
          >
            <span>{currentStep === 10 ? 'Finish Tour' : 'Next Step'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="p-1 text-slate-900 hover:text-slate-950 hover:bg-amber-400 rounded transition ml-1"
            title="Close Demo Tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
