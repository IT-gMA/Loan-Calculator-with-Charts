import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  ThemeProvider,
  createTheme
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffbb6d',
    },
  },
});

/**
 * Main App component for the Loan Calculator application.
 * Manages the state and calculations for loan payments, interest rates,
 * and payment schedules. Provides a user interface for input and visualization.
 */
function App() {
  // Default values for loan parameters
  const defaultValues = {
    loanAmount: 50000,
    interestRate: 5,
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

  /**
   * Validates user inputs against predefined ranges
   * Loan amount: 50,000 - 950,000
   * Interest rate: 5% - 10%
   * Years: 5 - 30
   */
  const validateInputs = () => {
    return loanAmount >= 50000 && 
           loanAmount <= 950000 && 
           interestRate >= 5 && 
           interestRate <= 10 && 
           years >= 5 && 
           years <= 30;
  };

  /**
   * Handles the apply button click.
   * Validates inputs and updates chart data if valid.
   */
  const handleApply = () => {
    if (validateInputs()) {
      setChartData(generateChartData());
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('loanAmount', loanAmount.toString());
    localStorage.setItem('interestRate', interestRate.toString());
    localStorage.setItem('years', years.toString());
    localStorage.setItem('period', period);
    localStorage.setItem('chartScale', chartScale);
    handleApply();
  }, [loanAmount, interestRate, years, period, chartScale]);

  // Handle reset of all values to defaults
  const handleReset = () => {
    setLoanAmount(defaultValues.loanAmount);
    setInterestRate(defaultValues.interestRate);
    setYears(defaultValues.years);
    setPeriod(defaultValues.period);
    setChartScale(defaultValues.chartScale);
    localStorage.clear();
  };

  /**
   * Calculates periodic payment amount based on loan parameters
   * Uses compound interest formula
   */
  const calculatePayments = () => {
    const periodsPerYear = {
      weekly: 52,
      fortnightly: 26,
      monthly: 12
    };

    const totalPeriods = years * periodsPerYear[period];
    const periodicRate = (interestRate / 100) / periodsPerYear[period];
    const payment = loanAmount * (periodicRate * Math.pow(1 + periodicRate, totalPeriods)) / (Math.pow(1 + periodicRate, totalPeriods) - 1);

    return payment;
  };

  /**
   * Calculates total number of periods for chart display
   * based on selected chart scale
   */
  const calculateTotalPeriods = () => {
    return chartScale === 'year' ? years : 
           chartScale === 'month' ? years * 12 :
           years * 52;
  };

  /**
   * Generates data for the payment breakdown chart
   * Calculates principal and interest portions for each payment period
   */
  const generateChartData = () => {
    const payment = calculatePayments();
    const data = [];
    let remainingBalance = loanAmount;
    const periodsPerYear = {
      weekly: 52,
      fortnightly: 26,
      monthly: 12
    };

    const totalPeriods = calculateTotalPeriods();
    const periodInterestRate = (interestRate / 100) / periodsPerYear[period];

    for (let i = 1; i <= totalPeriods; i++) {
      const periodInterest = remainingBalance * periodInterestRate;
      const periodPrincipal = payment - periodInterest;
      remainingBalance -= periodPrincipal;

      data.push({
        period: i,
        Principal: Number(periodPrincipal.toFixed(2)),
        Interest: Number(periodInterest.toFixed(2))
      });
    }

    return data;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: '1200px' }}>
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
              payment={calculatePayments()}
            />

            {/* Payment breakdown chart component */}
            <PaymentBreakdown
              chartScale={chartScale}
              setChartScale={setChartScale}
              chartData={chartData}
              period={period}
              payment={calculatePayments()}
              isValid={isValid}
              onApply={handleApply}
              onReset={handleReset}
            />
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
