import React  from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import theme from '../../theme'
import TemporaryDrawer from '../Drawer/Drawer';

const useStyles = makeStyles(theme => ({
  navbar: {
    flexGrow: 1,
  },
  navbarContainer: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  signUpButton: {
    marginRight: theme.spacing(2)
  }
}));

// Sets the color and elevation of the navbar
const overrideTheme = createMuiTheme({
  ...theme,
  overrides: {
    MuiAppBar: {
        colorPrimary:{
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

export default function NavBar(props) {

  const classes = useStyles();
  const {profile} = props

  return (
    <ThemeProvider theme={overrideTheme}>
      <div className={classes.navbarContainer}>
      <AppBar position="static">
        <Toolbar>
        { profile !== null &&
          <TemporaryDrawer></TemporaryDrawer>
        } 

          <Typography variant="h6" className={classes.title}>
            <Link color="textPrimary" to={{
                        pathname:'/',
                    }} style={{ color: 'inherit',  textDecoration: 'none' }}>Math Learning </Link>
                    </Typography>
          {
            profile === null && 
            <div>
              
              <Button color="primary" variant="outlined" className={classes.signUpButton}>Sign Up</Button>
              <Button color="inherit">Login</Button>
              
            </div>
          }
          
        </Toolbar>
      </AppBar>
    </div>  
    </ThemeProvider>
  )
}
