# Copilot Instructions — Loan Calculator

## Project Overview

A React/TypeScript loan calculator with Material-UI, Chart.js visualisations, and Excel export functionality.

**Tech Stack:** React 18, TypeScript, Vite, MUI 6, Chart.js, XLSX

---

## Code Conventions

### File Structure

```
src/
├── components/
│   ├── LoanInputForm/LoanInputForm.tsx    # Loan input form with validation
│   ├── PaymentBreakdown/PaymentBreakdown.tsx  # Chart display + Excel export
│   └── shared/
│       ├── CustomButton/CustomButton.tsx  # Styled MUI Button wrapper
│       └── DarkModeToggle/DarkModeToggle.tsx  # Custom theme switch
├── utils/UtilFunctions.ts    # Core calculation logic (sensitive)
├── theme/theme.ts            # MUI theme configuration
└── App.tsx                   # Main app with state management
```

### Type Definitions

Core types are defined in `UtilFunctions.ts`:

```typescript
type Period = 'weekly' | 'fortnightly' | 'monthly';
type ChartScale = 'week' | 'fortnight' | 'month' | 'year';
```

Period and ChartScale are also redefined in component files — keep them consistent.

### State Management

- App-level state in `App.tsx` (loanAmount, interestRate, years, period, chartScale, customRepayment)
- LocalStorage persistence for all loan parameters
- Input validation via `validateInputs()` from `UtilFunctions.ts`

### MUI Theme

Custom theme defined in `src/theme/theme.ts`:

- Light mode: warm cream background (`#fffaf8`), terracotta primary (`#d4896b`)
- Dark mode: charcoal background (`#2c2c2c`), soft coral primary (`#ffb4a1`)
- Custom `status.danger` palette extension available

### Calculations

All core calculation logic lives in `src/utils/UtilFunctions.ts`:

- `calculatePayments()` — periodic payment using compound interest formula
- `generateAmortisationData()` — full amortisation loop with chart aggregation
- `calculateTotalPeriods()` — period count for chart display

**Do not duplicate calculation logic in components.**

---

## Formatting & Style

### ESLint

- Uses `typescript-eslint` with recommended rules
- React Hooks rules enabled (`react-hooks/configs/recommended`)
- `react-refresh/only-export-components` set to warn

Run `npm run lint` before committing.

### TypeScript

- Strict mode enabled (`tsconfig.app.json`)
- Prefer explicit types over inference for component props
- Use JSDoc comments for exported utility functions

### Formatting Preferences

- 2-space indentation
- Single quotes for strings
- Trailing commas in multiline objects/arrays
- Maximum line length: 100 characters

---

## Common Tasks

### Adding a New Input Field

1. Add state in `App.tsx` with localStorage persistence
2. Pass setter and value as props to `LoanInputForm`
3. Add validation in `validateInputs()` if needed
4. Update `defaultValues` in App.tsx

### Modifying Calculations

The compound interest formula in `calculatePayments()` is the source of truth:

```
PMT = P * (r(1+r)^n) / ((1+r)^n - 1)
```

Where:

- P = principal, r = periodic rate, n = total periods

### Exporting Data

Excel export uses `xlsx` library — see `PaymentBreakdown.tsx` `handleExportToExcel()` for the pattern.

### Adding Chart Scales

Chart scales are defined as `ChartScale` type. When adding a new scale:

1. Update `calculateTotalPeriods()` in UtilFunctions.ts
2. Add corresponding MenuItem in PaymentBreakdown.tsx

---

## Gotchas

- **Floating-point precision:** Use `Number.toFixed(2)` when displaying currency; use tolerance constants (e.g., `REPAYMENT_TOLERANCE = 0.005`) when comparing calculated values
- **Balance drift prevention:** The amortisation loop tracks unrounded balance internally, only rounds when recording
- **Custom repayment validation:** `generateAmortisationData()` guards against customRepayment < required minimum
- **Chart data aggregation:** Bars are aggregated by period type (week/fortnight/month/year) — verify `chartData.length` before rendering

---

## Dependencies

| Package            | Version | Purpose             |
| ------------------ | ------- | ------------------- |
| @mui/material      | ^6.4.6  | UI components       |
| chart.js           | ^4.4.1  | Charting            |
| react-chartjs-2    | ^5.2.0  | React chart wrapper |
| xlsx               | ^0.18.5 | Excel export        |
| @fontsource/roboto | ^5.1.1  | Typography          |
