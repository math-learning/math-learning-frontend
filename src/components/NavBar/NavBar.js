import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles, ThemeProvider } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import theme from '../../theme'

const useStyles = makeStyles(theme => ({
  navbar: {
    flexGrow: 1,
  },
  navbarContainer: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

// Sets the color and elevation of the navbar
const overrideTheme = createMuiTheme({
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




export default function NavBar() {

  const classes = useStyles();

  return (
    <ThemeProvider theme={overrideTheme}>
      <div className={classes.navbarContainer}>
      <AppBar position="static">
        <Toolbar classes={{ root: { colorPrimary: 'red' } }}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            <Link color="textPrimary" to={{
                        pathname:'/',
                    }} style={{ color: 'inherit',  textDecoration: 'none' }}>Math Learning </Link>
                    </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>  
    </ThemeProvider>
  )
}
