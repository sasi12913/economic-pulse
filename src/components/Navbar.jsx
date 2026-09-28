import React from 'react';
import { 
  Activity, 
  MapPin, 
  Clock, 
  BookOpen, 
  Cpu, 
  PlayCircle,
  BarChart3,
  Search,
  Sliders,
  TrendingUp,
  FileCheck,
  ShieldCheck,
  RefreshCw,
  GitBranch
} from 'lucide-react';
import { REGIONAL_HIERARCHY } from '../data/regionalData';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  selectedState, 
  setSelectedState, 
  selectedDistrict, 
  setSelectedDistrict, 
  timeHorizon, 
  setTimeHorizon,
  onOpenLiteracyModal,
  onOpenArchModal,
  onStartDemoTour,
  demoTourActive
}) {
  const handleStateChange = (e) => {
    const stId = e.target.value;
    setSelectedState(stId);
    setSelectedDistrict(''); // Reset district when state changes
  };

  const activeStateObj = REGIONAL_HIERARCHY.states.find(s => s.id === selectedState);

  const TABS = [
    { id: 'pulse', label: '1. Economic Pulse', icon: Activity },
    { id: 'explorer', label: '2. Economic Explorer', icon: BarChart3 },
    { id: 'regional', label: '3. National → State → Region', icon: MapPin },
    { id: 'insights', label: '4. AI Insights (ML)', icon: Cpu },
    { id: 'claim', label: '5. Claim Check', icon: FileCheck },
    { id: 'policy', label: '6. Policy Scenario Lab', icon: Sliders },
    { id: 'inequality', label: '7. Inclusive Growth', icon: TrendingUp },
    { id: 'forecast', label: '8. Forecast / Nowcast', icon: GitBranch },
    { id: 'transparency', label: '9. Data Transparency', icon: ShieldCheck },
    { id: 'adaptive', label: '10. Adaptive Engine', icon: RefreshCw }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-900 text-blue-200 border border-blue-700">
            RESEARCH PROTOTYPE v2.4
          </span>
          <span className="hidden md:inline text-slate-400">
            Non-Partisan Macroeconomic Intelligence Platform
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onStartDemoTour}
            className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-medium transition ${
              demoTourActive ? 'bg-amber-500 text-slate-950 font-semibold' : 'bg-slate-800 hover:bg-slate-700 text-amber-300'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>5-Min Demo Tour</span>
          </button>
          
          <button 
            onClick={onOpenLiteracyModal}
            className="inline-flex items-center space-x-1 text-slate-300 hover:text-white transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>Citizen Literacy Guide</span>
          </button>

          <button 
            onClick={onOpenArchModal}
            className="inline-flex items-center space-x-1 text-slate-300 hover:text-white transition"
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>ML/DL Architecture</span>
          </button>
        </div>
      </div>

      {/* Main Header Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Logo & Title */}
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-sm">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 font-serif leading-none">
                  ECONOMIC PULSE
                </h1>
                <p className="text-xs text-slate-600 mt-0.5">
                  Understand the Economy. Question the Claims. Explore the Trade-offs.
                </p>
              </div>
            </div>
          </div>

          {/* Controls Bar: Geography, Time, Data Vintage */}
          <div className="flex flex-wrap items-center gap-2 text-xs bg-slate-100/80 p-2 rounded-lg border border-slate-200">
            {/* Geo Selection */}
            <div className="flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded border border-slate-200">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-medium text-slate-700">Geo:</span>
              <select 
                value={selectedState} 
                onChange={handleStateChange}
                aria-label="Select State Geography"
                className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="">National (India)</option>
                {REGIONAL_HIERARCHY.states.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>

              {selectedState && activeStateObj && (
                <>
                  <span className="text-slate-300">/</span>
                  <select 
                    value={selectedDistrict} 
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    aria-label="Select District Geography"
                    className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="">All Districts</option>
                    {activeStateObj.districts.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </>
              )}
            </div>

            {/* Time Selector */}
            <div className="flex items-center space-x-1 bg-white p-0.5 rounded border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
              {['1Y', '3Y', '5Y', '10Y', '20Y'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeHorizon(t)}
                  className={`px-2 py-0.5 rounded font-mono text-[11px] transition ${
                    timeHorizon === t 
                      ? 'bg-blue-600 text-white font-semibold' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Data Status Stamp */}
            <div className="hidden sm:flex items-center space-x-1.5 text-slate-600 px-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-mono">Data: Sept 2026</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Scrollbar */}
        <nav className="flex items-center space-x-1 overflow-x-auto custom-scrollbar mt-3 pt-2 border-t border-slate-100">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-600'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
