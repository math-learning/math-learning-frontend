import { Divider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import InsertChartRoundedIcon from '@material-ui/icons/InsertChartRounded';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';
import theme from '../../themes/defaultTheme';
import SignUpButton from '../Button/SignUpButton';
import { TemporaryDrawer } from '../Drawers';
import ProfileLinkListItem from '../Drawers/ProfileLinkListItem';
import LinkListItemWithIcon from '../LinkListItemWithIcon';
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

const commonDrawerItems = [
  {
    path: '/courses',
    text: 'Mis Cursos',
    icon: (<CollectionsBookmarkRoundedIcon className={styles.tcGreen} />)
  },
  {
    path: '/search-courses',
    text: 'Buscar Cursos',
    icon: (<CollectionsBookmarkRoundedIcon className={styles.tcBlue} />)
  },
  {
    path: '/statistics',
    text: 'Estadisticas',
    icon: (<InsertChartRoundedIcon className={styles.tcViolet} />)
  }
];

export default function NavBar(props) {
  const {
    profile, googleClientId, onSignUp, onGoogleLogin
  } = props;

  let drawer = null;
  let loginSignUpButtons = null;

  if (profile !== null) {
    drawer = (
      <TemporaryDrawer>
        <ProfileLinkListItem />
        <div className={styles.divider}>
          <Divider variant="middle" />
        </div>
        {commonDrawerItems.map((item) => (<LinkListItemWithIcon path={item.path} text={item.text} icon={item.icon} />))}
      </TemporaryDrawer>
    );
  } else {
    loginSignUpButtons = (
      <div>
        <SignUpButton
          size="small"
          onClick={onSignUp}
          className={styles.signUpButton}
        />
        <GoogleLogin
          clientId={googleClientId}
          onSuccess={onGoogleLogin}
          render={(renderProps) => (
            <Button onClick={renderProps.onClick} color="inherit">
              Login
            </Button>
          )}
        />
      </div>
    );
  }

  return (
    <ThemeProvider theme={overrideTheme}>
      <AppBar position="static">
        <Toolbar>
          {drawer}
          <Typography variant="h6" className={styles.title}>
            <Link className={styles.linkWithoutStyles} color="textPrimary" to={{ pathname: '/' }}>Math Learning </Link>
          </Typography>
          {loginSignUpButtons}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
