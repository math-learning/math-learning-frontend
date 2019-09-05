import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import theme from '../../theme'
import TemporaryDrawer from '../Drawers';
import styles from './NavBar.module.sass'

// Sets the color and elevation of the navbar
const overrideTheme = createMuiTheme({
  ...theme,
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: theme.palette.background.dark
      },
    },
    MuiPaper: {
      elevation4: {
        boxShadow: 'none'
      }
    }
  },
});

export default class NavBar extends Component {
  render() {
    const { profile } = this.props
    console.log(this.props)
    return (
      <ThemeProvider theme={overrideTheme}>
        <div className={styles.container}>
          <AppBar position="static">
            <Toolbar>
              {!profile &&
                <TemporaryDrawer />
              }

              <Typography variant="h6" className={styles.title}>
                <Link className={styles.linkWithoutStyles} color="textPrimary" to={{ pathname: '/', }} >Math Learning </Link>
              </Typography>
              {
                !profile &&
                <div>
                  <Button color="primary" variant="outlined" className={styles.signUpButton}>Sign Up</Button>
                  <Button color="inherit">Login</Button>
                </div>
              }

            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
    )
  }

}
