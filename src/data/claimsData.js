// Claim Check Registry for Economic Literacy Evaluation
// Explicitly non-partisan rating scale:
// - SUPPORTED BY AVAILABLE EVIDENCE
// - PARTIALLY SUPPORTED
// - NEEDS CONTEXT
// - MISLEADING / NEEDS CONTEXT

export const CLAIMS_DATABASE = [
  {
    id: 'claim-1',
    claim: 'Inflation has fallen, so prices have fallen.',
    category: 'Prices & Purchasing Power',
    rating: 'MISLEADING / NEEDS CONTEXT',
    ratingColor: 'amber',
    summary: 'Conflates the rate of change (inflation) with the absolute price level.',
    whatDataSays: 'The CPI inflation rate decreased from 7.1% (2022) to 3.8% (2026).',
    whatDataDoesNotImply: 'It does NOT imply that price levels decreased or returned to 2021 levels.',
    explanation: 'Inflation measures the velocity at which prices are rising. When inflation drops from 7% to 3.8%, prices are still rising, but at a slower pace. A reduction in absolute price levels is called "deflation", which is extremely rare in broad consumer baskets.',
    literacyKey: 'Rate of Change vs Absolute Level',
    relevantMetrics: ['CPI Inflation Rate', 'Consumer Price Index (Base Level)', 'Food Price Index'],
    chartData: [
      { year: '2021', cpiLevel: 100, inflationRate: 5.2 },
      { year: '2022', cpiLevel: 107.1, inflationRate: 7.1 },
      { year: '2023', cpiLevel: 112.9, inflationRate: 5.4 },
      { year: '2024', cpiLevel: 118.3, inflationRate: 4.8 },
      { year: '2025', cpiLevel: 123.1, inflationRate: 4.1 },
      { year: '2026', cpiLevel: 127.8, inflationRate: 3.8 }
    ],
    alternativeExplanations: [
      'Disinflation means positive price growth at a decelerating rate.',
      'Household budgets continue to pay higher absolute prices accrued during previous high-inflation spikes.'
    ],
    limitations: 'CPI index weights may not reflect individual household consumption baskets (e.g. higher health or education expenditure).'
  },
  {
    id: 'claim-2',
    claim: 'GDP increased by 7.4%, therefore everyone in the country became richer.',
    category: 'Output & Distribution',
    rating: 'PARTIALLY SUPPORTED',
    ratingColor: 'blue',
    summary: 'GDP measures total national economic output, not individual wealth or income distribution.',
    whatDataSays: 'Aggregate real output expanded by 7.4% year-on-year.',
    whatDataDoesNotImply: 'Does not guarantee uniform income gains across income brackets, sectors, or geographies.',
    explanation: 'Real GDP measures aggregate gross value produced within the domestic territory. How that value is distributed depends on capital vs labour shares, formal vs informal sector absorption, and regional industrial density. Aggregate output growth can occur while low-income real wages remain stagnant.',
    literacyKey: 'Aggregate Output vs Distributional Reality',
    relevantMetrics: ['Real GDP Growth', 'Real Wage Growth', 'Palma Disparity Index', 'Rural Consumption Index'],
    chartData: [
      { year: '2022', gdpGrowth: 7.9, wageGrowth: -0.6 },
      { year: '2023', gdpGrowth: 7.6, wageGrowth: 0.8 },
      { year: '2024', gdpGrowth: 7.4, wageGrowth: 1.5 },
      { year: '2025', gdpGrowth: 7.4, wageGrowth: 2.1 },
      { year: '2026', gdpGrowth: 7.4, wageGrowth: 2.4 }
    ],
    alternativeExplanations: [
      'Capital-intensive growth (tech, manufacturing, financial services) can boost GDP rapidly without generating proportional low-skill employment.',
      'Informal economy workers may not capture formal corporate sector profit expansion.'
    ],
    limitations: 'GDP excludes non-market unpaid domestic care work and informal sector unrecorded transactions.'
  },
  {
    id: 'claim-3',
    claim: 'Government capital expenditure spending caused recent consumer inflation.',
    category: 'Fiscal & Inflation Dynamics',
    rating: 'NEEDS CONTEXT',
    ratingColor: 'indigo',
    summary: 'Statistical correlation between public CapEx and CPI does not establish direct supply-side or demand causation.',
    whatDataSays: 'Public capital spending grew 18% while CPI spiked to 7.1% during 2022 before cooling to 3.8%.',
    whatDataDoesNotImply: 'Does not prove public infrastructure spending caused inflation; global supply shocks occurred simultaneously.',
    explanation: 'Public capital expenditure expands infrastructure capacity, which can actually lower transport and logistics costs over the long run (reducing cost-push inflation). In the short run, if CapEx is funded by monetized deficits during tight capacity, it can expand aggregate demand. However, econometric decomposition shows 2022 inflation was predominantly driven by global food and energy supply shocks.',
    literacyKey: 'Correlation vs Causation & Supply vs Demand',
    relevantMetrics: ['Public CapEx Growth', 'CPI Food & Energy Inflation', 'Global Oil Index', 'Fiscal Deficit'],
    chartData: [
      { year: '2021', capex: 8.5, inflation: 5.2, globalOil: 70 },
      { year: '2022', capex: 12.4, inflation: 7.1, globalOil: 100 },
      { year: '2023', capex: 15.0, inflation: 5.4, globalOil: 82 },
      { year: '2024', capex: 17.2, inflation: 4.8, globalOil: 78 },
      { year: '2025', capex: 18.8, inflation: 4.1, globalOil: 74 },
      { year: '2026', capex: 20.1, inflation: 3.8, globalOil: 72 }
    ],
    alternativeExplanations: [
      'Global energy price shocks triggered imported inflation regardless of domestic budget allocation.',
      'Infrastructure spending creates long-term supply capacity that mitigates structural bottlenecks.'
    ],
    limitations: 'Statistical feature importance models measure predictive association, not structural economic counterfactuals.'
  },
  {
    id: 'claim-4',
    claim: 'Raising interest rates instantly lowers inflation without affecting employment.',
    category: 'Monetary Transmission',
    rating: 'EVIDENCE INSUFFICIENT',
    ratingColor: 'rose',
    summary: 'Ignores monetary transmission lags (6-18 months) and potential trade-offs in investment and job creation.',
    whatDataSays: 'Repo rate hikes from 4.00% to 6.50% were followed by disinflation after a multi-quarter lag.',
    whatDataDoesNotImply: 'Does not imply rate hikes have zero impact on business credit demand or hiring expansion.',
    explanation: 'Monetary policy operates through transmission channels: higher policy rates increase commercial borrowing costs, dampening credit demand and private investment. This cools aggregate demand over several quarters, eventually curbing pricing power. However, reduced investment can slow job creation in credit-sensitive sectors like construction and manufacturing.',
    literacyKey: 'Policy Transmission Lags & Trade-offs',
    relevantMetrics: ['Repo Rate', 'Credit Growth', 'Private Investment', 'Unemployment Rate'],
    chartData: [
      { year: '2022 Q1', rate: 4.0, credit: 9.8, inflation: 6.4 },
      { year: '2022 Q3', rate: 5.4, credit: 11.2, inflation: 6.8 },
      { year: '2023 Q1', rate: 6.5, credit: 12.8, inflation: 5.7 },
      { year: '2024 Q1', rate: 6.5, credit: 14.1, inflation: 5.1 },
      { year: '2025 Q1', rate: 6.25, credit: 13.8, inflation: 4.3 }
    ],
    alternativeExplanations: [
      'Monetary policy cannot directly fix supply-side food or monsoon disruptions.',
      'Excessive tightening risks slowing economic output before inflation targets are reached.'
    ],
    limitations: 'Transmission speed depends on bank balance sheet liquidity and interest rate pass-through efficiency.'
  }
];
