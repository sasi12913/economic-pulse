import React, { useState, useEffect, useCallback } from 'react';
import CinematicIntro from './components/CinematicIntro';
import Sidebar from './components/Sidebar';
import DemoStoryTour from './components/DemoStoryTour';
import NarrativeChainNav from './components/NarrativeChainNav';
import CitizenLiteracyModal from './components/CitizenLiteracyModal';
import ArchitectureModal from './components/ArchitectureModal';

import HomePulse from './views/HomePulse';
import EconomicExplorer from './views/EconomicExplorer';
import RegionalView from './views/RegionalView';
import AIInsights from './views/AIInsights';
import ClaimCheck from './views/ClaimCheck';
import PolicyLab from './views/PolicyLab';
import InequalityView from './views/InequalityView';
import ForecastView from './views/ForecastView';
import DataTransparency from './views/DataTransparency';
import AdaptiveEngine from './views/AdaptiveEngine';

const INTRO_STORAGE_KEY = 'ep_intro_seen_v2';

export default function App() {
  // Intro state
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !localStorage.getItem(INTRO_STORAGE_KEY);
    } catch {
      return true;
    }
  });

  // Navigation state
  const [currentTab, setCurrentTab] = useState('pulse');
  const [prevTab, setPrevTab] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [timeHorizon, setTimeHorizon] = useState('5Y');

  // UI state
  const [evidenceMode, setEvidenceMode] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // Modal & Guided Tour state
  const [demoTourActive, setDemoTourActive] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  const [literacyModalOpen, setLiteracyModalOpen] = useState(false);
  const [archModalOpen, setArchModalOpen] = useState(false);

  // Handle tab navigation with transition tracking
  const handleTabChange = useCallback((tab) => {
    setPrevTab(currentTab);
    setCurrentTab(tab);
  }, [currentTab]);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    try {
      localStorage.setItem(INTRO_STORAGE_KEY, '1');
    } catch {}
  }, []);

  const startDemoTour = () => {
    setDemoTourActive(true);
    setDemoStep(1);
    setCurrentTab('pulse');
  };

  const renderActiveView = () => {
    const commonProps = {
      setCurrentTab: handleTabChange,
      evidenceMode,
    };

    switch (currentTab) {
      case 'pulse':
        return <HomePulse {...commonProps} selectedState={selectedState} />;
      case 'explorer':
        return <EconomicExplorer {...commonProps} />;
      case 'regional':
        return (
          <RegionalView
            {...commonProps}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
          />
        );
      case 'insights':
        return <AIInsights {...commonProps} />;
      case 'claim':
        return <ClaimCheck {...commonProps} />;
      case 'policy':
        return <PolicyLab {...commonProps} />;
      case 'inequality':
        return <InequalityView {...commonProps} />;
      case 'forecast':
        return <ForecastView {...commonProps} />;
      case 'transparency':
        return <DataTransparency {...commonProps} />;
      case 'adaptive':
        return <AdaptiveEngine {...commonProps} />;
      default:
        return <HomePulse {...commonProps} selectedState={selectedState} />;
    }
  };

  return (
    <>
      {/* Cinematic Intro */}
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* Main App Shell */}
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: 'var(--warm-white)' }}
      >
        {/* Sidebar / Navigation */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={handleTabChange}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          timeHorizon={timeHorizon}
          setTimeHorizon={setTimeHorizon}
          onOpenLiteracyModal={() => setLiteracyModalOpen(true)}
          onOpenArchModal={() => setArchModalOpen(true)}
          onStartDemoTour={startDemoTour}
          demoTourActive={demoTourActive}
          evidenceMode={evidenceMode}
          setEvidenceMode={setEvidenceMode}
        />

        {/* Demo Tour Banner */}
        {demoTourActive && (
          <div className="fixed top-[60px] left-0 right-0 z-40 md:left-16">
            <DemoStoryTour
              currentStep={demoStep}
              setCurrentStep={setDemoStep}
              setCurrentTab={handleTabChange}
              onClose={() => setDemoTourActive(false)}
            />
          </div>
        )}

        {/* Main content area — offset for sidebar + header */}
        <main
          className="flex-1 pt-[60px] md:pl-16 pb-16 md:pb-0 transition-all duration-300"
          style={{ minHeight: '100vh' }}
          id="main-content"
          aria-label="Main content"
        >
          {/* Evidence Mode Banner */}
          {evidenceMode && (
            <div
              className="mx-4 mt-3 mb-0 px-4 py-2 rounded-lg text-xs font-mono flex items-center justify-between"
              style={{
                background: 'rgba(0,0,128,0.04)',
                border: '1px solid rgba(0,0,128,0.12)',
                color: '#000080',
              }}
              role="status"
              aria-label="Evidence mode is active"
            >
              <span>
                <strong>EVIDENCE MODE ACTIVE</strong> — Sources, methodology, uncertainty and assumptions are shown throughout.
              </span>
              <button
                onClick={() => setEvidenceMode(false)}
                className="text-slate-500 hover:text-slate-700 text-xs ml-4"
                aria-label="Exit evidence mode"
              >
                ✕ Exit
              </button>
            </div>
          )}

          {/* Page content with enter animation */}
          <div
            key={currentTab}
            className="page-enter max-w-7xl mx-auto px-4 sm:px-6 py-6"
            role="region"
            aria-label={`${currentTab} section`}
          >
            {renderActiveView()}
          </div>
        </main>

        {/* Narrative Flow Chain */}
        <div className="md:pl-16">
          <NarrativeChainNav currentTab={currentTab} setCurrentTab={handleTabChange} />
        </div>

        {/* Modals */}
        <CitizenLiteracyModal
          isOpen={literacyModalOpen}
          onClose={() => setLiteracyModalOpen(false)}
        />
        <ArchitectureModal
          isOpen={archModalOpen}
          onClose={() => setArchModalOpen(false)}
        />
      </div>
    </>
  );
}
