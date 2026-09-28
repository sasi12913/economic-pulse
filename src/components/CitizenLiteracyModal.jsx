import React, { useState } from 'react';
import { X, BookOpen, ChevronDown, ChevronUp, HelpCircle, CheckCircle } from 'lucide-react';

const LITERACY_QUESTIONS = [
  {
    q: '1. What is GDP?',
    a: 'Gross Domestic Product (GDP) is the total monetary value of all finished goods and services produced within a country during a specific period. It measures aggregate economic output, not individual wealth or happiness.'
  },
  {
    q: '2. What is inflation?',
    a: 'Inflation is the rate at which the general level of prices for goods and services is rising. High inflation erodes purchasing power, meaning each currency unit buys a smaller percentage of a good.'
  },
  {
    q: '3. Why can inflation fall while prices remain high?',
    a: 'Inflation measures the SPEED of price changes. If inflation drops from 7% to 4%, prices are still rising 4% higher than last year. Disinflation means prices are growing more slowly; it does not mean prices have fallen back to older levels.'
  },
  {
    q: '4. Why can GDP grow while real wages grow slowly?',
    a: 'GDP measures total national output. GDP growth can be driven by corporate profits, capital-intensive technology, or high-end services without automatically flowing into wages for informal or lower-skill workers.'
  },
  {
    q: '5. Why can national growth hide regional differences?',
    a: 'National GDP is an average. High industrial or services expansion in a few metropolitan hubs (e.g. Bengaluru, Mumbai) can raise the national average while dryland agricultural districts experience stagnant local activity.'
  },
  {
    q: '6. Why doesn\'t correlation automatically mean causation?',
    a: 'Two indicators moving together (e.g. interest rate hikes and disinflation) does not prove one caused the other. Both could be reacting to a third external variable (e.g. global oil price drops).'
  },
  {
    q: '7. What does the ML model actually do?',
    a: 'Machine learning algorithms (such as XGBoost or Random Forest) identify complex, non-linear statistical patterns and feature attributions (via SHAP values) across historical datasets. They show mathematical contribution, not proof of cause.'
  },
  {
    q: '8. Why does the forecast have an uncertainty range?',
    a: 'Economic systems are influenced by unexpected events (monsoons, global commodity shocks, policy changes). Responsible models provide confidence bands (e.g. 7.3% to 8.8%) rather than misleading single-number predictions.'
  },
  {
    q: '9. Why can an economic model become outdated?',
    a: 'Economic relationships change over time (structural breaks). For instance, digital payments or global supply chain realignments change how policy interest rates affect spending.'
  },
  {
    q: '10. Why does a policy have both possible benefits and costs?',
    a: 'Every macroeconomic policy involves trade-offs. Raising interest rates helps cool inflation, but increases business borrowing costs, which can slow private investment and job creation.'
  }
];

export default function CitizenLiteracyModal({ isOpen, onClose }) {
  const [openIdx, setOpenIdx] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-serif font-bold tracking-tight">
              Ordinary Citizen Economic Literacy Guide
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded transition text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-3">
          <div className="bg-teal-50 border border-teal-200 text-teal-900 p-3.5 rounded-lg text-xs font-medium">
            💡 <strong>The Ordinary Citizen Test:</strong> This guide answers 10 foundational economic questions in plain, non-academic language to empower users to understand data for themselves.
          </div>

          <div className="space-y-2 mt-4">
            {LITERACY_QUESTIONS.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={idx} 
                  className={`border rounded-lg transition-all ${
                    isOpen ? 'border-teal-500 bg-teal-50/20' : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full px-4 py-3 text-left font-semibold text-slate-800 text-sm flex items-center justify-between"
                  >
                    <span className="flex items-center space-x-2">
                      <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{item.q}</span>
                    </span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-700 leading-relaxed border-t border-teal-100/60 font-sans">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-md text-xs font-medium hover:bg-slate-800 transition"
          >
            Got it, return to app
          </button>
        </div>
      </div>
    </div>
  );
}
