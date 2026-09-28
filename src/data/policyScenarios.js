// Policy Scenario Lab Models & Transmission Channels
// Strictly non-partisan conditional macroeconomic scenario simulator.
// All values are simulated demonstration values (DEMO DATA).

export const POLICY_SCENARIOS = {
  interest_rate_hike: {
    id: 'interest_rate_hike',
    name: 'Policy Interest Rate Adjustment (+0.50% / +50 bps)',
    category: 'Monetary Policy',
    parameter: 'Repo Rate',
    currentVal: '5.75%',
    simulatedVal: '6.25%',
    multiplier: 1.0,
    transmissionNodes: [
      { id: 'step1', title: 'Repo Rate Increases (+50 bps)', type: 'primary', desc: 'Central bank increases benchmark repo interest rate to contain aggregate demand.' },
      { id: 'step2', title: 'Commercial Lending Rates Rise', type: 'intermediary', desc: 'Banks pass through higher borrowing costs to corporate credit, housing mortgages, and auto loans.' },
      { id: 'step3', title: 'Credit Growth & Private CapEx Moderates', type: 'intermediary', desc: 'Higher cost of capital reduces marginal corporate borrowing and project expansion.' },
      { id: 'step4', title: 'Discretionary Spending Adjusts', type: 'intermediary', desc: 'Higher debt servicing costs lead households to curb non-essential discretionary consumption.' },
      { id: 'step5', title: 'Inflationary Demand Pressure Cools', type: 'outcome', desc: 'Slower aggregate demand growth helps curb core inflation expectations over 4-6 quarters.' }
    ],
    counterEffects: [
      { effect: 'Private Investment Drag', desc: 'Higher cost of capital may cause businesses to defer capital expansion projects.' },
      { effect: 'Housing & Auto Demand Deceleration', desc: 'Interest-rate sensitive sectors experience immediate sales volume moderation.' },
      { effect: 'Government Sovereign Borrowing Costs Rise', desc: 'New sovereign bond issuances carry higher yields, increasing the government debt servicing burden.' }
    ],
    estimatedImpacts: {
      cpiInflation: { change: '-0.35%', range: '(-0.20% to -0.50%)', direction: 'down', confidence: 'Medium' },
      gdpGrowth: { change: '-0.25%', range: '(-0.10% to -0.40%)', direction: 'down', confidence: 'High' },
      creditGrowth: { change: '-1.40%', range: '(-0.80% to -2.00%)', direction: 'down', confidence: 'High' },
      privateInvestment: { change: '-1.20%', range: '(-0.60% to -1.80%)', direction: 'down', confidence: 'Medium' },
      fiscalDeficit: { change: '+0.10%', range: '(0.00% to +0.20%)', direction: 'up', confidence: 'Low' }
    },
    assumptions: 'Assumes steady international commodity prices, stable exchange rates, and normal monsoon conditions over 4–6 quarters.',
    limitations: 'Monetary transmission efficiency varies based on banking liquidity buffers, non-performing assets, and credit demand elasticity.'
  },
  capex_expansion: {
    id: 'capex_expansion',
    name: 'Public Infrastructure Investment Expansion (+1.0% GDP)',
    category: 'Fiscal Policy',
    parameter: 'Public CapEx % GDP',
    currentVal: '3.4% GDP',
    simulatedVal: '4.4% GDP',
    multiplier: 1.0,
    transmissionNodes: [
      { id: 'step1', title: 'Public Infrastructure Outlay Increases (+1% GDP)', type: 'primary', desc: 'Government expands budgetary allocations for dedicated freight corridors, ports, highways, and energy.' },
      { id: 'step2', title: 'Order Books & Industrial Procurement Surge', type: 'intermediary', desc: 'Increased procurement demand for steel, cement, heavy machinery, and civil engineering services.' },
      { id: 'step3', title: 'Heavy Construction & Logistics Hiring', type: 'intermediary', desc: 'Direct employment creation in infrastructure construction expands semi-skilled wage income.' },
      { id: 'step4', title: 'Logistics Cost & Freight Transit Friction Falls', type: 'intermediary', desc: 'Upgraded transport networks permanently reduce inter-state logistics costs for private industry.' },
      { id: 'step5', title: 'Potential Real GDP Growth Accelerated', type: 'outcome', desc: 'High infrastructure fiscal multiplier permanently expands aggregate non-inflationary productive capacity.' }
    ],
    counterEffects: [
      { effect: 'Short-Term Fiscal Deficit Expansion', desc: 'Without matching tax revenue collection, sovereign fiscal deficit widens by ~0.7% of GDP.' },
      { effect: 'Sovereign Bond Yield Crowding-Out Risk', desc: 'Increased government borrowing can push benchmark yields higher, raising corporate debt financing costs.' },
      { effect: 'Capital Goods Import Surge', desc: 'Specialized industrial equipment imports can widen short-term merchandise trade deficits.' }
    ],
    estimatedImpacts: {
      gdpGrowth: { change: '+0.65%', range: '(+0.45% to +0.85%)', direction: 'up', confidence: 'High' },
      cpiInflation: { change: '+0.15%', range: '(0.00% to +0.30%)', direction: 'up', confidence: 'Medium' },
      constructionJobs: { change: '+2.10%', range: '(+1.50% to +2.70%)', direction: 'up', confidence: 'High' },
      fiscalDeficit: { change: '+0.70%', range: '(+0.50% to +0.90%)', direction: 'up', confidence: 'High' },
      privateInvestment: { change: '+0.40%', range: '(+0.10% to +0.70%)', direction: 'up', confidence: 'Medium' }
    },
    assumptions: 'Assumes rapid project execution without severe land acquisition bottlenecks or inter-state regulatory disputes.',
    limitations: 'The fiscal multiplier is non-linear: when factory capacity utilization is already high, excess stimulus leaks into short-term inflation rather than real output.'
  },
  transfer_spending: {
    id: 'transfer_spending',
    name: 'Targeted Rural & Social Transfer Expansion (+0.5% GDP)',
    category: 'Fiscal & Welfare Policy',
    parameter: 'Social Transfers % GDP',
    currentVal: '1.8% GDP',
    simulatedVal: '2.3% GDP',
    multiplier: 1.0,
    transmissionNodes: [
      { id: 'step1', title: 'Targeted Direct Benefit Transfers Expand', type: 'primary', desc: 'Increased direct bank transfers to rural agricultural households and low-income informal earners.' },
      { id: 'step2', title: 'Immediate Consumer Liquidity Influx', type: 'intermediary', desc: 'Cash transfers with high marginal propensity to consume (MPC ~0.85) enter retail circulation.' },
      { id: 'step3', title: 'FMCG & Essential Goods Demand Rises', type: 'intermediary', desc: 'Surge in rural retail sales for staples, clothing, healthcare, and educational supplies.' },
      { id: 'step4', title: 'Informal Economy Purchasing Power Protected', type: 'intermediary', desc: 'Buffers consumption floors during periods of crop yield or climate-related rural income shocks.' },
      { id: 'step5', title: 'Consumption-Led Output Supported', type: 'outcome', desc: 'Immediate consumption-driven GDP growth support alongside lower poverty vulnerability.' }
    ],
    counterEffects: [
      { effect: 'Temporary Food Demand Pressure', desc: 'Rapid rural demand expansion can cause short-term local food price spikes in perishable items.' },
      { effect: 'Revenue Expenditure vs CapEx Trade-off', desc: 'Welfare transfers do not build physical capital assets, yielding lower long-term productivity multipliers than CapEx.' },
      { effect: 'Fiscal Subsidy Burden Accumulation', desc: 'Recurring entitlement transfers are politically challenging to roll back during future fiscal consolidation phases.' }
    ],
    estimatedImpacts: {
      gdpGrowth: { change: '+0.30%', range: '(+0.15% to +0.45%)', direction: 'up', confidence: 'High' },
      cpiInflation: { change: '+0.25%', range: '(+0.10% to +0.40%)', direction: 'up', confidence: 'Medium' },
      ruralConsumption: { change: '+1.80%', range: '(+1.20% to +2.40%)', direction: 'up', confidence: 'High' },
      fiscalDeficit: { change: '+0.50%', range: '(+0.40% to +0.60%)', direction: 'up', confidence: 'High' },
      povertyVulnerability: { change: '-1.50%', range: '(-1.00% to -2.00%)', direction: 'down', confidence: 'High' }
    },
    assumptions: 'Assumes high biometric DBT Aadhaar delivery accuracy without significant leakages.',
    limitations: 'Consumption stimulus does not address structural supply-side logistics or industrial manufacturing bottlenecks.'
  },
  tax_rationalization: {
    id: 'tax_rationalization',
    name: 'Corporate & Direct Tax Rationalization (-1.0% Effective Rate)',
    category: 'Fiscal & Taxation Policy',
    parameter: 'Effective Direct Tax Rate',
    currentVal: '22.0%',
    simulatedVal: '21.0%',
    multiplier: 1.0,
    transmissionNodes: [
      { id: 'step1', title: 'Effective Direct Tax Rate Moderates', type: 'primary', desc: 'Calibrated reduction in corporate tax surcharge and simplified compliance thresholds.' },
      { id: 'step2', title: 'Post-Tax Corporate Cash Flows Expand', type: 'intermediary', desc: 'Higher retained earnings improve corporate balance sheet resilience and internal accruals.' },
      { id: 'step3', title: 'Private Brownfield & Greenfield Capex Incentivized', type: 'intermediary', desc: 'Improved net present value (NPV) on investment hurdles spurs private factory installations.' },
      { id: 'step4', title: 'FDI Inflows & Global Supply Chain Relocation', type: 'intermediary', desc: 'Enhanced international tax competitiveness attracts foreign manufacturing direct investment.' },
      { id: 'step5', title: 'Medium-Term Corporate Tax Base Expansion', type: 'outcome', desc: 'Laffer-curve effect: higher compliance and industrial output gradually restore nominal tax buoyancy.' }
    ],
    counterEffects: [
      { effect: 'Initial Year Tax Revenue Shortfall', desc: 'Direct tax collection drops by ~0.3% of GDP during the initial 12–18 month transition window.' },
      { effect: 'Corporate Dividend vs Reinvestment Uncertainty', desc: 'Companies may choose to distribute retained earnings via dividends or buybacks rather than building real capital.' },
      { effect: 'Distributional Equity Sensitivity', desc: 'Corporate tax relief can face public scrutiny if personal income tax or indirect GST burdens are perceived as unequal.' }
    ],
    estimatedImpacts: {
      gdpGrowth: { change: '+0.40%', range: '(+0.20% to +0.60%)', direction: 'up', confidence: 'Medium' },
      cpiInflation: { change: '+0.05%', range: '(-0.05% to +0.15%)', direction: 'flat', confidence: 'High' },
      privateInvestment: { change: '+1.60%', range: '(+0.90% to +2.30%)', direction: 'up', confidence: 'Medium' },
      fdiInflows: { change: '+2.40%', range: '(+1.50% to +3.30%)', direction: 'up', confidence: 'Medium' },
      fiscalDeficit: { change: '+0.30%', range: '(+0.15% to +0.45%)', direction: 'up', confidence: 'High' }
    },
    assumptions: 'Assumes stable global geopolitical risk environment and transparent corporate governance frameworks.',
    limitations: 'Private investment response is sensitive to end-demand expectations; tax cuts during global recessions are often saved rather than invested.'
  }
};
