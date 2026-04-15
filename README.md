# Loan Calculator

A modern, interactive mortgage and loan calculator built with React, TypeScript, Vite, and Material-UI.

## Features

- Calculate loan payments with customizable parameters:
  - Loan amount ($50,000 - $950,000)
  - Interest rate (5% - 10%)
  - Loan term (5 - 30 years)
  - Payment frequency (weekly, fortnightly, monthly)
- Required payment calculation using mortgage amortisation
- Custom repayment amount with minimum equal to the required payment
- Faster payoff simulation that updates the chart dynamically
- Principal and interest breakdown by chosen chart time scale
- Excel export for payment schedule data
- Light/dark mode toggle with responsive layout
- User input persistence via browser storage

## Demo

[Live Demo](https://md-loan-calculator-cjs.netlify.app)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/IT-gMA/Loan-Calculator-with-Charts.git
cd Loan-Calculator-with-Charts
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Usage

1. Enter the loan amount within the allowed range.
2. Adjust the interest rate using the slider or manual input.
3. Choose the loan term in years.
4. Select the repayment frequency.
5. Review the calculated required payment.
6. Enter a custom repayment amount that is equal to or greater than the required payment.
7. Select a chart time scale and press `Apply` to refresh the chart.
8. Download the amortisation data to Excel or reset the form as needed.

## Technologies Used

- React 18.2.0
- TypeScript
- Vite
- Material-UI (MUI)
- Chart.js with react-chartjs-2
- XLSX for Excel export

## Development

### Available Scripts

- `npm run dev` — Start the Vite development server
- `npm run build` — Build the app for production
- `npm run lint` — Run ESLint
- `npm run preview` — Preview the production build

### Project Structure

For the current project tree, see [`project_structure.txt`](./project_structure.txt).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to your branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.