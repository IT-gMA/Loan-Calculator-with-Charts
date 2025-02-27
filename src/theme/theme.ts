import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#d4896b' : '#ffb4a1',
        light: mode === 'light' ? '#ffbba0' : '#ffddd3',
        dark: mode === 'light' ? '#9e5b3e' : '#c85a54',
        contrastText: mode === 'light' ? '#000000' : '#000000',
      },
      secondary: {
        main: mode === 'light' ? '#a06c66' : '#ffb4ab',
        light: mode === 'light' ? '#d29b95' : '#ffdad6',
        dark: mode === 'light' ? '#714040' : '#93000a',
        contrastText: mode === 'light' ? '#ffffff' : '#000000',
      },
      background: {
        default: mode === 'light' ? '#fffaf8' : '#2c2c2c',
        paper: mode === 'light' ? '#ffffff' : '#383838',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#e1e1e1',
        secondary: mode === 'light' ? '#666666' : '#a0a0a0',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            backgroundColor: mode === 'dark' ? '#383838' : '#fffafa',
            boxShadow: mode === 'dark' ? '0 8px 32px rgba(0,0,0,0.3)' : '0 3px 6px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
          },
        },
      },
    },
  });
};

export default getTheme;