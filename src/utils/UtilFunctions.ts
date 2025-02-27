export const minLoanAmount: number = 50000;
export const maxLoanAmount: number = 95000;

// Type definitions for payment periods and chart scale options
type Period = 'weekly' | 'fortnightly' | 'monthly';
type ChartScale = 'week' | 'fortnight' | 'month' | 'year';

/**
 * Calculates the periodic payment amount for a loan based on the given parameters.
 * Uses the compound interest formula: PMT = P * (r(1+r)^n) / ((1+r)^n - 1)
 * 
 * @param loanAmount - The principal loan amount
 * @param interestRate - Annual interest rate as a percentage
 * @param years - Loan term in years
 * @param period - Payment frequency (weekly, fortnightly, or monthly)
 * @returns The periodic payment amount
 */
export const calculatePayments = (loanAmount: number, interestRate: number, years: number, period: Period): number => {
  // Define number of payment periods per year for each payment frequency
  const periodsPerYear = {
    weekly: 52,
    fortnightly: 26,
    monthly: 12
  };

  // Calculate total number of payments and periodic interest rate
  const totalPeriods = years * periodsPerYear[period];
  const periodicRate = (interestRate / 100) / periodsPerYear[period];
  
  // Calculate payment using compound interest formula
  const payment = loanAmount * (periodicRate * Math.pow(1 + periodicRate, totalPeriods)) / (Math.pow(1 + periodicRate, totalPeriods) - 1);

  return payment;
};

/**
 * Calculates the total number of periods for chart display based on the selected time scale.
 * 
 * @param years - Loan term in years
 * @param chartScale - Selected time scale for chart display
 * @returns Total number of periods to display on the chart
 */
export const calculateTotalPeriods = (years: number, chartScale: ChartScale): number => {
  return chartScale === 'year' ? years : 
         chartScale === 'month' ? years * 12 :
         chartScale === 'fortnight' ? years * 26 :
         years * 52;
};

/**
 * Generates data for the payment breakdown chart, calculating principal and interest
 * portions for each payment period.
 * 
 * @param loanAmount - The principal loan amount
 * @param interestRate - Annual interest rate as a percentage
 * @param years - Loan term in years
 * @param period - Payment frequency
 * @param chartScale - Time scale for chart display
 * @returns Array of objects containing period number and payment breakdown
 */
export const generateChartData = (loanAmount: number, interestRate: number, years: number, period: Period, chartScale: ChartScale) => {
  // Calculate periodic payment amount
  const payment = calculatePayments(loanAmount, interestRate, years, period);
  const data = [];
  let remainingBalance = loanAmount;
  
  // Define payment periods per year
  const periodsPerYear = {
    weekly: 52,
    fortnightly: 26,
    monthly: 12
  };

  // Calculate total periods and periodic interest rate
  const totalPeriods = calculateTotalPeriods(years, chartScale);
  const periodInterestRate = (interestRate / 100) / periodsPerYear[period];

  // Generate payment breakdown for each period
  for (let i = 1; i <= totalPeriods; i++) {
    // Calculate interest and principal portions of payment
    const periodInterest = remainingBalance * periodInterestRate;
    const periodPrincipal = payment - periodInterest;
    remainingBalance -= periodPrincipal;

    // Add period data to chart dataset
    data.push({
      period: i,
      Principal: Number(periodPrincipal.toFixed(2)),
      Interest: Number(periodInterest.toFixed(2))
    });
  }

  return data;
};

/**
 * Validates user input values against predefined ranges.
 * 
 * @param loanAmount - Must be between 50,000 and 950,000
 * @param interestRate - Must be between 5% and 7%
 * @param years - Must be between 5 and 30 years
 * @returns Boolean indicating whether all inputs are valid
 */
export const validateInputs = (loanAmount: number, interestRate: number, years: number): boolean => {
  return loanAmount >= minLoanAmount && 
         loanAmount <= maxLoanAmount && 
         interestRate >= 5 && 
         interestRate <= 7 && 
         years >= 5 && 
         years <= 30;
};

export const numberWithCommas = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const switchTrackBackgroundColour: string = '#d6d7dc';   // For Dark/Light Mode Toggles