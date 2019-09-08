import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
  palette: {
    contrastThreshold: 3,
    type: 'dark',
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      paper: 'rgba(66, 66, 66, 1)',
      default: '#303030',
      dark: '#212121',
    },
    primary: {
      // Green
      main: '#80CBC4',
      contrastText: '#fff',
    },
    secondary: {
      // Yellow
      main: '#dcdc10',
      contrastText: '#fff',
    },
    blue: {
      // Blue
      main: 'rgb(132, 184, 211, 0.7)',
      dark: 'rgb(132, 184, 211, 1)',
      light: 'rgb(132, 184, 211, 0.3)',
      contrastText: '#fff',
    },
    violet: {
      // Violet
      main: 'rgb(176, 121, 172,0.7)',
      light: 'rgb(176, 121, 172,0.3)',
      dark: 'rgb(176, 121, 172, 1)',
      contrastText: '#fff',
    },
    error: {
      main: '#f44336',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(255, 255, 255, 1)',
    },

  },
});

const theme = responsiveFontSizes(defaultTheme);

export default theme;
