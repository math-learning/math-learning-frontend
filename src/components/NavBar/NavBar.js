import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import theme from '../../theme';
import SignUpButton from '../Button/SignUpButton';
import TemporaryDrawer from '../Drawers';
import styles from './NavBar.module.sass';

// Sets the color and elevation of the navbar
const overrideTheme = createMuiTheme({
  ...theme,
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: theme.palette.background.dark,
      },
    },
    MuiPaper: {
      elevation4: {
        boxShadow: 'none',
      },
    },
  },
});

export default function NavBar(props) {
  const { profile } = props;

  return (
    <ThemeProvider theme={overrideTheme}>
      <AppBar position="static">
        <Toolbar>
          {profile && <TemporaryDrawer />}

          <Typography variant="h6" className={styles.title}>
            <Link className={styles.linkWithoutStyles} color="textPrimary" to={{ pathname: '/' }}>Math Learning </Link>
          </Typography>

          {!profile
            && (
            <div display-if={!!profile}>
              <SignUpButton size="small" className={styles.signUpButton} />
              <Button color="inherit">Login</Button>
            </div>
            )}

        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
