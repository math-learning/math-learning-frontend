import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    footer: {
      backgroundColor: theme.palette.background.dark,
      padding: theme.spacing(4),
        width: "100%",
        height: "140px",
        marginTop: 'auto',
        
    },
  }));

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="md">
                <Typography variant="h6" align="center" gutterBottom color="textPrimary">
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
            </Container>   
        </footer>
    )
    
}