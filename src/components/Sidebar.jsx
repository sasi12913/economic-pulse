import React, { useState, useEffect, useCallback } from 'react';
import {
  Activity, BarChart3, MapPin, Cpu, FileCheck, Sliders,
  TrendingUp, GitBranch, ShieldCheck, RefreshCw,
  ChevronRight, Search, Command, X, BookOpen, PlayCircle, Cpu as CpuIcon
} from 'lucide-react';

const TABS = [
  { id: 'pulse', label: 'Economic Pulse', icon: Activity, color: '#FF9933', shortcut: '1' },
  { id: 'explorer', label: 'Economic Explorer', icon: BarChart3, color: '#138808', shortcut: '2' },
  { id: 'regional', label: 'Regional India', icon: MapPin, color: '#000080', shortcut: '3' },
  { id: 'insights', label: 'AI Insights', icon: Cpu, color: '#7c3aed', shortcut: '4' },
  { id: 'claim', label: 'Claim Check', icon: FileCheck, color: '#FF9933', shortcut: '5' },
  { id: 'policy', label: 'Policy Lab', icon: Sliders, color: '#138808', shortcut: '6' },
  { id: 'inequality', label: 'Inequality', icon: TrendingUp, color: '#000080', shortcut: '7' },
  { id: 'forecast', label: 'Forecast Center', icon: GitBranch, color: '#7c3aed', shortcut: '8' },
  { id: 'transparency', label: 'Data & Models', icon: ShieldCheck, color: '#138808', shortcut: '9' },
  { id: 'adaptive', label: 'Adaptive Engine', icon: RefreshCw, color: '#FF9933', shortcut: '0' },
];

const COMMAND_ITEMS = [
  { label: 'Economic Pulse Dashboard', tab: 'pulse', category: 'Navigation', keywords: ['home', 'dashboard', 'pulse'] },
  { label: 'Economic Explorer — Compare Indicators', tab: 'explorer', category: 'Navigation', keywords: ['explorer', 'compare', 'chart', 'gdp', 'inflation', 'wages'] },
  { label: 'Regional India — State & District', tab: 'regional', category: 'Navigation', keywords: ['regional', 'state', 'district', 'india', 'map', 'andhra', 'maharashtra'] },
  { label: 'AI Insights — SHAP Explainability', tab: 'insights', category: 'Navigation', keywords: ['ai', 'ml', 'shap', 'machine learning', 'insights'] },
  { label: 'Claim Check — Evidence Investigation', tab: 'claim', category: 'Navigation', keywords: ['claim', 'check', 'evidence', 'fact'] },
  { label: 'Policy Scenario Lab', tab: 'policy', category: 'Navigation', keywords: ['policy', 'lab', 'scenario', 'interest rate', 'capex'] },
  { label: 'Inequality & Inclusive Growth', tab: 'inequality', category: 'Navigation', keywords: ['inequality', 'gini', 'palma', 'inclusive', 'growth'] },
  { label: 'Macro Forecast Center (GDP & CPI Inflation)', tab: 'forecast', category: 'Navigation', keywords: ['forecast', 'nowcast', 'gdp', 'cpi', 'inflation', 'predict', 'future', 'lstm', 'tft'] },
  { label: 'Data & Model Transparency', tab: 'transparency', category: 'Navigation', keywords: ['data', 'transparency', 'source', 'mospi', 'rbi'] },
  { label: 'Adaptive Engine — Drift Detection', tab: 'adaptive', category: 'Navigation', keywords: ['adaptive', 'drift', 'structural', 'break', 'retrain'] },
  // Concepts
  { label: 'What is Inflation?', tab: 'claim', category: 'Learn', keywords: ['inflation', 'prices', 'cpi', 'what is'] },
  { label: 'What is Real GDP Growth?', tab: 'explorer', category: 'Learn', keywords: ['gdp', 'growth', 'output', 'what is'] },
  { label: 'What is the Palma Ratio?', tab: 'inequality', category: 'Learn', keywords: ['palma', 'inequality', 'gini', 'distribution'] },
  { label: 'Inflation vs Price Level', tab: 'claim', category: 'Concept', keywords: ['inflation', 'price level', 'disinflation', 'deflation'] },
];

