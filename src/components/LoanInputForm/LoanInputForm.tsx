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
import {numberWithCommas, minLoanAmount, maxLoanAmount, minInterest, maxInterest, validateInputs} from '../../utils/UtilFunctions';

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

const LoanInputForm: React.FC<LoanInputFormProps> = ({
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
    formattedValue = formattedValue < minLoanAmount ? minLoanAmount : formattedValue > maxLoanAmount ? maxLoanAmount : formattedValue;

    // Format the value with thousand separators
    /*const numberFormat = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });*/

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
          error={loanAmount < minLoanAmount || loanAmount > maxLoanAmount}
          helperText={loanAmount < minLoanAmount || loanAmount > maxLoanAmount ? `Enter an amount between $${numberWithCommas(minLoanAmount)} and $${numberWithCommas(maxLoanAmount)}` : ''}
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
            },
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
            '& label.Mui-focused': {
              color: 'primary.main',
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Interest Rate: {interestRate}%</Typography>
        <Slider
          value={interestRate}
          onChange={(_, value) => setInterestRate(value as number)}
          min={minInterest}
          max={maxInterest}
          step={0.1}
          marks
          valueLabelDisplay="auto"
          sx={{
            '& .MuiSlider-thumb': {
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0 0 0 8px rgba(255, 187, 109, 0.16)',
              },
            },
            '& .MuiSlider-track': {
              transition: 'background-color 0.3s ease',
            },
          }}
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
          sx={{
            '& .MuiSlider-thumb': {
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0 0 0 8px rgba(255, 187, 109, 0.16)',
              },
            },
            '& .MuiSlider-track': {
              transition: 'background-color 0.3s ease',
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Repayment Period</InputLabel>
          <Select
            value={period}
            label="Repayment Period"
            onChange={(e) => setPeriod(e.target.value as Period)}
            sx={{
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            }}
          >
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="fortnightly">Fortnightly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mb: 3, opacity: validateInputs(loanAmount, interestRate, years) ? 1 : 0 }}><br></br>
        <Typography variant="h6" sx={{ color: 'primary.main' }}>
          {period.charAt(0).toUpperCase() + period.slice(1)} Payment: ${payment.toFixed(2)}
        </Typography>
        <Typography variant="body1" component="div" style={{ fontStyle: 'italic' }}>
          <Box>To pay off ${numberWithCommas(loanAmount)} over {years} year{years > 1 ? 's' : ''} with a {interestRate}% interest</Box>
          <Box>Total Interest Paid: ${numberWithCommas(parseFloat((payment * (years * (period === 'weekly' ? 52 : period === 'fortnightly' ? 26 : 12)) - loanAmount).toFixed(2)))}</Box>
        </Typography>
      </Box>
    </Grid>
  );
};

export default LoanInputForm;
