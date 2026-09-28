// SHAP (SHapley Additive exPlanations) & ML Feature Attribution Data
// Prominently labelled as Model-based Association / Contribution (NOT Causal Proof).

export const SHAP_EXPLANATIONS = {
  inflation: {
    indicator: 'CPI INFLATION RATE (3.8%)',
    baseValue: 4.5, // Historical mean
    movement: 'Decline of 0.7 percentage points relative to historical baseline',
    anomalyScore: 'Normal variance (Z-score = -0.42)',
    isAnomaly: false,
    disclaimer: 'Model-based statistical association / feature contribution. Feature importance does NOT establish causality.',
    factors: [
      { feature: 'Food & Agricultural Prices', contribution: -0.32, percentage: '32%', direction: 'downward', details: 'Normal monsoon yields & stabilised vegetable supplies' },
      { feature: 'Global Energy Commodity Prices', contribution: -0.21, percentage: '21%', direction: 'downward', details: 'Moderation in imported crude oil and fertilizer prices' },
      { feature: 'Monetary Policy Rate Pass-through', contribution: -0.18, percentage: '18%', direction: 'downward', details: 'Lagged effect of prior interest rate tightening on credit demand' },
      { feature: 'Domestic Consumer Demand Index', contribution: +0.14, percentage: '14%', direction: 'upward', details: 'Resilient urban service spending exerts modest upward pressure' },
      { feature: 'Exchange Rate Volatility (USD/INR)', contribution: +0.08, percentage: '8%', direction: 'upward', details: 'Minor currency depreciation increases imported input costs' },
      { feature: 'Other Residual & Structural Factors', contribution: -0.07, percentage: '7%', direction: 'downward', details: 'Supply chain logistics improvements and freight rate cooling' }
    ]
  },
  gdp: {
    indicator: 'REAL GDP GROWTH (7.4%)',
    baseValue: 6.2,
    movement: 'Expansion 1.2 percentage points above long-term trend',
    anomalyScore: 'Moderate positive expansion (Z-score = +1.15)',
    isAnomaly: false,
    disclaimer: 'Model-based statistical association / feature contribution. Feature importance does NOT establish causality.',
    factors: [
      { feature: 'Public Capital Investment (CapEx)', contribution: +0.38, percentage: '38%', direction: 'upward', details: 'Sustained public allocation to transport, highways, and energy grid' },
      { feature: 'Services Sector Exports', contribution: +0.24, percentage: '24%', direction: 'upward', details: 'Global capability centers (GCCs) and digital software exports' },
      { feature: 'Private Consumption Expenditure', contribution: +0.18, percentage: '18%', direction: 'upward', details: 'Urban discretionary demand and post-inflation purchasing power recovery' },
      { feature: 'Corporate Balance Sheet De-leveraging', contribution: +0.12, percentage: '12%', direction: 'upward', details: 'Lower non-performing assets (NPAs) enabling credit expansion' },
      { feature: 'Global Demand Headwinds', contribution: -0.10, percentage: '10%', direction: 'downward', details: 'Sluggish merchandise demand in key European trading partners' },
      { feature: 'Other Factors', contribution: +0.02, percentage: '2%', direction: 'upward', details: 'Tax compliance efficiency gains' }
    ]
  },
  wages: {
    indicator: 'REAL WAGE GROWTH (+2.4%)',
    baseValue: 0.5,
    movement: 'Positive rebound of 1.9 percentage points from inflation-dragged periods',
    anomalyScore: 'Recent trend break from 2022 stagnation',
    isAnomaly: true,
    anomalyNote: 'Recent real wage recovery represents a structural break relative to the 2021-2023 high-inflation period.',
    disclaimer: 'Model-based statistical association / feature contribution. Feature importance does NOT establish causality.',
    factors: [
      { feature: 'Headline Disinflation (CPI drop)', contribution: +0.42, percentage: '42%', direction: 'upward', details: 'Falling inflation rate directly stops purchasing power erosion' },
      { feature: 'Formal High-Skill Services Demand', contribution: +0.28, percentage: '28%', direction: 'upward', details: 'Tech, finance, and engineering salary index growth' },
      { feature: 'Informal Sector Productivity Lag', contribution: -0.20, percentage: '20%', direction: 'downward', details: 'Agricultural wage growth lags behind formal urban wage gains' },
      { feature: 'Labour Force Participation (LFPR)', contribution: -0.10, percentage: '10%', direction: 'downward', details: 'Increasing rural female labor entry increases low-skill labor supply' }
    ]
  }
};
