import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  Box,
  Grid,
  Button
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import * as XLSX from 'xlsx';

// Type definition for chart scale options
type ChartScale = 'week' | 'month' | 'year';

/**
 * Props interface for the PaymentBreakdown component
 * @interface PaymentBreakdownProps
 * @property {ChartScale} chartScale - Current time scale for the chart display
 * @property {Function} setChartScale - Function to update the chart scale
 * @property {Array<any>} chartData - Array of payment breakdown data for the chart
 * @property {Period} period - Payment frequency (weekly, fortnightly, monthly)
 * @property {number} payment - Calculated periodic payment amount
 * @property {boolean} isValid - Flag indicating if all input values are valid
 * @property {Function} onApply - Function to handle applying changes to the chart
 */
interface PaymentBreakdownProps {
  chartScale: ChartScale;
  setChartScale: (value: ChartScale) => void;
  chartData: Array<any>;
  period: 'weekly' | 'fortnightly' | 'monthly';
  payment: number;
  isValid: boolean;
  onApply: () => void;
  onReset: () => void;
}

/**
 * PaymentBreakdown Component
 * Displays a stacked bar chart showing the breakdown of loan payments into principal and interest,
 * allows users to change the time scale of the chart, and provides options to export data to Excel.
 */
const PaymentBreakdown = ({
  chartScale,
  setChartScale,
  chartData,
  isValid,
  onApply,
  onReset
}: PaymentBreakdownProps) => {
  // Function to handle exporting chart data to Excel
  const handleExportToExcel = () => {
    const now = new Date();
    const timestamp = now.toISOString().split('.')[0];
    const filename = `${timestamp} ${chartScale} Loan Calculator.xlsx`;

    // Create a new workbook and add the chart data
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(chartData);

    XLSX.utils.book_append_sheet(wb, ws, 'Payment Schedule');
    XLSX.writeFile(wb, filename);
  };

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6" gutterBottom>
        Payment Breakdown
      </Typography>
      {/* Chart scale selection dropdown */}
      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Chart Time Scale</Typography>
        <FormControl fullWidth>
          <Select
            value={chartScale}
            onChange={(e) => setChartScale(e.target.value as ChartScale)}
          >
            <MenuItem value="week">Weekly</MenuItem>
            <MenuItem value="fortnight">Fortnightly</MenuItem>
            <MenuItem value="month">Monthly</MenuItem>
            <MenuItem value="year">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Action buttons for applying changes and exporting data */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={onApply}
            disabled={!isValid}
            sx={{
              padding: '.5em 2em',
              '&:focus': {
                outline: 'none',
                boxShadow: 'none'
              },
              '&:hover': {
                color: '#ffffff',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              },
              '&:active': {
                color: '#ffffff',
                boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
              }
            }}
          >
            Apply Changes
          </Button>
          <Button
            variant="contained"
            onClick={handleExportToExcel}
            disabled={!isValid || chartData.length === 0}
            sx={{
              padding: '.5em 2em',
              '&:focus': {
                outline: 'none',
                boxShadow: 'none'
              },
              '&:hover': {
                color: '#ffffff',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              },
              '&:active': {
                color: '#ffffff',
                boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
              }
            }}
          >
            Download Excel
          </Button>
          <Button
            variant="contained"
            onClick={onReset}
            sx={{
              padding: '.5em 2em',
              '&:focus': {
                outline: 'none',
                boxShadow: 'none'
              },
              '&:hover': {
                color: '#ffffff',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              },
              '&:active': {
                color: '#ffffff',
                boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
              }
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
      {/* Stacked bar chart showing payment breakdown */}
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <Bar
          data={{
            labels: chartData.map(d => d.period),
            datasets: [
              {
                label: 'Principal',
                data: chartData.map(d => d.Principal),
                backgroundColor: '#d4896b',
              },
              {
                label: 'Interest',
                data: chartData.map(d => d.Interest),
                backgroundColor: '#a06c66',
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
                title: {
                  display: true,
                  text: chartScale.charAt(0).toUpperCase() + chartScale.slice(1),
                },
              },
              y: {
                stacked: true,
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const value = context.raw as number;
                    return `${context.dataset.label}: $${value.toFixed(2)}`;
                  },
                },
              },
            },
          }}
          height={300}
        />
      </Box>
      {/* Error message for invalid inputs */}
      {!isValid && (
        <Box sx={{ mt: 3 }}>
          <Typography color="error" sx={{ mt: 1 }}>
            Please ensure all input values are within their valid ranges
          </Typography>
        </Box>
      )}
    </Grid>
  );
};

export default PaymentBreakdown;