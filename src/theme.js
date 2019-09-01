import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
    palette: {
      contrastThreshold: 3,
      type: 'dark',
      common: {
        black: "#000",
        white: "#fff"
      },
      background: {
        paper: "rgba(66, 66, 66, 1)",
        default: "#303030",
        dark: "#212121"
      },
      primary: {
        main: "#80CBC4",
        contrastText: "#fff"
      },
      third: {
        main: '#84b8d3',
        contrastText: "#fff"
      },
      secondary: {
        main: "#b079ac",
        contrastText: "#fff"
      },
      error: {
        main: "#f44336",
        contrastText: "#fff",
      },
      text: {
        primary: "rgba(255, 255, 255, 1)",
      }
      
    },
  });

theme = responsiveFontSizes(theme);

export default theme