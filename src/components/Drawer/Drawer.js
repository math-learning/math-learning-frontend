import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import InsertChartRoundedIcon from '@material-ui/icons/InsertChartRounded';
import { Divider, ListItemAvatar, Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  violetColor: {
    color: theme.palette.violet.dark
  },
  blueColor: {
    color: theme.palette.blue.dark
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  profileAvatar: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(2)
  }
}));


function DrawerItems(props) {
  const classes = useStyles();
  return (
    
      <List>
          <ListItem button key={"Account"} className={classes.profileAvatar}>
          <ListItemAvatar>
              <Avatar>
                <AccountBoxIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Nombre"} secondary="Ver Perfil" />
          </ListItem>

          <Divider variant="middle" light="true" className={classes.divider}/>
          
          <ListItem button key={"Courses"}>
            <ListItemIcon> <CollectionsBookmarkRoundedIcon color="primary"/> </ListItemIcon>
            <ListItemText primary={"Mis Cursos"} />
          </ListItem>

          {props.children}

      </List>
      
  );
}

function ProfessorItems(props) {
  const classes = useStyles();
  return (
      <DrawerItems>
        {/* Professor extra items */}
          <ListItem button key={"Statistics"}>
            <ListItemIcon> <InsertChartRoundedIcon className={classes.violetColor}/> </ListItemIcon>
            <ListItemText primary={"Estadisticas"} />
          </ListItem>
      </DrawerItems>
      
  );
}

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    opened: false,
  });

  const {accountType} = props

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, opened: open });
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
      </IconButton>
      <Drawer open={state.opened} onClose={toggleDrawer(false)}>
        <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        >
        {
          accountType === 'PROFESSOR' ?
          <ProfessorItems/> : <DrawerItems/>
        }
        </div>
      </Drawer>
    </div>
  );
}