function CommandPalette({ onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const inputRef = React.useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = query.length > 0
    ? COMMAND_ITEMS.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.some(k => k.includes(query.toLowerCase()))
      )
    : COMMAND_ITEMS.slice(0, 7);

  return (
    <div className="command-palette-backdrop flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="command-palette w-full" onClick={e => e.stopPropagation()}>
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-slate-100">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search indicators, pages, concepts…"
            className="flex-1 text-sm text-slate-900 placeholder-slate-400 outline-none bg-transparent"
            aria-label="Command palette search"
          />
          <kbd className="text-[10px] font-mono text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto custom-scrollbar py-2">
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-slate-400 text-sm">No results found</div>
          )}
          {filtered.map((item, idx) => (
            <button
              key={idx}
              onClick={() => { onNavigate(item.tab); onClose(); }}
              className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition text-left group"
            >
              <div>
                <div className="text-sm text-slate-900 font-medium group-hover:text-navy">{item.label}</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">{item.category}</div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 shrink-0" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-4 py-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>↑↓ navigate  ↵ open  ESC close</span>
          <span>Ctrl+K to open</span>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({
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
  demoTourActive,
  evidenceMode,
  setEvidenceMode,
}) {
  const [expanded, setExpanded] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Keyboard shortcut: Ctrl+K
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCommandOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      {/* Command Palette */}
      {commandOpen && (
        <CommandPalette
          onClose={() => setCommandOpen(false)}
          onNavigate={setCurrentTab}
        />
      )}

      {/* ── TOP HEADER BAR ── */}
      <header
        className="fixed top-0 left-0 right-0 z-40 glass-subtle border-b"
        style={{ borderColor: 'rgba(0,0,128,0.08)' }}
      >
        {/* Tricolour accent line */}
        <div
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, #FF9933 33.33%, #ffffff 33.33%, #ffffff 66.66%, #138808 66.66%)',
            opacity: 0.7,
          }}
        />

        {/* Main header content */}
        <div className="flex items-center justify-between px-4 py-2.5" style={{ minHeight: '56px' }}>
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {/* Hamburger / Logo */}
            <button
              onClick={() => setExpanded(e => !e)}
              className="p-1.5 rounded-lg hover:bg-slate-100 transition"
              aria-label="Toggle navigation"
            >
              <svg width="22" height="22" viewBox="0 0 22 22">
                <polyline
                  points="1,14 5,14 7,8 10,16 13,4 16,14 18,14 21,14"
                  fill="none"
                  stroke="#FF9933"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex items-center space-x-2">
              <div>
                <div
                  className="text-base font-bold tracking-wider uppercase leading-none"
                  style={{ fontFamily: "'Newsreader', Georgia, serif", color: '#1a1a2e', letterSpacing: '0.08em' }}
                >
                  ECONOMIC PULSE
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5 hidden sm:block">
                  India's Economic Intelligence Layer
                </div>
              </div>
            </div>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-2">
            {/* Global Search / Ctrl+K */}
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden md:flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-500 hover:border-slate-300 transition"
              aria-label="Open command palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search indicators…</span>
              <kbd
                className="ml-2 text-[10px] font-mono text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded"
              >
                Ctrl K
              </kbd>
            </button>

            {/* Evidence Mode Toggle */}
            <div className="evidence-toggle hidden sm:flex">
              <button
                onClick={() => setEvidenceMode(false)}
                className={!evidenceMode ? 'active' : ''}
                aria-label="Standard view"
              >
                Standard
              </button>
              <button
                onClick={() => setEvidenceMode(true)}
                className={evidenceMode ? 'active' : ''}
                aria-label="Evidence view"
              >
                Evidence
              </button>
            </div>

            {/* Data status */}
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full border border-slate-200 bg-white text-[11px] font-mono text-slate-600">
              <span className="live-pulse" />
              <span>Sept 2026</span>
            </div>

            {/* Demo Tour */}
            <button
              onClick={onStartDemoTour}
              className={`hidden sm:flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                demoTourActive
                  ? 'bg-saffron text-slate-900'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Demo Tour</span>
            </button>

            {/* Mobile search icon */}
            <button
              onClick={() => setCommandOpen(true)}
              className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 transition"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      {/* ── LEFT SIDEBAR RAIL ── (desktop) */}
      <aside
        className={`sidebar-nav ${expanded ? 'expanded' : ''} fixed top-[60px] left-0 bottom-0 z-30 flex-col bg-white border-r hidden md:flex`}
        style={{ borderColor: 'rgba(0,0,128,0.07)' }}
        aria-label="Main navigation"
      >
        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar py-3 space-y-0.5 px-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                title={!expanded ? tab.label : undefined}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center rounded-lg px-2 py-2.5 transition group relative ${
                  isActive
                    ? 'text-slate-900'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(255,153,51,0.08) 0%, rgba(248,247,244,0.8) 100%)',
                } : {}}
              >
                {/* Active indicator */}
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full"
                    style={{ background: tab.color }}
                  />
                )}

                <div
                  className="w-8 h-8 flex items-center justify-center rounded-lg shrink-0 transition"
                  style={isActive ? { background: `${tab.color}15` } : {}}
                >
                  <Icon
                    className="w-4 h-4 transition"
                    style={{ color: isActive ? tab.color : undefined }}
                  />
                </div>

                {expanded && (
                  <div className="ml-2.5 text-left overflow-hidden">
                    <div className="text-xs font-semibold leading-tight whitespace-nowrap truncate">
                      {tab.label}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      ⌨ {tab.shortcut}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="border-t py-3 px-2 space-y-0.5" style={{ borderColor: 'rgba(0,0,128,0.07)' }}>
          <button
            onClick={onOpenLiteracyModal}
            title="Economic Literacy Guide"
            className="w-full flex items-center px-2 py-2.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            {expanded && <span className="ml-2.5 text-xs font-medium">Literacy Guide</span>}
          </button>
          <button
            onClick={onOpenArchModal}
            title="ML Architecture"
            className="w-full flex items-center px-2 py-2.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <CpuIcon className="w-4 h-4" />
            </div>
            {expanded && <span className="ml-2.5 text-xs font-medium">ML Architecture</span>}
          </button>
          <button
            onClick={() => setCommandOpen(true)}
            title="Command Palette (Ctrl+K)"
            className="w-full flex items-center px-2 py-2.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <Command className="w-4 h-4" />
            </div>
            {expanded && (
              <div className="ml-2.5 flex items-center justify-between flex-1">
                <span className="text-xs font-medium">Quick Nav</span>
                <kbd className="text-[9px] font-mono text-slate-400 border border-slate-200 px-1 rounded">Ctrl K</kbd>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* ── BOTTOM NAV (mobile) ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t flex items-center justify-around px-2 py-1.5"
        style={{ borderColor: 'rgba(0,0,128,0.08)' }}
        aria-label="Mobile navigation"
      >
        {TABS.slice(0, 5).map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition ${
                isActive ? 'text-slate-900' : 'text-slate-400'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                className="w-5 h-5"
                style={{ color: isActive ? tab.color : undefined }}
              />
              <span className="text-[9px] font-mono mt-0.5">{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}
        <button
          onClick={() => setCommandOpen(true)}
          className="flex flex-col items-center py-1 px-2 text-slate-400"
          aria-label="More options"
        >
          <Search className="w-5 h-5" />
          <span className="text-[9px] font-mono mt-0.5">More</span>
        </button>
      </nav>
    </>
  );
}
