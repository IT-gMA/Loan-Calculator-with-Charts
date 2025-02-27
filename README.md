# Loan Calculator

A modern, interactive loan calculator built with React, TypeScript, and Material-UI that helps users calculate loan payments and visualize payment breakdowns.

## Features

- Calculate loan payments with customizable parameters:
  - Loan amount ($50,000 - $950,000)
  - Interest rate (5% - 10%)
  - Loan term (5 - 30 years)
  - Payment frequency (weekly, fortnightly, monthly)
- Interactive charts showing payment breakdown
- Elegant dark/light mode toggle with custom-styled switch
- Responsive design for all device sizes
- Real-time calculation updates
- Modern Material-UI interface with smooth transitions

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

After that, the application will be available at `http://localhost:5173`

## Usage

1. Enter the loan amount (between $50,000 and $950,000)
2. Adjust the interest rate using the slider (5% - 10%)
3. Set the loan term using the slider (5 - 30 years)
4. Select your preferred payment frequency (weekly, fortnightly, or monthly)
5. View the calculated payment amount and payment breakdown chart

## Technologies Used

- React 18.2.0
- TypeScript
- Vite
- Material-UI (MUI)
- Chart.js with react-chartjs-2
- XLSX for data export

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── components/
│   ├── LoanInputForm/
│   ├── PaymentBreakdown/
│   └── shared/
├── utils/
├── assets/
└── App.tsx
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.