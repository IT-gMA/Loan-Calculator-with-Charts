import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Slider,
  Grid,
  InputAdornment
} from '@mui/material';

type Period = 'weekly' | 'fortnightly' | 'monthly';
import {numberWithCommas} from '../../utils/UtilFunctions';

interface LoanInputFormProps {
  loanAmount: number;
  setLoanAmount: (value: number) => void;
  interestRate: number;
  setInterestRate: (value: number) => void;
  years: number;
  setYears: (value: number) => void;
  period: Period;
  setPeriod: (value: Period) => void;
  payment: number;
}

const LoanInputForm = ({
  loanAmount,
  setLoanAmount,
  interestRate,
  setInterestRate,
  years,
  setYears,
  period,
  setPeriod,
  payment
}: LoanInputFormProps) => {
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove leading zeros and convert to number
    const cleanValue = e.target.value.replace(/^0+/, '');
    const value = cleanValue === '' ? 0 : Number(cleanValue);
    setLoanAmount(value);
  };

  const handleLoanAmountBlur = () => {
    let formattedValue = loanAmount;
    
    // Apply validation constraints
    if (formattedValue < 50000) {
      formattedValue = 50000;
    } else if (formattedValue > 950000) {
      formattedValue = 950000;
    }
    
    // Format the value with thousand separators
    const numberFormat = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    setLoanAmount(formattedValue);
  };

  return (
    <Grid item xs={12} md={6}>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Loan Amount"
          type="number"
          value={loanAmount.toString()}
          onChange={handleLoanAmountChange}
          onBlur={(e) => {
            handleLoanAmountBlur();
            e.target.value = loanAmount.toString();
          }}
          error={loanAmount < 50000 || loanAmount > 950000}
          helperText={loanAmount < 50000 || loanAmount > 950000 ? 'Enter an amount between $50,000 and $950,000' : ''}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          sx={{
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0
            },
            '& input[type=number]': {
              '-moz-appearance': 'textfield'
            }
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Interest Rate: {interestRate}%</Typography>
        <Slider
          value={interestRate}
          onChange={(_, value) => setInterestRate(value as number)}
          min={5}
          max={10}
          step={0.1}
          marks
          valueLabelDisplay="auto"
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Loan Term: {years} years</Typography>
        <Slider
          value={years}
          onChange={(_, value) => setYears(value as number)}
          min={5}
          max={30}
          marks
          valueLabelDisplay="auto"
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Repayment Period</InputLabel>
          <Select
            value={period}
            label="Repayment Period"
            onChange={(e) => setPeriod(e.target.value as Period)}
          >
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="fortnightly">Fortnightly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mb: 3 }}><br></br>
        <Typography variant="h6">
          {period.charAt(0).toUpperCase() + period.slice(1)} Payment: ${payment.toFixed(2)}
        </Typography>
        <i><h5>To pay off ${numberWithCommas(loanAmount)} over {years} year{years > 1 ? 's' : ''} with a {interestRate}% interest</h5></i>
      </Box>
    </Grid>
  );
};

export default LoanInputForm;