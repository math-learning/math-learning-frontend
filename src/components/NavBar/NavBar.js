import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './NavBar.css'

class NavBar extends Component {
    render() {
        return (
            <div id="navbar">
                <div className='navbar'>
                    <AppBar>
                        <Toolbar>
                        <Typography variant="h6" className='title'>
                            Math Learning
                        </Typography>
                        <Button color="inherit">Login</Button>
                            
                        </Toolbar>
                    </AppBar>
                </div>

            </div>
        )
    }
}


export default NavBar