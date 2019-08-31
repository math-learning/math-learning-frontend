import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
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
        light: "rgba(139, 195, 74, 0.7)",
        main: "rgba(0, 0, 0, 1)",
        dark: "rgba(65, 117, 5, 1)",
        contrastText: "#fff"
      },
      secondary: {
        light: "#ff4081",
        main: "rgba(128, 203, 196, 1)",
        dark: "#c51162",
        contrastText: "#fff"
      },
      error: {
        light: "#e57373",
        main: "#f44336",
        dark: "#d32f2f",
        contrastText: "#fff",
        text:"#fff"
      },
      text: {
        primary: "rgba(255, 255, 255, 1)",
        secondary: "rgba(255, 255, 255, 0.54)",
        disabled: "rgba(255, 255, 255, 0.38)",
        hint: "rgba(255, 255, 255, 0.38)"
      }
    },
  });

export default theme