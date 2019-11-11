import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
  main: {
    color: 'black'
  },
  palette: {
    contrastThreshold: 3,
    type: 'light',
    common: {
      black: '#000',
      white: '#fff',
    },
    text: {
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)'
    }
  }
});

const theme = responsiveFontSizes(defaultTheme);

export default theme;
