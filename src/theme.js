import { createTheme } from '@mui/material/styles';

// Let's define the color palette based on your login screen
const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7', // A nice deep purple
      light: '#9575cd',
      dark: '#512da8',
    },
    secondary: {
      main: '#f50057', // A vibrant pink for accents
    },
    background: {
      default: '#f4f6f8', // A light grey for the main background
      paper: '#ffffff',    // White for cards and surfaces
    },
    text: {
      primary: '#333333',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    // Styling for all buttons
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          color: '#ffffff',
        }
      },
    },
    // Styling for all cards
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        },
      },
    },
    // Styling for all paper surfaces
    MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
          },
        },
      },
    // Styling for the App Bar
    MuiAppBar: {
        styleOverrides: {
            root: {
                boxShadow: 'none',
                borderBottom: '1px solid #e0e0e0'
            }
        }
    }
  },
});

export default theme;
