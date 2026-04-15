import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  ThemeProvider,
  Box
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LoanInputForm from './components/LoanInputForm/LoanInputForm';
import PaymentBreakdown from './components/PaymentBreakdown/PaymentBreakdown';
import DarkModeToggle from './components/shared/DarkModeToggle/DarkModeToggle';
import getTheme from './theme/theme';

type Period = 'weekly' | 'fortnightly' | 'monthly';
type ChartScale = 'week' | 'month' | 'year';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import {minLoanAmount, minInterest, validateInputs, calculatePayments as calcPayments, generateAmortisationData} from './utils/UtilFunctions';


/**
 * Main App component for the Loan Calculator application.
 * Manages the state and calculations for loan payments, interest rates,
 * and payment schedules. Provides a user interface for input and visualization.
 */
function App() {
  // Default values for loan parameters
  const defaultValues = {
    loanAmount: minLoanAmount,
    interestRate: minInterest,
    years: 5,
    period: 'monthly' as Period,
    chartScale: 'year' as ChartScale
  };

  // State management for loan parameters and chart display
  const [loanAmount, setLoanAmount] = useState<number>(() => {
    const saved = localStorage.getItem('loanAmount');
    return saved ? Number(saved) : defaultValues.loanAmount;
  });
  const [interestRate, setInterestRate] = useState<number>(() => {
    const saved = localStorage.getItem('interestRate');
    return saved ? Number(saved) : defaultValues.interestRate;
  });
  const [years, setYears] = useState<number>(() => {
    const saved = localStorage.getItem('years');
    return saved ? Number(saved) : defaultValues.years;
  });
  const [period, setPeriod] = useState<Period>(() => {
    const saved = localStorage.getItem('period');
    return saved ? saved as Period : defaultValues.period;
  });
  const [chartScale, setChartScale] = useState<ChartScale>(() => {
    const saved = localStorage.getItem('chartScale');
    return saved ? saved as ChartScale : defaultValues.chartScale;
  });
  const [chartData, setChartData] = useState<Array<any>>([]);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [actualPeriods, setActualPeriods] = useState<number>(0);

  // Initialise customRepayment from the same localStorage values used for the other inputs
  const [customRepayment, setCustomRepayment] = useState<number>(() => {
    const la = Number(localStorage.getItem('loanAmount') || defaultValues.loanAmount);
    const ir = Number(localStorage.getItem('interestRate') || defaultValues.interestRate);
    const yr = Number(localStorage.getItem('years') || defaultValues.years);
    const pd = (localStorage.getItem('period') || defaultValues.period) as Period;
    return calcPayments(la, ir, yr, pd);
  });

  /**
   * Handles the apply button click.
   * Validates inputs and updates chart data if valid.
   */
  const handleApply = () => {
    const isInputValid = validateInputs(loanAmount, interestRate, years);
    setIsValid(isInputValid);
    
    if (isInputValid) {
      const result = generateAmortisationData(loanAmount, interestRate, years, period, chartScale, customRepayment);
      setChartData(result.chartData);
      setTotalInterest(result.totalInterest);
      setActualPeriods(result.actualRepaymentPeriods);
    }
  };

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('loanAmount', loanAmount.toString());
    localStorage.setItem('interestRate', interestRate.toString());
    localStorage.setItem('years', years.toString());
    localStorage.setItem('period', period);
    localStorage.setItem('chartScale', chartScale);
  }, [loanAmount, interestRate, years, period, chartScale]);

  // Reset customRepayment to the new required minimum when loan parameters change
  useEffect(() => {
    setCustomRepayment(calcPayments(loanAmount, interestRate, years, period));
  }, [loanAmount, interestRate, years, period]);

  // Initial chart data generation
  useEffect(() => {
    handleApply();
  }, []);

  // Handle reset of all values to defaults
  const handleReset = () => {
    setLoanAmount(defaultValues.loanAmount);
    setInterestRate(defaultValues.interestRate);
    setYears(defaultValues.years);
    setPeriod(defaultValues.period);
    setChartScale(defaultValues.chartScale);
    setCustomRepayment(calcPayments(defaultValues.loanAmount, defaultValues.interestRate, defaultValues.years, defaultValues.period));
    localStorage.clear();
  };

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = getTheme(darkMode ? 'dark' : 'light');

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', width: '100%' }}>
        <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: { xs: '48px 16px', md: '48px 24px' }, position: 'relative' }}>
          <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: '1200px', mt: 2, position: 'relative' }}>
            <DarkModeToggle isDarkMode={darkMode} onToggle={handleDarkModeToggle} />
        <Typography variant="h4" gutterBottom>
          Loan Calculator
        </Typography>

        <Grid container spacing={4}>
          {/* Loan input form component */}
          <LoanInputForm
            loanAmount={loanAmount}
            setLoanAmount={setLoanAmount}
            interestRate={interestRate}
            setInterestRate={setInterestRate}
            years={years}
            setYears={setYears}
            period={period}
            setPeriod={setPeriod}
            payment={calcPayments(loanAmount, interestRate, years, period)}
            customRepayment={customRepayment}
            setCustomRepayment={setCustomRepayment}
            totalInterest={totalInterest}
            actualPeriods={actualPeriods}
          />

          {/* Payment breakdown chart component */}
          <PaymentBreakdown
            chartScale={chartScale}
            setChartScale={setChartScale}
            chartData={chartData}
            period={period}
            payment={calcPayments(loanAmount, interestRate, years, period)}
            isValid={isValid}
            onApply={handleApply}
            onReset={handleReset}
          />
        </Grid>
      </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
