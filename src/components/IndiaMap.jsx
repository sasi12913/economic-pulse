import React, { useState } from 'react';
import { MapPin, Info, AlertTriangle } from 'lucide-react';
import { REGIONAL_HIERARCHY } from '../data/regionalData';

export default function IndiaMap({ selectedState, onSelectState, selectedMetric = 'gsdpGrowth' }) {
  const [hoverState, setHoverState] = useState(null);

  // Map state ID to custom SVG paths or simplified interactive geo shapes
  const STATES = [
    { id: 'ap', name: 'Andhra Pradesh', path: 'M 210, 240 L 250, 230 L 260, 270 L 230, 290 L 190, 270 Z', metricVal: '7.8%', cpi: '4.1%', color: '#2563eb' },
    { id: 'mh', name: 'Maharashtra', path: 'M 110, 190 L 190, 180 L 200, 230 L 120, 230 Z', metricVal: '7.9%', cpi: '3.6%', color: '#1d4ed8' },
    { id: 'ka', name: 'Karnataka', path: 'M 140, 240 L 180, 240 L 180, 290 L 140, 280 Z', metricVal: '8.1%', cpi: '3.7%', color: '#1e40af' },
    { id: 'tn', name: 'Tamil Nadu', path: 'M 170, 290 L 220, 280 L 210, 340 L 160, 330 Z', metricVal: '8.0%', cpi: '3.5%', color: '#1d4ed8' },
    { id: 'up', name: 'Uttar Pradesh', path: 'M 180, 110 L 250, 110 L 240, 150 L 170, 140 Z', metricVal: '7.1%', cpi: '4.4%', color: '#3b82f6' },
    { id: 'gj', name: 'Gujarat', path: 'M 60, 160 L 110, 160 L 110, 200 L 70, 200 Z', metricVal: '8.3%', cpi: '3.9%', color: '#1e40af' }
  ];

  const activeHoverObj = hoverState ? REGIONAL_HIERARCHY.states.find(s => s.id === hoverState) : null;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 font-serif">
              INTERACTIVE GEOGRAPHIC HEATMAP (INDIA)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any state to inspect regional macro indicators and district breakdowns.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 font-medium">Metric:</span>
          <span className="bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded border border-blue-200">
            Real GSDP Growth (% YoY)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Interactive SVG Canvas */}
        <div className="md:col-span-7 relative flex justify-center bg-slate-50 p-4 rounded-xl border border-slate-200 min-h-[340px]">
          <svg viewBox="0 0 350 380" className="w-full max-w-[340px] h-auto drop-shadow-sm">
            {/* Outline Background of India (Simplified vector shape) */}
            <path
              d="M 160,20 L 210,30 L 250,50 L 300,90 L 330,140 L 310,180 L 280,220 L 250,290 L 210,360 L 170,330 L 130,280 L 80,240 L 50,180 L 50,130 L 100,70 Z"
              fill="#e2e8f0"
              stroke="#cbd5e1"
              strokeWidth="2"
            />

            {/* Clickable Interactive States */}
            {STATES.map((st) => {
              const isSelected = selectedState === st.id;
              const isHovered = hoverState === st.id;

              return (
                <g key={st.id}>
                  <path
                    d={st.path}
                    fill={isSelected ? '#1e3a8a' : isHovered ? '#2563eb' : st.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="cursor-pointer transition-all hover:opacity-90"
                    onClick={() => onSelectState(st.id)}
                    onMouseEnter={() => setHoverState(st.id)}
                    onMouseLeave={() => setHoverState(null)}
                  />
                  <text
                    x={st.path.split(' ')[2]}
                    y={st.path.split(' ')[3]}
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="bold"
                    pointerEvents="none"
                    textAnchor="middle"
                  >
                    {st.name.substring(0, 3).toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover Tooltip Overlay */}
          {activeHoverObj && (
            <div className="absolute top-4 right-4 bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs max-w-[180px] pointer-events-none border border-slate-700 animate-fadeIn">
              <div className="font-bold text-blue-300 font-serif">{activeHoverObj.name}</div>
              <div className="mt-1 space-y-0.5 text-[11px] font-mono">
                <div>GSDP: <span className="text-emerald-400 font-bold">{activeHoverObj.gsdpGrowth}</span></div>
                <div>CPI: <span className="text-amber-300">{activeHoverObj.cpiInflation}</span></div>
                <div>Unemployment: <span className="text-slate-300">{activeHoverObj.unemployment}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* State Summary Panel */}
        <div className="md:col-span-5 space-y-3">
          <div className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
            STATE COMPARISON DIRECTORY
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
            {REGIONAL_HIERARCHY.states.map((st) => {
              const isSelected = selectedState === st.id;
              return (
                <div
                  key={st.id}
                  onClick={() => onSelectState(st.id)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition flex items-center justify-between ${
                    isSelected 
                      ? 'bg-blue-900 text-white border-blue-900 shadow-sm' 
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-bold font-serif text-sm">{st.name}</div>
                    <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                      Agri: {st.agriShare} | Services: {st.servicesShare}
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className={`font-bold ${isSelected ? 'text-emerald-300' : 'text-blue-600'}`}>
                      {st.gsdpGrowth} GSDP
                    </div>
                    <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      CPI: {st.cpiInflation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-2.5 bg-slate-100 rounded-lg text-[11px] text-slate-600 border border-slate-200 flex items-start space-x-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
            <span>
              National GDP averages mask state-level divergence in industrial composition and agricultural rain dependency.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
