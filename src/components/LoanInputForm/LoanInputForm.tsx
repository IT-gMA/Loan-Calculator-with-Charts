import { useState } from 'react';
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Slider,
  Grid
} from '@mui/material';

type Period = 'weekly' | 'fortnightly' | 'monthly';

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
    const value = Number(e.target.value);
    if (value >= 50000 && value <= 950000) {
      setLoanAmount(value);
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Loan Amount"
          type="number"
          value={loanAmount}
          onChange={handleLoanAmountChange}
          inputProps={{
            min: 50000,
            max: 950000,
            step: 1000
          }}
          helperText="Enter an amount between $50,000 and $950,000"
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Interest Rate: {interestRate}%</Typography>
        <Slider
          value={interestRate}
          onChange={(_, value) => setInterestRate(value as number)}
          min={5}
          max={7}
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

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">
          {period.charAt(0).toUpperCase() + period.slice(1)} Payment: ${payment.toFixed(2)}
        </Typography>
      </Box>
    </Grid>
  );
};

export default LoanInputForm;