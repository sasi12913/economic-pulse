// Macroeconomic Forecasting Ecosystem Data
// Multi-Target Architecture: Real GDP Growth (% YoY) & CPI Inflation Rate (% YoY)
// Explicitly labeled as DEMO DATA for prototype simulation.

export const MACRO_ECOSYSTEM_CATEGORIES = [
  {
    id: 'activity',
    title: 'Growth & Activity',
    color: '#138808',
    description: 'Tracks overall domestic production, manufacturing cadence, and aggregate value addition.',
    indicators: [
      { name: 'Real GDP Growth', value: '7.4%', unit: '% YoY', role: 'Primary Target 1', freq: 'Quarterly' },
      { name: 'Gross Value Added (GVA)', value: '7.1%', unit: '% YoY', role: 'Predictive Feature', freq: 'Quarterly' },
      { name: 'Index of Industrial Production (IIP)', value: '5.2%', unit: '% YoY', role: 'High-Freq Feature', freq: 'Monthly' },
      { name: 'Manufacturing PMI', value: '58.1', unit: 'Diffusion Index', role: 'Leading Indicator', freq: 'Monthly' },
      { name: 'Services PMI', value: '60.4', unit: 'Diffusion Index', role: 'Leading Indicator', freq: 'Monthly' },
      { name: 'Gross Fixed Capital Formation (GFCF)', value: '32.8%', unit: '% of GDP', role: 'Capacity Feature', freq: 'Quarterly' }
    ]
  },
  {
    id: 'prices',
    title: 'Inflation & Prices',
    color: '#FF9933',
    description: 'Captures consumer, producer, and commodity price dynamics across food, energy, and core components.',
    indicators: [
      { name: 'CPI Combined (Headline)', value: '3.8%', unit: '% YoY', role: 'Primary Target 2', freq: 'Monthly' },
      { name: 'Food & Beverage CPI (CFPI)', value: '3.7%', unit: '% YoY', role: 'Key Volatility Driver', freq: 'Monthly' },
      { name: 'Core CPI (Ex-Food & Fuel)', value: '3.3%', unit: '% YoY', role: 'Underlying Trend', freq: 'Monthly' },
      { name: 'Fuel & Light CPI', value: '2.9%', unit: '% YoY', role: 'Input Cost Feature', freq: 'Monthly' },
      { name: 'Wholesale Price Index (WPI)', value: '2.4%', unit: '% YoY', role: 'Producer Lead Indicator', freq: 'Monthly' },
      { name: 'Global Energy Commodity Index', value: '112.4', unit: 'Base 2020=100', role: 'Imported Cost Factor', freq: 'Weekly' }
    ]
  },
  {
    id: 'monetary',
    title: 'Monetary & Financial Conditions',
    color: '#000080',
    description: 'Reflects central bank policy stance, systemic liquidity, and commercial borrowing transmission.',
    indicators: [
      { name: 'Policy Repo Rate', value: '5.75%', unit: '% p.a.', role: 'Policy Instrument', freq: 'Bi-monthly' },
      { name: 'Bank Credit Growth', value: '13.2%', unit: '% YoY', role: 'Demand Accelerator', freq: 'Fortnightly' },
      { name: 'Weighted Avg Lending Rate (WALR)', value: '9.20%', unit: '% p.a.', role: 'Transmission Channel', freq: 'Monthly' },
      { name: '10-Year Sovereign G-Sec Yield', value: '6.78%', unit: '% p.a.', role: 'Risk Benchmark', freq: 'Daily' },
      { name: 'Broad Money Supply (M3)', value: '11.1%', unit: '% YoY', role: 'Liquidity Variable', freq: 'Fortnightly' },
      { name: 'Financial Conditions Index (FCI)', value: '+0.42', unit: 'Z-Score (Accommodative)', role: 'Composite Feature', freq: 'Weekly' }
    ]
  },
  {
    id: 'external',
    title: 'External Sector & Trade',
    color: '#7c3aed',
    description: 'Monitors international currency valuation, terms of trade, and balance of payments sensitivity.',
    indicators: [
      { name: 'USD / INR Exchange Rate', value: '₹84.10', unit: 'Spot Rate', role: 'Import Cost Channel', freq: 'Daily' },
      { name: 'Brent Crude Oil Price', value: '$74.20', unit: 'USD / bbl', role: 'Critical Input Shock', freq: 'Daily' },
      { name: 'Merchandise & Services Exports', value: '126.2', unit: 'Volume Index', role: 'External Demand', freq: 'Monthly' },
      { name: 'Trade Deficit (Merchandise)', value: '$18.4B', unit: 'USD / Month', role: 'Current Account Driver', freq: 'Monthly' },
      { name: 'Foreign Exchange Reserves', value: '$682B', unit: 'USD Total', role: 'Buffer Indicator', freq: 'Weekly' },
      { name: 'Real Effective Exchange Rate (REER)', value: '103.5', unit: 'Trade-Weighted Index', role: 'Competitiveness', freq: 'Monthly' }
    ]
  },
  {
    id: 'labour',
    title: 'Labour & Household Conditions',
    color: '#059669',
    description: 'Assesses household purchasing power, workforce absorption, and consumption sustainability.',
    indicators: [
      { name: 'Unemployment Rate', value: '5.3%', unit: '% Active Labour', role: 'Slack Indicator', freq: 'Monthly' },
      { name: 'Labour Force Participation (LFPR)', value: '54.2%', unit: '% Working Age', role: 'Structural Factor', freq: 'Quarterly' },
      { name: 'Real Wage Growth', value: '+2.4%', unit: '% YoY', role: 'Purchasing Power', freq: 'Quarterly' },
      { name: 'Private Final Consumption (PFCE)', value: '125.2', unit: 'Index Base 100', role: '60% of Aggregate GDP', freq: 'Quarterly' },
      { name: 'Rural Wage Index (Agri & Non-Agri)', value: '6.2%', unit: '% Nominal YoY', role: 'Rural Demand Anchor', freq: 'Monthly' },
      { name: 'Consumer Confidence Index (CSI)', value: '98.5', unit: 'RBI Survey Index', role: 'Sentiment Proxy', freq: 'Bi-monthly' }
    ]
  },
  {
    id: 'fiscal',
    title: 'Fiscal Conditions & Public CapEx',
    color: '#be185d',
    description: 'Quantifies sovereign infrastructure outlays, fiscal consolidation discipline, and revenue buoyancy.',
    indicators: [
      { name: 'Central Fiscal Deficit', value: '4.3%', unit: '% of GDP', role: 'Fiscal Anchor', freq: 'Monthly / Annual' },
      { name: 'Public Capital Expenditure (CapEx)', value: '20.1%', unit: '% YoY Growth', role: 'Growth Multiplier', freq: 'Monthly' },
      { name: 'Gross GST Collections', value: '₹1.88L Cr', unit: 'Monthly Run-Rate', role: 'Formalization Proxy', freq: 'Monthly' },
      { name: 'Direct Tax Buoyancy', value: '1.42', unit: 'Elasticity to Nominal GDP', role: 'Revenue Strength', freq: 'Quarterly' },
      { name: 'Central Debt-to-GDP Ratio', value: '55.8%', unit: '% of GDP', role: 'Sustainability Metric', freq: 'Annual' }
    ]
  }
];

