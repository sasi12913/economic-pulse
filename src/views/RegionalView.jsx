import React from 'react';
import { MapPin, Info, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import IndiaMap from '../components/IndiaMap';
import { REGIONAL_HIERARCHY } from '../data/regionalData';

export default function RegionalView({ 
  selectedState, 
  setSelectedState, 
  selectedDistrict, 
  setSelectedDistrict,
  setCurrentTab 
}) {
  const stateObj = REGIONAL_HIERARCHY.states.find(s => s.id === selectedState);
  const districtObj = stateObj?.districts?.find(d => d.id === selectedDistrict);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
            <MapPin className="w-4 h-4" />
            <span>PAGE 3 — GEOGRAPHIC DRILL-DOWN: NATIONAL → STATE → REGION</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mt-1">
            WHERE IS IT HAPPENING?
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Drill down from national aggregates to state economies and district clusters.
          </p>
        </div>

        {/* Selected Location Stamp */}
        <div className="bg-slate-900 text-white p-3 rounded-lg text-xs font-mono">
          <span className="text-slate-400">Location:</span>{' '}
          <span className="text-blue-300 font-bold font-serif text-sm">
            India {selectedState ? `→ ${stateObj?.name}` : ''} {selectedDistrict ? `→ ${districtObj?.name}` : ''}
          </span>
        </div>
      </div>

      {/* Interactive SVG India Map */}
      <IndiaMap 
        selectedState={selectedState} 
        onSelectState={(stId) => {
          setSelectedState(stId);
          setSelectedDistrict('');
        }} 
      />

      {/* State & District Detail Display */}
      {stateObj && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-blue-600">STATE ANALYSIS</span>
              <h3 className="text-xl font-bold font-serif text-slate-900">{stateObj.name}</h3>
            </div>
            <div className="flex items-center space-x-3 text-xs font-mono">
              <div className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded border border-emerald-200 font-bold">
                GSDP Growth: {stateObj.gsdpGrowth}
              </div>
              <div className="bg-amber-50 text-amber-800 px-3 py-1 rounded border border-amber-200 font-bold">
                CPI: {stateObj.cpiInflation}
              </div>
              <div className="bg-slate-100 text-slate-800 px-3 py-1 rounded border border-slate-200 font-bold">
                Unemployment: {stateObj.unemployment}
              </div>
            </div>
          </div>

          {/* Sectoral Breakdown */}
          <div>
            <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-2">SECTORAL GSDP COMPOSITION:</div>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-amber-50 rounded border border-amber-200">
                <div className="text-slate-500 font-mono">Agriculture</div>
                <div className="text-lg font-bold text-amber-900 mt-1">{stateObj.agriShare}</div>
              </div>
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <div className="text-slate-500 font-mono">Industry</div>
                <div className="text-lg font-bold text-blue-900 mt-1">{stateObj.industryShare}</div>
              </div>
              <div className="p-3 bg-indigo-50 rounded border border-indigo-200">
                <div className="text-slate-500 font-mono">Services</div>
                <div className="text-lg font-bold text-indigo-900 mt-1">{stateObj.servicesShare}</div>
              </div>
            </div>
          </div>

          {/* District Directory Cards */}
          {stateObj.districts && (
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-slate-500">DISTRICT / REGIONAL BREAKDOWN:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {stateObj.districts.map((dist) => {
                  const isDistSelected = selectedDistrict === dist.id;
                  return (
                    <div
                      key={dist.id}
                      onClick={() => setSelectedDistrict(dist.id)}
                      className={`p-4 rounded-xl border text-xs cursor-pointer transition space-y-2 ${
                        isDistSelected 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm">{dist.name}</span>
                        {dist.hasData ? (
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                            Data Available
                          </span>
                        ) : (
                          <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center space-x-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Sparse Data</span>
                          </span>
                        )}
                      </div>

                      {dist.hasData ? (
                        <>
                          <div className="grid grid-cols-3 gap-2 font-mono text-[11px] pt-1">
                            <div>Growth: <strong className="text-emerald-400">{dist.gsdpGrowth}</strong></div>
                            <div>CPI: <strong>{dist.cpiInflation}</strong></div>
                            <div>Unemp: <strong>{dist.unemployment}</strong></div>
                          </div>
                          <p className={`text-[11px] italic pt-1 ${isDistSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                            {dist.notes}
                          </p>
                        </>
                      ) : (
                        /* Explicit Missing Data Disclaimer */
                        <div className="bg-rose-50 border border-rose-200 text-rose-900 p-2.5 rounded text-[11px] space-y-1">
                          <strong className="block text-rose-950 font-semibold">
                            Reliable comparable data unavailable for this geography.
                          </strong>
                          <p className="text-rose-800">
                            {dist.notes} The system never fabricates regional precision when survey sample density is insufficient.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Educational Panel: Why Regional Analysis Matters */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 space-y-2">
        <div className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
          WHY REGIONAL ANALYSIS MATTERS
        </div>
        <p className="text-sm font-serif text-slate-200 leading-relaxed">
          “A national average can hide differences between states, sectors, urban/rural areas and population groups.”
        </p>
        <p className="text-xs text-slate-400">
          For example, Andhra Pradesh or Maharashtra may experience high coastal port logistics growth while dryland inland districts face monsoon volatility. Macro policy must evaluate regional spatial dynamics rather than assuming uniform nationwide impacts.
        </p>
      </div>

      {/* Next Step CTA */}
      <div className="bg-slate-900 text-white p-5 rounded-xl flex items-center justify-between">
        <div>
          <div className="text-xs font-mono uppercase text-blue-400 font-bold">NEXT QUESTION IN EVIDENTIAL CHAIN</div>
          <div className="text-sm font-serif font-bold mt-0.5">“What trade-offs would policy changes involve across these regions?”</div>
        </div>
        <button onClick={() => setCurrentTab('policy')} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1">
          <span>Open Policy Scenario Lab</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