// Target 1: GDP Forecast Trajectory (Multi-Horizon 1Q to 8Q)
export const GDP_FORECAST_DATA = {
  targetId: 'gdp',
  targetName: 'Real GDP Growth (% YoY)',
  shortName: 'GDP Growth',
  unit: '% YoY',
  currentValue: 7.4,
  currentPeriod: '2026 Q2',
  baselineMean: 6.5,
  historicalTrend: 'Sustained expansion supported by robust infrastructure CapEx, digital services exports, and resilient domestic consumption.',
  
  horizons: [
    { id: '1Q', label: 'Next Quarter (2026 Q3)', forecast: 7.6, lower80: 7.0, upper80: 8.2, lower95: 6.6, upper95: 8.6 },
    { id: '2Q', label: '2 Quarters (2026 Q4)', forecast: 7.8, lower80: 7.1, upper80: 8.5, lower95: 6.5, upper95: 9.0 },
    { id: '4Q', label: '4 Quarters (2027 Q1)', forecast: 8.1, lower80: 7.3, upper80: 8.8, lower95: 6.6, upper95: 9.4 },
    { id: '8Q', label: '8 Quarters (2028 Q2)', forecast: 7.9, lower80: 6.8, upper80: 9.1, lower95: 6.0, upper95: 9.8 }
  ],

  // Model-specific central forecasts for comparison
  modelPredictions: {
    tft: { name: 'Temporal Fusion Transformer', next1Q: 7.6, next4Q: 8.1, next8Q: 7.9, color: '#000080' },
    xgb: { name: 'XGBoost Regressor', next1Q: 7.5, next4Q: 7.9, next8Q: 7.7, color: '#FF9933' },
    rf: { name: 'Random Forest', next1Q: 7.4, next4Q: 7.7, next8Q: 7.5, color: '#138808' },
    lstm: { name: 'LSTM Recurrent Net', next1Q: 7.7, next4Q: 8.2, next8Q: 8.0, color: '#7c3aed' },
    arima: { name: 'ARIMA / VAR Baseline', next1Q: 7.3, next4Q: 7.4, next8Q: 7.2, color: '#6b7280' }
  },

  // Full timeline series for chart (historical actuals + future forecast horizons)
  timeline: [
    { period: '2024 Q1', actual: 7.8, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2024 Q2', actual: 7.4, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2024 Q3', actual: 7.2, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2024 Q4', actual: 7.5, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2025 Q1', actual: 7.3, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2025 Q2', actual: 7.4, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2025 Q3', actual: 7.5, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2025 Q4', actual: 7.3, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2026 Q1', actual: 7.4, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2026 Q2', actual: 7.4, forecast: 7.4, lower80: 7.4, upper80: 7.4, lower95: 7.4, upper95: 7.4 }, // Anchor NOW
    { period: '2026 Q3 (F)', actual: null, forecast: 7.6, lower80: 7.0, upper80: 8.2, lower95: 6.6, upper95: 8.6, arima: 7.3, xgb: 7.5, lstm: 7.7 },
    { period: '2026 Q4 (F)', actual: null, forecast: 7.8, lower80: 7.1, upper80: 8.5, lower95: 6.5, upper95: 9.0, arima: 7.3, xgb: 7.7, lstm: 7.9 },
    { period: '2027 Q1 (F)', actual: null, forecast: 8.1, lower80: 7.3, upper80: 8.8, lower95: 6.6, upper95: 9.4, arima: 7.4, xgb: 7.9, lstm: 8.2 },
    { period: '2027 Q2 (F)', actual: null, forecast: 7.9, lower80: 7.0, upper80: 8.7, lower95: 6.3, upper95: 9.3, arima: 7.3, xgb: 7.8, lstm: 8.1 },
    { period: '2027 Q3 (F)', actual: null, forecast: 8.0, lower80: 6.9, upper80: 8.9, lower95: 6.1, upper95: 9.6, arima: 7.3, xgb: 7.8, lstm: 8.1 },
    { period: '2027 Q4 (F)', actual: null, forecast: 8.1, lower80: 6.9, upper80: 9.0, lower95: 6.1, upper95: 9.7, arima: 7.3, xgb: 7.8, lstm: 8.1 },
    { period: '2028 Q1 (F)', actual: null, forecast: 7.8, lower80: 6.7, upper80: 9.0, lower95: 5.9, upper95: 9.7, arima: 7.2, xgb: 7.6, lstm: 8.0 },
    { period: '2028 Q2 (F)', actual: null, forecast: 7.9, lower80: 6.8, upper80: 9.1, lower95: 6.0, upper95: 9.8, arima: 7.2, xgb: 7.7, lstm: 8.0 }
  ],

  // GDP Specific SHAP Feature Contributions
  shapAttributions: [
    { feature: 'Public Infrastructure Investment (CapEx)', contribution: +0.38, percentage: '38%', direction: 'upward', details: 'Sustained Union & State budgetary allocations into rail, highways, and energy grids with a high fiscal multiplier.' },
    { feature: 'Global Capability Centers & Services Exports', contribution: +0.24, percentage: '24%', direction: 'upward', details: 'High-value tech consulting, enterprise software, and GCC operational revenue expansion.' },
    { feature: 'Private Urban Consumption & Auto Sales', contribution: +0.18, percentage: '18%', direction: 'upward', details: 'Consumer durable and urban retail expenditure post disinflationary real wage recovery.' },
    { feature: 'Commercial Banking Credit Expansion', contribution: +0.14, percentage: '14%', direction: 'upward', details: 'Clean corporate and bank balance sheets (low NPAs) expanding working capital and loan disbursements.' },
    { feature: 'Global Demand Headwinds in Trading Partners', contribution: -0.10, percentage: '10%', direction: 'downward', details: 'Subdued manufacturing order books across EU and traditional destination markets.' },
    { feature: 'Real Cost of Corporate Borrowing', contribution: -0.06, percentage: '6%', direction: 'downward', details: 'High real interest rates creating hurdle rates for private brownfield capex expansion.' }
  ],

  explanation: {
    what: 'The forecasting engine projects Indian real GDP growth to maintain robust momentum, accelerating from 7.4% to 7.6% next quarter and reaching 8.1% by 2027 Q1 before stabilizing near 7.9%.',
    why: 'The primary positive drivers identified by the model are high public infrastructure outlays (+38% SHAP share), expanding IT/services export surplus (+24%), and banking system credit recovery (+14%). Downward drags stem from sluggish merchandise exports (-10%).',
    soWhat: 'While aggregate GDP expansion is strong, household benefits depend heavily on whether real wage growth reaches informal rural workers rather than remaining confined to formal tech and capital sectors.',
    caveat: 'Model estimates reflect historical empirical elasticity under current fiscal policies. Global oil spikes or external geopolitical fragmentation could depress output below the central trajectory.'
  }
};

// Target 2: CPI Inflation Forecast Trajectory (Multi-Horizon 1Q to 8Q)
export const CPI_FORECAST_DATA = {
  targetId: 'cpi',
  targetName: 'CPI Inflation Rate (% YoY)',
  shortName: 'CPI Inflation',
  unit: '% YoY',
  currentValue: 3.8,
  currentPeriod: '2026 Q2',
  baselineMean: 4.8,
  historicalTrend: 'Headline inflation has safely moderated into the RBI tolerance band (4±2%), driven by normal monsoon yields and stable global crude oil benchmarks.',

  horizons: [
    { id: '1Q', label: 'Next Quarter (2026 Q3)', forecast: 4.1, lower80: 3.6, upper80: 4.6, lower95: 3.2, upper95: 5.0 },
    { id: '2Q', label: '2 Quarters (2026 Q4)', forecast: 4.4, lower80: 3.8, upper80: 5.0, lower95: 3.3, upper95: 5.5 },
    { id: '4Q', label: '4 Quarters (2027 Q1)', forecast: 4.8, lower80: 4.0, upper80: 5.6, lower95: 3.5, upper95: 6.2 },
    { id: '8Q', label: '8 Quarters (2028 Q2)', forecast: 4.6, lower80: 3.7, upper80: 5.8, lower95: 3.1, upper95: 6.6 }
  ],

  // Model-specific central forecasts for comparison
  modelPredictions: {
    tft: { name: 'Temporal Fusion Transformer', next1Q: 4.1, next4Q: 4.8, next8Q: 4.6, color: '#000080' },
    xgb: { name: 'XGBoost Regressor', next1Q: 4.0, next4Q: 4.7, next8Q: 4.5, color: '#FF9933' },
    rf: { name: 'Random Forest', next1Q: 3.9, next4Q: 4.5, next8Q: 4.4, color: '#138808' },
    lstm: { name: 'LSTM Recurrent Net', next1Q: 4.2, next4Q: 4.9, next8Q: 4.7, color: '#7c3aed' },
    arima: { name: 'ARIMA / VAR Baseline', next1Q: 3.9, next4Q: 4.3, next8Q: 4.2, color: '#6b7280' }
  },

  // Full timeline series for chart (historical actuals + future forecast horizons)
  timeline: [
    { period: '2024 Q1', actual: 5.1, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2024 Q2', actual: 4.8, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2024 Q3', actual: 4.5, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2024 Q4', actual: 4.6, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2025 Q1', actual: 4.3, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2025 Q2', actual: 4.1, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2025 Q3', actual: 4.2, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2025 Q4', actual: 4.0, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2026 Q1', actual: 3.9, forecast: null, lower80: null, upper80: null, lower95: null, upper95: null },
    { period: '2026 Q2', actual: 3.8, forecast: 3.8, lower80: 3.8, upper80: 3.8, lower95: 3.8, upper95: 3.8 }, // Anchor NOW
    { period: '2026 Q3 (F)', actual: null, forecast: 4.1, lower80: 3.6, upper80: 4.6, lower95: 3.2, upper95: 5.0, arima: 3.9, xgb: 4.0, lstm: 4.2 },
    { period: '2026 Q4 (F)', actual: null, forecast: 4.4, lower80: 3.8, upper80: 5.0, lower95: 3.3, upper95: 5.5, arima: 4.1, xgb: 4.3, lstm: 4.5 },
    { period: '2027 Q1 (F)', actual: null, forecast: 4.8, lower80: 4.0, upper80: 5.6, lower95: 3.5, upper95: 6.2, arima: 4.3, xgb: 4.7, lstm: 4.9 },
    { period: '2027 Q2 (F)', actual: null, forecast: 4.7, lower80: 3.9, upper80: 5.6, lower95: 3.3, upper95: 6.3, arima: 4.2, xgb: 4.6, lstm: 4.8 },
    { period: '2027 Q3 (F)', actual: null, forecast: 4.5, lower80: 3.7, upper80: 5.5, lower95: 3.2, upper95: 6.3, arima: 4.2, xgb: 4.4, lstm: 4.6 },
    { period: '2027 Q4 (F)', actual: null, forecast: 4.7, lower80: 3.8, upper80: 5.7, lower95: 3.2, upper95: 6.5, arima: 4.3, xgb: 4.5, lstm: 4.8 },
    { period: '2028 Q1 (F)', actual: null, forecast: 4.8, lower80: 3.8, upper80: 5.8, lower95: 3.2, upper95: 6.6, arima: 4.3, xgb: 4.6, lstm: 4.9 },
    { period: '2028 Q2 (F)', actual: null, forecast: 4.6, lower80: 3.7, upper80: 5.8, lower95: 3.1, upper95: 6.6, arima: 4.2, xgb: 4.5, lstm: 4.7 }
  ],

  // CPI Inflation Specific SHAP Feature Contributions
  shapAttributions: [
    { feature: 'Food & Agricultural Mandi Price Cycles', contribution: +0.32, percentage: '32%', direction: 'upward', details: 'Seasonal pulse and vegetable arrival variations causing episodic price spikes in headline basket.' },
    { feature: 'Global Crude Oil & Imported Energy Benchmarks', contribution: +0.22, percentage: '22%', direction: 'upward', details: 'Imported crude oil fluctuations passed through into domestic transport freight and petrochemical inputs.' },
    { feature: 'Monetary Policy Rate Pass-Through Lag', contribution: -0.20, percentage: '20%', direction: 'downward', details: 'Past policy repo rate stance cooling aggregate demand and consumer borrowing.' },
    { feature: 'Domestic Urban Consumer Demand Pressure', contribution: +0.14, percentage: '14%', direction: 'upward', details: 'Post-disinflation services and discretionary spending creating modest demand-pull pressure.' },
    { feature: 'Exchange Rate Dynamics (USD/INR Pass-Through)', contribution: +0.08, percentage: '8%', direction: 'upward', details: 'Slight rupee depreciation raising landed costs of imported machinery, edible oils, and electronics.' },
    { feature: 'Supply Chain Logistics & Digital Freight Efficiency', contribution: -0.04, percentage: '4%', direction: 'downward', details: 'Dedicated freight corridors and GST electronic waybill efficiency reducing inter-state transit markups.' }
  ],

  explanation: {
    what: 'The forecasting engine projects headline CPI inflation to rise moderately from 3.8% to 4.1% next quarter, reaching 4.8% by 2027 Q1 before stabilizing near 4.6%, remaining comfortably within the 4±2% target corridor.',
    why: 'Key upward contributions come from periodic seasonal food supply swings (+32% SHAP share), global energy price uncertainty (+22%), and resilient urban discretionary demand (+14%). The primary downward anchor is the lagged discipline of monetary policy (-20%).',
    soWhat: 'A projected 4.1% to 4.8% inflation trajectory represents manageable price increases, allowing real wage growth (+2.4%) to remain positive and protecting household purchasing power.',
    caveat: 'Inflation forecasts exhibit widening prediction intervals (4.0%–5.6% at 4 quarters). Unfavourable weather events (El Niño/monsoon deficits) represent asymmetric upside tail risk.'
  }
};

// Growth vs Price Stability (GDP vs CPI Cross-Indicator Synchronized Timeline)
export const GROWTH_VS_INFLATION_TIMELINE = [
  { period: '2023 Q1', gdp: 7.1, cpi: 5.7, regime: 'High Inflation Burden', desc: 'CPI at 5.7% eroded household purchasing power while GDP grew at 7.1%.' },
  { period: '2023 Q2', gdp: 7.8, cpi: 5.4, regime: 'Early Disinflation', desc: 'GDP surged to 7.8% as public capex kicked in while inflation began gradual cooling.' },
  { period: '2023 Q3', gdp: 7.6, cpi: 5.1, regime: 'Growth with Disinflation', desc: 'Services exports cushioned output while food prices stabilized.' },
  { period: '2023 Q4', gdp: 8.2, cpi: 5.5, regime: 'Strong Output Surge', desc: 'Peak quarterly GDP growth of 8.2% with temporary festival food price uptick.' },
  { period: '2024 Q1', gdp: 7.8, cpi: 5.1, regime: 'Sustained Expansion', desc: 'High manufacturing growth and moderating core inflation.' },
  { period: '2024 Q2', gdp: 7.4, cpi: 4.8, regime: 'Target Re-entry', desc: 'Headline CPI fell below 5% into the comfort band.' },
  { period: '2024 Q3', gdp: 7.2, cpi: 4.5, regime: 'Cooling Price Pressure', desc: 'Commodity cooling helped both industrial margins and consumer sentiment.' },
  { period: '2024 Q4', gdp: 7.5, cpi: 4.6, regime: 'Stable Equilibrium', desc: 'Strong rural demand post-monsoon supported 7.5% GDP.' },
  { period: '2025 Q1', gdp: 7.3, cpi: 4.3, regime: 'Goldilocks Phase', desc: 'Solid growth with low inflation.' },
  { period: '2025 Q2', gdp: 7.4, cpi: 4.1, regime: 'Goldilocks Phase', desc: 'Rate cuts initiated as inflation firmly anchored.' },
  { period: '2025 Q3', gdp: 7.5, cpi: 4.2, regime: 'Accommodative Stance', desc: 'Monetary easing supported banking credit growth.' },
  { period: '2025 Q4', gdp: 7.3, cpi: 4.0, regime: 'Target Alignment', desc: 'Inflation hits exact 4.0% RBI target anchor.' },
  { period: '2026 Q1', gdp: 7.4, cpi: 3.9, regime: 'Sub-4% Disinflation', desc: 'Favourable supply chain logistics and grain buffer stocks.' },
  { period: '2026 Q2', gdp: 7.4, cpi: 3.8, regime: 'Current Observation (NOW)', desc: 'Current benchmark: High growth (7.4%) alongside mild inflation (3.8%).' },
  // Forecasted Synchronized Periods
  { period: '2026 Q3 (F)', gdpForecast: 7.6, cpiForecast: 4.1, regime: 'Forecasted Expansion', desc: 'Output accelerates slightly as consumption improves, modest inflation uptick.' },
  { period: '2026 Q4 (F)', gdpForecast: 7.8, cpiForecast: 4.4, regime: 'Forecasted Expansion', desc: 'Strong seasonal capex delivery; food cycles push CPI to 4.4%.' },
  { period: '2027 Q1 (F)', gdpForecast: 8.1, cpiForecast: 4.8, regime: 'Demand Expansion Phase', desc: 'Peak projected growth (8.1%) accompanied by higher price pressure (4.8%).' },
  { period: '2027 Q2 (F)', gdpForecast: 7.9, cpiForecast: 4.7, regime: 'Balanced Moderate Phase', desc: 'Growth stabilizes near 7.9%, inflation plateauing around 4.7%.' }
];

// Interactive Transmission Channels between GDP and Inflation
export const TRANSMISSION_REGIMES = [
  {
    id: 'demand_pull',
    title: 'Demand-Pull Channel (Growth → Price Pressure)',
    summary: 'Higher domestic economic growth pushes capacity utilization near maximum, leading to wage competition and demand-side price increases.',
    nodes: [
      { step: '1. Economic Activity Accelerates', detail: 'Public capex and corporate investment stimulate business expansion and hiring.' },
      { step: '2. Capacity Tightening', detail: 'Factory capacity utilization exceeds 76%, putting upward pressure on intermediate input prices.' },
      { step: '3. Consumer Demand Rises', detail: 'Higher formal wages and household optimism boost private discretionary purchases.' },
      { step: '4. Consumer Price Pressure', detail: 'Retailers pass through input costs, lifting core CPI inflation rate.' },
      { step: '5. Monetary Policy Response', detail: 'Central bank evaluates rate policy to keep inflation expectations anchored.' }
    ]
  },
  {
    id: 'cost_push',
    title: 'Supply-Side Shock Channel (Input Costs → Inflation → Squeezed Growth)',
    summary: 'External energy or agricultural weather shocks inflate input costs, eroding household purchasing power and acting as a brake on output.',
    nodes: [
      { step: '1. Commodity / Weather Shock', detail: 'Global crude oil increases or unseasonal rains disrupt crop harvests.' },
      { step: '2. Immediate Food / Fuel Inflation', detail: 'Food and fuel components spike rapidly in the consumer price index.' },
      { step: '3. Real Purchasing Power Squeezed', detail: 'Households spend a greater share on essentials, cutting discretionary consumption.' },
      { step: '4. Corporate Margin Compression', detail: 'Enterprises absorb higher freight and power costs, dampening hiring and capex.' },
      { step: '5. GDP Growth Deceleration', detail: 'Aggregate demand cools down until input supply chains normalize.' }
    ]
  },
  {
    id: 'monetary_tightening',
    title: 'Monetary Transmission Channel (Policy Rate → Credit → Inflation & Output)',
    summary: 'The central bank policy repo rate influences commercial lending costs with a 6 to 18-month transmission lag.',
    nodes: [
      { step: '1. Benchmark Repo Rate Hike', detail: 'MPC raises policy rate by 50 bps to contain sustained inflation expectations.' },
      { step: '2. Banking Cost of Funds Rises', detail: 'Commercial banks increase deposit rates and Marginal Cost of Funds (MCLR).' },
      { step: '3. Borrowing & Credit Slowdown', detail: 'Housing mortgages, vehicle loans, and small business credit demand moderate.' },
      { step: '4. Demand-Side Cooling', detail: 'Purchasing power pressure subsides; retailers moderate price markups.' },
      { step: '5. Disinflation Achieved', detail: 'CPI returns to target, creating space for subsequent calibrated monetary easing.' }
    ]
  },
  {
    id: 'productivity_expansion',
    title: 'Supply-Side Expansion Channel (Logistics & Tech → High Growth + Low Inflation)',
    summary: 'Productivity and logistics upgrades expand the economy\'s non-inflationary speed limit (potential GDP).',
    nodes: [
      { step: '1. Digital & Physical Infrastructure', detail: 'Freight corridors, ports, 5G networks, and unified tax logistics reduce transit friction.' },
      { step: '2. Non-Agricultural Productivity Rises', detail: 'Output per worker increases, enabling enterprises to produce more at lower unit cost.' },
      { step: '3. Real Non-Inflationary Growth', detail: 'GDP expands rapidly at 7.5%+ without igniting demand-pull inflationary bottlenecks.' },
      { step: '4. Household Real Wage Expansion', detail: 'Wages rise while consumer price levels remain stable, maximizing household welfare.' },
      { step: '5. Virtuous Macro Equilibrium', detail: 'Sovereign tax revenues surge while fiscal deficit naturally contracts.' }
    ]
  }
];
